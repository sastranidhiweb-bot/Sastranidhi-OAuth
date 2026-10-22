import { useEffect, useId, useMemo, useRef, useState } from 'react';
import '../../styles/search-select.css';

// Lower-case and strip diacritics so "sao" finds "São Paulo" and "visle"
// finds "Viśleṣaka".
export const normalize = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

const MAX_RESULTS = 50;

// Rank: name starts with the query, then a word in it does, then it
// contains the query anywhere (name, hint or keywords).
function rank(option, q) {
  const label = normalize(option.label);
  if (label.startsWith(q)) return 0;
  if (label.split(/[\s,()-]+/).some((w) => w.startsWith(q))) return 1;
  const extra = normalize(`${option.hint || ''} ${option.keywords || ''}`);
  if (label.includes(q) || extra.split(/\s+/).some((w) => w.startsWith(q))) return 2;
  if (extra.includes(q)) return 3;
  return -1;
}

/**
 * Text input with a filtered suggestion list (ARIA combobox).
 *
 * options: [{ value, label, hint?, keywords? }]
 * value:   the selected option's value, or with allowCustom the typed text
 * onChange(value, option|null)
 * allowCustom: keep whatever is typed (suggestions are optional); otherwise
 *   the value must be one of the options and typing alone does not select.
 */
export default function SearchSelect({
  id,
  name,
  options,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  allowCustom = false,
  invalidMessage = 'Please choose an option from the list.',
  emptyText = 'No matches',
}) {
  const listId = useId();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const selected = allowCustom ? null : options.find((o) => o.value === value) || null;
  const [query, setQuery] = useState(allowCustom ? value : selected?.label || '');

  // Keep the box in sync when the value changes from outside (e.g. reset).
  useEffect(() => {
    if (allowCustom) setQuery(value);
    else setQuery(selected?.label || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options]);

  const results = useMemo(() => {
    const q = normalize(query);
    // nothing typed, or the box still shows the current pick: list from the top
    const showingPick = allowCustom
      ? options.some((o) => o.value === query)
      : selected && query === selected.label;
    if (!q || showingPick) {
      return options.slice(0, MAX_RESULTS);
    }
    return options
      .map((o) => [rank(o, q), o])
      .filter(([r]) => r >= 0)
      .sort((a, b) => a[0] - b[0])
      .slice(0, MAX_RESULTS)
      .map(([, o]) => o);
  }, [query, options, allowCustom, selected]);

  // Native form validation: a pick from the list is required unless custom.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const missing = required && (allowCustom ? !value.trim() : !selected);
    el.setCustomValidity(missing ? invalidMessage : '');
  }, [required, allowCustom, value, selected, invalidMessage]);

  useEffect(() => {
    if (!open) return;
    const item = listRef.current?.children[active];
    item?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  // With allowCustom the value (e.g. "Springfield, Illinois") is what fills
  // the box; otherwise the box shows the label and the value stays hidden.
  const choose = (option) => {
    setQuery(allowCustom ? option.value : option.label);
    setOpen(false);
    onChange(option.value, option);
  };

  const handleInput = (e) => {
    const text = e.target.value;
    setQuery(text);
    setOpen(true);
    setActive(0);
    // Without allowCustom, typing only filters: the current pick stays until
    // another is chosen (blur snaps the text back to it).
    if (allowCustom) onChange(text, null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && open && results[active]) {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === 'Escape' && open) {
      e.preventDefault();
      setOpen(false);
    }
  };

  const handleBlur = () => {
    setOpen(false);
    if (allowCustom) return;
    // An exact (case/accent-insensitive) name counts as a pick; anything
    // else snaps back to the current selection.
    const exact = options.find((o) => normalize(o.label) === normalize(query));
    if (exact && exact.value !== value) choose(exact);
    else setQuery(selected?.label || '');
  };

  return (
    <div className={`search-select${open ? ' is-open' : ''}`}>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
        autoComplete="off"
        placeholder={placeholder}
        value={query}
        disabled={disabled}
        required={required}
        onChange={handleInput}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      {open && !disabled && (
        <ul className="search-select-list" id={listId} role="listbox" ref={listRef}>
          {results.length === 0 ? (
            <li className="search-select-empty">{allowCustom && query.trim() ? `Use “${query.trim()}”` : emptyText}</li>
          ) : (
            results.map((o, i) => (
              <li
                key={`${o.value}-${i}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                className={i === active ? 'is-active' : undefined}
                // mousedown, not click: fires before the input's blur
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(o);
                }}
                onMouseEnter={() => setActive(i)}
              >
                <span>{o.label}</span>
                {o.hint && <small>{o.hint}</small>}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
