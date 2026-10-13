import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { EntryCard } from '../components/EntryCard';
import DetailPanel from '../components/DetailPanel';
import { useFavoritesContext } from '../context/FavoritesContext';
import { idiomToDetail, phrasalToDetail, wordToDetail } from '../utils/detail';
import vocabulary from '../data/vocabulary.json';
import idioms from '../data/idioms.json';
import phrasals from '../data/phrasal-verbs.json';
import type {
  FavoriteKind,
  IdiomEntry,
  PhrasalVerbEntry,
  VocabularyEntry,
} from '../types';

const WORDS = vocabulary as VocabularyEntry[];
const IDIOMS = idioms as IdiomEntry[];
const PHRASALS = phrasals as unknown as PhrasalVerbEntry[];

interface Selection {
  kind: FavoriteKind;
  id: string;
}

export default function Favorites() {
  const { favoritesByKind, isFavorite, toggleFavorite } = useFavoritesContext();
  const [selection, setSelection] = useState<Selection | null>(null);

  useEffect(() => {
    document.title = 'Favorites | Idiom-Tech';
  }, []);

  const favWords = useMemo(
    () =>
      favoritesByKind('word')
        .map((id) => WORDS.find((w) => w.id === id))
        .filter((e): e is VocabularyEntry => Boolean(e))
        .sort((a, b) => a.word.localeCompare(b.word, 'en')),
    [favoritesByKind],
  );

  const favExpressions = useMemo(() => {
    const idiomFavs = favoritesByKind('idiom')
      .map((id) => IDIOMS.find((e) => e.id === id))
      .filter((e): e is IdiomEntry => Boolean(e))
      .map((e) => ({ kind: 'idiom' as const, title: e.expression, entry: e }));
    const phrasalFavs = favoritesByKind('phrasal')
      .map((id) => PHRASALS.find((e) => e.id === id))
      .filter((e): e is PhrasalVerbEntry => Boolean(e))
      .map((e) => ({ kind: 'phrasal' as const, title: e.expression, entry: e }));
    return [...idiomFavs, ...phrasalFavs].sort((a, b) => a.title.localeCompare(b.title, 'en'));
  }, [favoritesByKind]);

  const selectedDetail = (() => {
    if (!selection) return null;
    if (selection.kind === 'word') {
      const e = WORDS.find((w) => w.id === selection.id);
      return e ? wordToDetail(e) : null;
    }
    if (selection.kind === 'idiom') {
      const e = IDIOMS.find((x) => x.id === selection.id);
      return e ? idiomToDetail(e) : null;
    }
    const e = PHRASALS.find((x) => x.id === selection.id);
    return e ? phrasalToDetail(e) : null;
  })();

  const pick = (kind: FavoriteKind, id: string) =>
    setSelection((prev) => (prev?.kind === kind && prev?.id === id ? null : { kind, id }));

  if (favWords.length === 0 && favExpressions.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <h1>Favorites</h1>
        <div className="empty" role="status" style={{ marginTop: '1.5rem' }}>
          <Heart size={36} aria-hidden="true" />
          <p style={{ fontWeight: 700, color: 'var(--text)' }}>No favorites yet</p>
          <p>
            Open any word or expression and press “Add to Favorites” to build your
            personal study list. It stays saved in this browser.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link className="btn btn-primary" to="/vocabulary">Browse Words</Link>
            <Link className="btn btn-secondary" to="/idioms">Browse Expressions</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
      <h1>Favorites</h1>
      <p style={{ color: 'var(--muted)' }}>
        Your saved words and expressions — stored in this browser, kept after refresh.
      </p>

      <div className="list-layout" style={{ marginTop: '1.5rem' }}>
        <div>
          {favWords.length > 0 && (
            <section className="fav-section" aria-label="Favorite words">
              <h2 style={{ fontSize: '1.25rem' }}>Favorite Words ({favWords.length})</h2>
              <div className="entry-grid" style={{ marginTop: '0.75rem' }}>
                {favWords.map((w) => (
                  <EntryCard
                    key={w.id}
                    title={w.word}
                    badge={w.partOfSpeech[0]}
                    subtitle={w.meanings.slice(0, 2).join(', ')}
                    selected={selection?.kind === 'word' && selection?.id === w.id}
                    onSelect={() => pick('word', w.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {favExpressions.length > 0 && (
            <section className="fav-section" aria-label="Favorite expressions">
              <h2 style={{ fontSize: '1.25rem' }}>Favorite Expressions ({favExpressions.length})</h2>
              <div className="entry-grid" style={{ marginTop: '0.75rem' }}>
                {favExpressions.map((f) => (
                  <EntryCard
                    key={`${f.kind}:${f.entry.id}`}
                    title={f.title}
                    badge={f.kind === 'idiom' ? 'Idiom' : 'Phrasal Verb'}
                    subtitle={f.kind === 'idiom' ? f.entry.meaningTr : f.entry.meanings.slice(0, 2).join(', ')}
                    selected={selection?.kind === f.kind && selection?.id === f.entry.id}
                    onSelect={() => pick(f.kind, f.entry.id)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        <DetailPanel
          data={selectedDetail}
          isFavorite={selection ? isFavorite(selection.kind, selection.id) : false}
          onToggleFavorite={() => selection && toggleFavorite(selection.kind, selection.id)}
          onClose={() => setSelection(null)}
        />
      </div>
    </div>
  );
}
