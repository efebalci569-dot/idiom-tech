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
      <aside className="detail" aria-label="Detaylar">
        <div className="detail-empty">
          <p style={{ fontWeight: 800, fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--ink)' }}>Bir kart seç 📖</p>
          <p>Listeden herhangi bir kelimeye ya da deyime tıkla; Türkçe anlamı, İngilizce açıklaması ve örnek cümleler burada kâğıt kart gibi açılsın.</p>
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
          <button type="button" className="icon-btn" aria-label="Detayı kapat" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="detail-section">
          <h4>Türkçe Anlamı</h4>
          <p className="tr-text">{data.turkish.join(', ')}</p>
        </div>

        <div className="detail-section">
          <h4>İngilizce Açıklama</h4>
          <p>{data.definition}</p>
        </div>

        {data.examples.length > 0 && (
          <div className="detail-section">
            <h4>Örnek Cümle{data.examples.length > 1 ? 'ler' : ''}</h4>
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
            <h4>Kart Bilgisi</h4>
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
          {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
        </button>
      </aside>
    </>
  );
}
