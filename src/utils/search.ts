import type {
  FavoriteRef,
  IdiomEntry,
  PhrasalVerbEntry,
  VocabularyEntry,
} from '../types';

export const ALPHABET: string[] = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i),
);

function norm(value: unknown): string {
  return String(value ?? '')
    .toLocaleLowerCase('en')
    .trim();
}

/** Case-insensitive substring search across English headword, Turkish meanings and English definition. */
function matchesQuery(haystack: string[], query: string): boolean {
  if (!query) return true;
  const q = norm(query);
  return haystack.some((field) => norm(field).includes(q));
}

function matchesLetter(headword: string, letter: string): boolean {
  if (!letter || letter === 'ALL') return true;
  return norm(headword).startsWith(norm(letter));
}

function matchesLevel(level: string, filter: string): boolean {
  if (!filter || filter === 'ALL') return true;
  return norm(level) === norm(filter);
}

export interface WordFilters {
  query: string;
  letter: string;
  level: string;
  topic: string;
  partOfSpeech: string;
}

export const EMPTY_WORD_FILTERS: WordFilters = {
  query: '',
  letter: 'ALL',
  level: 'ALL',
  topic: 'ALL',
  partOfSpeech: 'ALL',
};

export function filterVocabulary(
  entries: VocabularyEntry[],
  filters: WordFilters,
): VocabularyEntry[] {
  return entries
    .filter((e) => {
      if (!e || !e.word) return false;
      if (!matchesLetter(e.word, filters.letter)) return false;
      if (!matchesLevel(e.level, filters.level)) return false;
      if (
        filters.topic !== 'ALL' &&
        !(e.topics ?? []).some((t) => norm(t) === norm(filters.topic))
      )
        return false;
      if (
        filters.partOfSpeech !== 'ALL' &&
        !(e.partOfSpeech ?? []).some((p) => norm(p) === norm(filters.partOfSpeech))
      )
        return false;
      return matchesQuery(
        [e.word, ...(e.meanings ?? []), e.definition ?? ''],
        filters.query,
      );
    })
    .sort((a, b) => norm(a.word).localeCompare(norm(b.word), 'en'));
}

export interface ExpressionFilters {
  query: string;
  letter: string;
  level: string;
}

export const EMPTY_EXPRESSION_FILTERS: ExpressionFilters = {
  query: '',
  letter: 'ALL',
  level: 'ALL',
};

export function filterIdioms(
  entries: IdiomEntry[],
  filters: ExpressionFilters,
): IdiomEntry[] {
  return entries
    .filter((e) => {
      if (!e || !e.expression) return false;
      if (!matchesLetter(e.expression, filters.letter)) return false;
      if (!matchesLevel(e.level, filters.level)) return false;
      return matchesQuery(
        [e.expression, e.meaningTr ?? '', e.definitionEn ?? ''],
        filters.query,
      );
    })
    .sort((a, b) => norm(a.expression).localeCompare(norm(b.expression), 'en'));
}

export function filterPhrasals(
  entries: PhrasalVerbEntry[],
  filters: ExpressionFilters,
): PhrasalVerbEntry[] {
  return entries
    .filter((e) => {
      if (!e || !e.expression) return false;
      if (!matchesLetter(e.expression, filters.letter)) return false;
      if (!matchesLevel(e.level, filters.level)) return false;
      return matchesQuery(
        [e.expression, ...(e.meanings ?? []), e.definitionEn ?? ''],
        filters.query,
      );
    })
    .sort((a, b) => norm(a.expression).localeCompare(norm(b.expression), 'en'));
}

export function favoriteKey(ref: FavoriteRef): string {
  return `${ref.kind}:${ref.id}`;
}
