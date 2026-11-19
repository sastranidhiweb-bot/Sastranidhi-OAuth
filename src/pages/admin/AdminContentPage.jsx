import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import { admin, editorLoginUrl, editorLogout, getEditor } from '../../services/contentApi.js';
import { clearContentCache } from '../../hooks/useContent.js';
import { formatDate } from '../../components/Content/contentUi.jsx';
import { TYPES } from './adminSchema.js';
import EditorForm, { toForm } from './EditorForm.jsx';
import '../../styles/admin.css';

// /admin/content — where editors manage the home page's articles, videos,
// topics and ślokas. Sign-in goes through the Sastranidhi IdP via the
// content service; only accounts with the CONTENT_ADMIN (or ADMIN) role for the
// CONTENT app can make changes.

function cell(col, doc) {
  const v = doc[col];
  if (col === 'publishedAt') return v ? formatDate(v) : '—';
  if (col === 'status') return <span className={`adm-pill adm-pill-${v}`}>{v === 'published' ? 'Published' : 'Draft'}</span>;
  if (col === 'source' && doc.youtubeId) return v === 'youtube' ? 'From channel' : 'By hand';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (col === 'scheduledFor') return v || '—';
  return v ?? '—';
}

function SignInCard({ error }) {
  return (
    <div className="adm-signin">
      <h1>Content admin</h1>
      <p>Sign in with your Sastra Nidhi account to manage articles, videos, topics and ślokas.</p>
      {error && <div className="adm-error" role="alert">{error}</div>}
      <a className="adm-btn adm-btn-primary" href={editorLoginUrl('/admin/content')}>Sign in</a>
    </div>
  );
}

function ContentManager({ editor, onSignOut }) {
  const [tab, setTab] = useState('articles');
  const [items, setItems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [summary, setSummary] = useState(null);
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(null); // { isNew, id, initial }
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const type = TYPES[tab];

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [list, topicList, sum] = await Promise.all([
        admin.list(tab, q ? { q } : {}),
        admin.list('topics'),
        admin.summary(),
      ]);
      setItems(list.items);
      setTopics(topicList.items);
      setSummary(sum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tab, q]);

  useEffect(() => {
    const t = setTimeout(load, q ? 250 : 0);
    return () => clearTimeout(t);
  }, [load, q]);

  const flash = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3500);
  };

  // After any change, drop the site's cached pages so they show it at once
  const afterChange = async (msg) => {
    clearContentCache();
    setEditing(null);
    flash(msg);
    await load();
  };

  const openEditor = async (doc) => {
    if (!doc) {
      setEditing({ isNew: true, initial: { ...type.blank } });
      return;
    }
    try {
      const full = await admin.get(tab, doc._id); // list rows omit the article body
      setEditing({ isNew: false, id: full._id, doc: full, initial: toForm(type, full) });
    } catch (err) {
      setError(err.message);
    }
  };

  const run = async (fn, msg) => {
    setError('');
    try {
      const res = await fn();
      await afterChange(typeof msg === 'function' ? msg(res) : msg);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="adm">
      <div className="adm-bar">
        <div>
          <h1>Content admin</h1>
          <p>Signed in as {editor.email || editor.username}</p>
        </div>
        <div className="adm-bar-actions">
          <Link to="/" className="adm-btn">View site</Link>
          <button type="button" className="adm-btn" onClick={onSignOut}>Sign out</button>
        </div>
      </div>

      {summary && (
        <div className="adm-summary">
          <span><strong>{summary.articles}</strong> published articles</span>
          <span><strong>{summary.drafts}</strong> drafts</span>
          <span><strong>{summary.videos}</strong> videos</span>
          <span><strong>{summary.topics}</strong> topics</span>
          <span><strong>{summary.slokas}</strong> ślokas in rotation</span>
          {summary.samples > 0 && (
            <button
              type="button"
              className="adm-btn adm-btn-danger adm-btn-sm"
              onClick={() =>
                window.confirm(`Remove the ${summary.samples} sample articles? Real articles are not affected.`) &&
                run(() => admin.removeSamples(), (r) => `Removed ${r.deleted} sample articles.`)
              }
            >
              Remove {summary.samples} sample articles
            </button>
          )}
        </div>
      )}

      <div className="adm-tabs" role="tablist">
        {Object.entries(TYPES).map(([key, t]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={tab === key ? 'is-active' : undefined}
            onClick={() => {
              setTab(key);
              setEditing(null);
              setQ('');
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {notice && <div className="adm-notice" role="status">{notice}</div>}
      {error && <div className="adm-error" role="alert">{error}</div>}

      {editing ? (
        <div className="adm-panel">
          <div className="adm-panel-head">
            <h2>{editing.isNew ? `New ${type.singular}` : `Edit ${type.singular}`}</h2>
            {!editing.isNew && type.viewUrl?.(editing.doc) && (
              <a href={type.viewUrl(editing.doc)} target="_blank" rel="noopener noreferrer">View ↗</a>
            )}
          </div>
          <EditorForm
            key={editing.id || 'new'}
            type={type}
            initial={editing.initial}
            isNew={editing.isNew}
            topics={topics}
            onCancel={() => setEditing(null)}
            onSave={async (payload) => {
              if (editing.isNew) await admin.create(tab, payload);
              else await admin.update(tab, editing.id, payload);
              await afterChange(editing.isNew ? `Created.` : 'Saved.');
            }}
            onDelete={async () => {
              await admin.remove(tab, editing.id);
              await afterChange('Deleted.');
            }}
          />
        </div>
      ) : (
        <div className="adm-panel">
          <div className="adm-toolbar">
            <input
              type="search"
              placeholder={`Search ${type.label.toLowerCase()}…`}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label={`Search ${type.label.toLowerCase()}`}
            />
            {tab === 'videos' && (
              <button
                type="button"
                className="adm-btn"
                onClick={() =>
                  run(
                    () => admin.syncYoutube(),
                    (r) => (r.disabled ? 'YouTube sync is not set up.' : `YouTube: ${r.added} new video(s) added.`)
                  )
                }
              >
                Check YouTube channel
              </button>
            )}
            <button type="button" className="adm-btn adm-btn-primary" onClick={() => openEditor(null)}>
              + New {type.singular}
            </button>
          </div>

          {loading ? (
            <p className="adm-muted">Loading…</p>
          ) : items.length === 0 ? (
            <p className="adm-muted">Nothing here yet.</p>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    {type.columns.map(([, label]) => (
                      <th key={label}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((doc) => (
                    <tr key={doc._id} onClick={() => openEditor(doc)} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openEditor(doc)}>
                      {type.columns.map(([col]) => (
                        <td key={col}>
                          {cell(col, doc)}
                          {col === type.titleField && doc.featured && <span className="adm-pill adm-pill-featured">Featured</span>}
                          {col === type.titleField && doc.isSample && <span className="adm-pill">Sample</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminContentPage() {
  const [params, setParams] = useSearchParams();
  const [state, setState] = useState({ loading: true });
  const loginError = params.get('login_error');

  useEffect(() => {
    document.title = 'Content admin · Sastra Nidhi';
    getEditor()
      .then((me) => setState({ loading: false, me }))
      .catch((err) => setState({ loading: false, error: err.message }));
  }, []);

  // Don't keep the error in the address bar after showing it once
  useEffect(() => {
    if (loginError) setParams({}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    await editorLogout().catch(() => {});
    setState({ loading: false, me: { signedIn: false } });
  };

  let body;
  if (state.loading) body = <p className="adm-muted adm-center">Loading…</p>;
  else if (state.error) body = <div className="adm-signin"><h1>Content admin</h1><div className="adm-error" role="alert">{state.error}</div></div>;
  else if (!state.me.signedIn) body = <SignInCard error={loginError} />;
  else if (!state.me.canEdit) {
    body = (
      <div className="adm-signin">
        <h1>No editing access</h1>
        <p>
          You’re signed in as {state.me.user.email || state.me.user.username}, but this account can’t edit site
          content. Ask an administrator to give you the <strong>CONTENT_ADMIN</strong> role for the <strong>CONTENT</strong> app.
        </p>
        <button type="button" className="adm-btn" onClick={signOut}>Sign out</button>
      </div>
    );
  } else body = <ContentManager editor={state.me.user} onSignOut={signOut} />;

  return (
    <>
      <Header />
      <main className="adm-main">{body}</main>
    </>
  );
}
