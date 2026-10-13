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
    document.title = 'İngilizce Kelimeler | Idiom-Tech';
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
    <div className="container" style={{ paddingBottom: '1rem' }}>
      <div className="page-hero">
        <div className="kicker">📚 Kelime rafı</div>
        <h1>İngilizce <span className="hl">Kelimeler</span></h1>
        <p>
          Ders kitaplarında, dizilerde ve sınavlarda en çok çıkan <strong>{WORDS.length} kelime</strong> burada.
          Aramaya Türkçe ya da İngilizce yazabilirsin — örneğin <em>"fırsat"</em> yazınca <em>opportunity</em> gelir.
          Harflere dokun, seviyeni seç, karta tıkla: anlamı, örneği ve çevirisi yanında açılsın.
        </p>
        <span className="tip">💡 Her kartta: Türkçe anlam + İngilizce açıklama + çevirili örnek cümle var</span>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <SearchBar
          value={filters.query}
          onChange={(v) => set('query', v)}
          placeholder="Kelime ara... (ör. brave, fırsat, environment)"
          label="İngilizce kelime veya Türkçe anlam ile ara"
        />
      </div>

      <AlphabetFilter
        selected={filters.letter}
        onSelect={(letter) => set('letter', letter)}
        label="Kelimeleri baş harfine göre süz"
      />

      <div className="filter-row" role="group" aria-label="Kelime filtreleri">
        <select
          className="filter-select"
          aria-label="Seviyeye göre süz"
          value={filters.level}
          onChange={(e) => set('level', e.target.value)}
        >
          <option value="ALL">Tüm seviyeler</option>
          {levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <select
          className="filter-select"
          aria-label="Konuya göre süz"
          value={filters.topic}
          onChange={(e) => set('topic', e.target.value)}
        >
          <option value="ALL">Tüm konular</option>
          {topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          className="filter-select"
          aria-label="Türe göre süz"
          value={filters.partOfSpeech}
          onChange={(e) => set('partOfSpeech', e.target.value)}
        >
          <option value="ALL">Tüm türler</option>
          {parts.map((p) => (
            <option key={p} value={p} style={{ textTransform: 'capitalize' }}>{p}</option>
          ))}
        </select>
        {isFiltered && (
          <button type="button" className="btn btn-secondary" style={{ minHeight: 44 }} onClick={reset}>
            Filtreleri temizle
          </button>
        )}
      </div>

      <p className="result-count" role="status">
        {results.length} kelime bulundu
      </p>

      {results.length === 0 ? (
        <EmptyState message="Sonuç bulunamadı. Başka bir kelime dene." onReset={reset} />
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
