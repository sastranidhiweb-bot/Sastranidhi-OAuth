import { useState } from 'react';

// datetime-local wants "YYYY-MM-DDTHH:mm" in local time
function toLocalInput(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Turns a stored record into form values (and back, in toPayload). */
export function toForm(type, doc) {
  const values = { ...type.blank };
  for (const f of type.fields) {
    if (doc[f.name] === undefined || doc[f.name] === null) continue;
    values[f.name] = f.type === 'datetime' ? toLocalInput(doc[f.name]) : doc[f.name];
  }
  // Videos are edited through their link
  if ('youtube' in type.blank && doc.youtubeId) values.youtube = `https://www.youtube.com/watch?v=${doc.youtubeId}`;
  return values;
}

function toPayload(type, values) {
  const out = {};
  for (const f of type.fields) {
    let v = values[f.name];
    if (f.type === 'datetime') v = v ? new Date(v).toISOString() : '';
    if (f.type === 'number') v = Number(v) || 0;
    if (typeof v === 'string' && f.type !== 'textarea') v = v.trim();
    out[f.name] = v;
  }
  return out;
}

function TopicPicker({ value, topics, onChange }) {
  const selected = new Set(value || []);
  if (!topics.length) return <p className="adm-help">No topics yet. Add some under the Topics tab.</p>;
  return (
    <div className="adm-chips">
      {topics.map((t) => {
        const on = selected.has(t.slug);
        return (
          <button
            key={t.slug}
            type="button"
            className={`adm-chip${on ? ' is-on' : ''}`}
            aria-pressed={on}
            onClick={() => {
              const next = new Set(selected);
              if (on) next.delete(t.slug);
              else next.add(t.slug);
              onChange([...next]);
            }}
          >
            {t.name}
          </button>
        );
      })}
    </div>
  );
}

/**
 * The edit form for one record. `onSave(payload)` and `onDelete()` return
 * promises; errors they throw are shown above the buttons.
 */
export default function EditorForm({ type, initial, isNew, topics, onSave, onDelete, onCancel }) {
  const [values, setValues] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = (name, v) => setValues((s) => ({ ...s, [name]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onSave(toPayload(type, values));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    const name = values[type.titleField] || `this ${type.singular}`;
    if (!window.confirm(`Delete “${name}”? This can’t be undone.`)) return;
    setBusy(true);
    setError('');
    try {
      await onDelete();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <form className="adm-form" onSubmit={submit}>
      <div className="adm-form-grid">
        {type.fields.map((f) => {
          const id = `adm-${f.name}`;
          const common = {
            id,
            name: f.name,
            required: f.required,
            maxLength: f.maxLength,
            placeholder: f.placeholder,
            lang: f.lang,
          };
          let control;
          if (f.type === 'textarea') {
            control = <textarea {...common} rows={f.rows || 3} value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)} />;
          } else if (f.type === 'select') {
            control = (
              <select {...common} value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)}>
                {f.options.map(([v, label]) => (
                  <option key={v} value={v}>{label}</option>
                ))}
              </select>
            );
          } else if (f.type === 'checkbox') {
            return (
              <label key={f.name} className="adm-check">
                <input type="checkbox" checked={!!values[f.name]} onChange={(e) => set(f.name, e.target.checked)} />
                <span>{f.label}</span>
              </label>
            );
          } else if (f.type === 'topics') {
            control = <TopicPicker value={values[f.name]} topics={topics} onChange={(v) => set(f.name, v)} />;
          } else {
            const inputType = { datetime: 'datetime-local', date: 'date', number: 'number', image: 'text' }[f.type] || 'text';
            control = <input {...common} type={inputType} value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)} />;
          }

          return (
            <div key={f.name} className={`adm-field${f.half ? ' is-half' : ''}`}>
              <label htmlFor={id}>
                {f.label}
                {f.required && <span aria-hidden="true"> *</span>}
              </label>
              {control}
              {f.type === 'image' && values[f.name] && (
                <img className="adm-preview" src={values[f.name]} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              )}
              {f.help && <p className="adm-help">{f.help}</p>}
            </div>
          );
        })}
      </div>

      {error && <div className="adm-error" role="alert">{error}</div>}

      <div className="adm-actions">
        <button type="submit" className="adm-btn adm-btn-primary" disabled={busy}>
          {busy ? 'Saving…' : isNew ? `Create ${type.singular}` : 'Save changes'}
        </button>
        <button type="button" className="adm-btn" onClick={onCancel} disabled={busy}>Cancel</button>
        {!isNew && (
          <button type="button" className="adm-btn adm-btn-danger" onClick={remove} disabled={busy}>Delete</button>
        )}
      </div>
    </form>
  );
}
