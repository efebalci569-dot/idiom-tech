import { useEffect, useRef } from 'react';
import { Heart, HeartOff, X } from 'lucide-react';
import type { Example } from '../types';

/** Normalized detail model so words, idioms and phrasal verbs share one panel
 *  component without mixing their field meanings. */
export interface DetailData {
  title: string;
  kindLabel: string;
  turkish: string[];
  definition: string;
  examples: Example[];
  metaChips: { label: string; kind?: 'level' | 'default' }[];
  grouped?: { heading: string; items: string[] }[];
}

interface Props {
  data: DetailData | null;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

export default function DetailPanel({ data, isFavorite, onToggleFavorite, onClose }: Props) {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!data) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // Move focus into the panel for keyboard users.
    panelRef.current?.focus({ preventScroll: true });
    return () => document.removeEventListener('keydown', onKey);
  }, [data, onClose]);

  if (!data) {
    return (
      <aside className="detail" aria-label="Details">
        <div className="detail-empty">
          <p style={{ fontWeight: 700 }}>Select an entry</p>
          <p>Click any word or expression to see its meaning, examples and translation here.</p>
        </div>
      </aside>
    );
  }

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} aria-hidden="true" />
      <aside
        className="detail"
        aria-label={`Details for ${data.title}`}
        role="dialog"
        aria-modal="false"
        tabIndex={-1}
        ref={panelRef}
      >
        <div className="detail-head">
          <div>
            <div className="detail-title">{data.title}</div>
            <span className="detail-kind">{data.kindLabel}</span>
          </div>
          <button type="button" className="icon-btn" aria-label="Close details" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="detail-section">
          <h4>Turkish Meaning</h4>
          <p className="tr-text">{data.turkish.join(', ')}</p>
        </div>

        <div className="detail-section">
          <h4>English Definition</h4>
          <p>{data.definition}</p>
        </div>

        {data.examples.length > 0 && (
          <div className="detail-section">
            <h4>Example Sentence{data.examples.length > 1 ? 's' : ''}</h4>
            {data.examples.map((ex, i) => (
              <div className="example" key={i}>
                <div className="en-quote">“{ex.sentence}”</div>
                <div className="tr-quote">“{ex.translation}”</div>
              </div>
            ))}
          </div>
        )}

        {data.grouped?.map((g) => (
          <div className="detail-section" key={g.heading}>
            <h4>{g.heading}</h4>
            <div className="chip-row">
              {g.items.map((item) => (
                <span className="chip" key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}

        {data.metaChips.length > 0 && (
          <div className="detail-section">
            <h4>Details</h4>
            <div className="chip-row">
              {data.metaChips.map((c) => (
                <span className={`chip${c.kind === 'level' ? ' level' : ''}`} key={c.label}>
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          className={`btn btn-secondary btn-fav${isFavorite ? ' active' : ''}`}
          aria-pressed={isFavorite}
          onClick={onToggleFavorite}
        >
          {isFavorite ? <HeartOff size={18} /> : <Heart size={18} />}
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </aside>
    </>
  );
}
