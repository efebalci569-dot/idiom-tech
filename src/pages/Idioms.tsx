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
  const [idiomFilters, setIdiomFilters] = useState<ExpressionFilters>(EMPTY_EXPRESSION_FILTERS);
  const [phrasalFilters, setPhrasalFilters] = useState<ExpressionFilters>(EMPTY_EXPRESSION_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Deyimler & Phrasal Verbs | Idiom-Tech';
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
    <div className="container" style={{ paddingBottom: '1rem' }}>
      <div className="page-hero">
        <div className="kicker">💬 İfade rafı</div>
        <h1>Deyimler & <span className="hl">Phrasal Verbs</span></h1>
        <p>
          Birebir çevirince komik duran ama ana dili İngilizce olanların her gün kullandığı ifadeler.
          <strong> {IDIOMS.length} deyim + {PHRASALS.length} phrasal verb</strong>, her birinde
          <strong> Türkçe anlam, ne zaman kullanılır bilgisi ve çevirili örnek</strong> var.
          Sekmelerle geçiş yap, karta tıkla, kart yanında açılsın.
        </p>
        <span className="tip">💡 Örnek: "It's raining cats and dogs" — kedi köpek yağmıyor, bardaktan boşanıyor demek 😄</span>
      </div>

      <div className="subtabs" role="tablist" aria-label="İfade türü">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'idioms'}
          className={`subtab${tab === 'idioms' ? ' active' : ''}`}
          onClick={() => switchTab('idioms')}
        >
          Deyimler ({IDIOMS.length})
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
          placeholder={tab === 'idioms' ? 'Deyim ara... (ör. kolay, şans, korkmak)' : 'Phrasal verb ara... (ör. give up, vazgeçmek)'}
          label={tab === 'idioms' ? 'Deyimleri ifade veya anlam ile ara' : 'Phrasal verbleri ifade veya anlam ile ara'}
        />
      </div>

      <AlphabetFilter
        selected={filters.letter}
        onSelect={(letter) => setFilters((f) => ({ ...f, letter }))}
        label={`${tab === 'idioms' ? 'Deyimleri' : 'Phrasal verbleri'} baş harfine göre süz`}
      />

      <div className="filter-row" role="group" aria-label="Seviye filtresi">
        <select
          className="filter-select"
          aria-label="Seviyeye göre süz"
          value={filters.level}
          onChange={(e) => setFilters((f) => ({ ...f, level: e.target.value }))}
        >
          <option value="ALL">Tüm seviyeler</option>
          {levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        {(filters.query !== '' || filters.letter !== 'ALL' || filters.level !== 'ALL') && (
          <button type="button" className="btn btn-secondary" style={{ minHeight: 44 }} onClick={reset}>
            Filtreleri temizle
          </button>
        )}
      </div>

      <p className="result-count" role="status">
        {results.length} ifade bulundu
      </p>

      {results.length === 0 ? (
        <EmptyState message="Sonuç bulunamadı. Aramanı ya da filtreleri değiştir." onReset={reset} />
      ) : (
        <div className="list-layout">
          <div className="entry-grid">
            {tab === 'idioms'
              ? idiomResults.map((e) => (
                  <EntryCard
                    key={e.id}
                    title={e.expression}
                    badge="Deyim"
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
