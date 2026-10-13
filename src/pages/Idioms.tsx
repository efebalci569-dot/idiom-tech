import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import AlphabetFilter from '../components/AlphabetFilter';
import { EntryCard } from '../components/EntryCard';
import DetailPanel from '../components/DetailPanel';
import EmptyState from '../components/EmptyState';
import { useFavoritesContext } from '../context/FavoritesContext';
import { idiomToDetail, phrasalToDetail } from '../utils/detail';
import {
  EMPTY_EXPRESSION_FILTERS,
  filterIdioms,
  filterPhrasals,
  type ExpressionFilters,
} from '../utils/search';
import idioms from '../data/idioms.json';
import phrasals from '../data/phrasal-verbs.json';
import type { FavoriteKind, IdiomEntry, PhrasalVerbEntry } from '../types';

const IDIOMS = idioms as IdiomEntry[];
const PHRASALS = phrasals as unknown as PhrasalVerbEntry[];

type Tab = 'idioms' | 'phrasal';

export default function Idioms() {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const [tab, setTab] = useState<Tab>('idioms');
  // Each tab owns its filters: switching tabs resets search & letter.
  const [idiomFilters, setIdiomFilters] = useState<ExpressionFilters>(EMPTY_EXPRESSION_FILTERS);
  const [phrasalFilters, setPhrasalFilters] = useState<ExpressionFilters>(EMPTY_EXPRESSION_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Idioms & Phrasal Verbs | Idiom-Tech';
  }, []);

  const filters = tab === 'idioms' ? idiomFilters : phrasalFilters;
  const setFilters = tab === 'idioms' ? setIdiomFilters : setPhrasalFilters;

  const idiomResults = useMemo(() => filterIdioms(IDIOMS, idiomFilters), [idiomFilters]);
  const phrasalResults = useMemo(() => filterPhrasals(PHRASALS, phrasalFilters), [phrasalFilters]);
  const results = tab === 'idioms' ? idiomResults : phrasalResults;

  const levels = useMemo(() => {
    const src = tab === 'idioms' ? IDIOMS.map((e) => e.level) : PHRASALS.map((e) => e.level);
    return Array.from(new Set(src.filter(Boolean))).sort();
  }, [tab]);

  const selectedKind: FavoriteKind = tab === 'idioms' ? 'idiom' : 'phrasal';
  const selected =
    tab === 'idioms'
      ? (IDIOMS.find((e) => e.id === selectedId) ?? null)
      : (PHRASALS.find((e) => e.id === selectedId) ?? null);

  const switchTab = (next: Tab) => {
    setTab(next);
    setSelectedId(null);
    if (next === 'idioms') setIdiomFilters(EMPTY_EXPRESSION_FILTERS);
    else setPhrasalFilters(EMPTY_EXPRESSION_FILTERS);
  };

  const reset = () => {
    setFilters(EMPTY_EXPRESSION_FILTERS);
    setSelectedId(null);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
      <h1>Idioms &amp; Phrasal Verbs</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '42rem' }}>
        Discover common English expressions and phrasal verbs with clear meanings and practical examples.
      </p>

      <div className="subtabs" role="tablist" aria-label="Expression type">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'idioms'}
          className={`subtab${tab === 'idioms' ? ' active' : ''}`}
          onClick={() => switchTab('idioms')}
        >
          Idioms ({IDIOMS.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'phrasal'}
          className={`subtab${tab === 'phrasal' ? ' active' : ''}`}
          onClick={() => switchTab('phrasal')}
        >
          Phrasal Verbs ({PHRASALS.length})
        </button>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <SearchBar
          value={filters.query}
          onChange={(v) => setFilters((f) => ({ ...f, query: v }))}
          placeholder={tab === 'idioms' ? 'Search for an idiom...' : 'Search for a phrasal verb...'}
          label={tab === 'idioms' ? 'Search idioms by expression or meaning' : 'Search phrasal verbs by expression or meaning'}
        />
      </div>

      <AlphabetFilter
        selected={filters.letter}
        onSelect={(letter) => setFilters((f) => ({ ...f, letter }))}
        label={`Filter ${tab === 'idioms' ? 'idioms' : 'phrasal verbs'} by first letter`}
      />

      <div className="filter-row" role="group" aria-label="Level filter">
        <select
          className="filter-select"
          aria-label="Filter by level"
          value={filters.level}
          onChange={(e) => setFilters((f) => ({ ...f, level: e.target.value }))}
        >
          <option value="ALL">All levels</option>
          {levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        {(filters.query !== '' || filters.letter !== 'ALL' || filters.level !== 'ALL') && (
          <button type="button" className="btn btn-secondary" style={{ minHeight: 44 }} onClick={reset}>
            Clear filters
          </button>
        )}
      </div>

      <p className="result-count" role="status">
        {results.length} expression{results.length === 1 ? '' : 's'} found
      </p>

      {results.length === 0 ? (
        <EmptyState message="No results found. Try changing your search or filters." onReset={reset} />
      ) : (
        <div className="list-layout">
          <div className="entry-grid">
            {tab === 'idioms'
              ? idiomResults.map((e) => (
                  <EntryCard
                    key={e.id}
                    title={e.expression}
                    badge="Idiom"
                    subtitle={e.meaningTr}
                    selected={selectedId === e.id}
                    onSelect={() => setSelectedId((prev) => (prev === e.id ? null : e.id))}
                  />
                ))
              : phrasalResults.map((e) => (
                  <EntryCard
                    key={e.id}
                    title={e.expression}
                    badge="Phrasal Verb"
                    subtitle={e.meanings.slice(0, 2).join(', ')}
                    selected={selectedId === e.id}
                    onSelect={() => setSelectedId((prev) => (prev === e.id ? null : e.id))}
                  />
                ))}
          </div>
          <DetailPanel
            data={
              selected
                ? tab === 'idioms'
                  ? idiomToDetail(selected as IdiomEntry)
                  : phrasalToDetail(selected as PhrasalVerbEntry)
                : null
            }
            isFavorite={selected ? isFavorite(selectedKind, selected.id) : false}
            onToggleFavorite={() => selected && toggleFavorite(selectedKind, selected.id)}
            onClose={() => setSelectedId(null)}
          />
        </div>
      )}
    </div>
  );
}
