import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import AlphabetFilter from '../components/AlphabetFilter';
import { EntryCard } from '../components/EntryCard';
import DetailPanel from '../components/DetailPanel';
import EmptyState from '../components/EmptyState';
import { useFavoritesContext } from '../context/FavoritesContext';
import { wordToDetail } from '../utils/detail';
import {
  EMPTY_WORD_FILTERS,
  filterVocabulary,
  type WordFilters,
} from '../utils/search';
import vocabulary from '../data/vocabulary.json';
import type { VocabularyEntry } from '../types';

const WORDS = vocabulary as VocabularyEntry[];

function uniqueSorted(values: (string | undefined)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort((a, b) =>
    a.localeCompare(b, 'en'),
  );
}

export default function Vocabulary() {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const [filters, setFilters] = useState<WordFilters>(EMPTY_WORD_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'English Vocabulary | Idiom-Tech';
  }, []);

  const levels = useMemo(() => uniqueSorted(WORDS.map((w) => w.level)), []);
  const topics = useMemo(() => uniqueSorted(WORDS.flatMap((w) => w.topics ?? [])), []);
  const parts = useMemo(() => uniqueSorted(WORDS.flatMap((w) => w.partOfSpeech ?? [])), []);

  const results = useMemo(() => filterVocabulary(WORDS, filters), [filters]);
  const selected = WORDS.find((w) => w.id === selectedId) ?? null;

  const set = <K extends keyof WordFilters>(key: K, value: WordFilters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const reset = () => {
    setFilters(EMPTY_WORD_FILTERS);
    setSelectedId(null);
  };

  const isFiltered =
    filters.query !== '' ||
    filters.letter !== 'ALL' ||
    filters.level !== 'ALL' ||
    filters.topic !== 'ALL' ||
    filters.partOfSpeech !== 'ALL';

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
      <h1>English Vocabulary</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '40rem' }}>
        Explore English words, understand their meanings, and learn how to use them in context.
      </p>

      <div style={{ marginTop: '1.25rem' }}>
        <SearchBar
          value={filters.query}
          onChange={(v) => set('query', v)}
          placeholder="Search for a word..."
          label="Search vocabulary by English word or Turkish meaning"
        />
      </div>

      <AlphabetFilter
        selected={filters.letter}
        onSelect={(letter) => set('letter', letter)}
        label="Filter vocabulary by first letter"
      />

      <div className="filter-row" role="group" aria-label="Additional vocabulary filters">
        <select
          className="filter-select"
          aria-label="Filter by level"
          value={filters.level}
          onChange={(e) => set('level', e.target.value)}
        >
          <option value="ALL">All levels</option>
          {levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <select
          className="filter-select"
          aria-label="Filter by topic"
          value={filters.topic}
          onChange={(e) => set('topic', e.target.value)}
        >
          <option value="ALL">All topics</option>
          {topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          className="filter-select"
          aria-label="Filter by part of speech"
          value={filters.partOfSpeech}
          onChange={(e) => set('partOfSpeech', e.target.value)}
        >
          <option value="ALL">All word types</option>
          {parts.map((p) => (
            <option key={p} value={p} style={{ textTransform: 'capitalize' }}>{p}</option>
          ))}
        </select>
        {isFiltered && (
          <button type="button" className="btn btn-secondary" style={{ minHeight: 44 }} onClick={reset}>
            Clear filters
          </button>
        )}
      </div>

      <p className="result-count" role="status">
        {results.length} word{results.length === 1 ? '' : 's'} found
      </p>

      {results.length === 0 ? (
        <EmptyState message="No words found. Try another search." onReset={reset} />
      ) : (
        <div className="list-layout">
          <div className="entry-grid">
            {results.map((w) => (
              <EntryCard
                key={w.id}
                title={w.word}
                badge={w.partOfSpeech[0]}
                subtitle={w.meanings.slice(0, 2).join(', ')}
                selected={selectedId === w.id}
                onSelect={() => setSelectedId((prev) => (prev === w.id ? null : w.id))}
              />
            ))}
          </div>
          <DetailPanel
            data={selected ? wordToDetail(selected) : null}
            isFavorite={selected ? isFavorite('word', selected.id) : false}
            onToggleFavorite={() => selected && toggleFavorite('word', selected.id)}
            onClose={() => setSelectedId(null)}
          />
        </div>
      )}
    </div>
  );
}
