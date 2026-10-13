import type { DetailData } from '../components/DetailPanel';
import type { IdiomEntry, PhrasalVerbEntry, VocabularyEntry } from '../types';

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function wordToDetail(e: VocabularyEntry): DetailData {
  const grouped: DetailData['grouped'] = [];
  if (e.synonyms?.length) grouped.push({ heading: 'Synonyms', items: e.synonyms });
  if (e.antonyms?.length) grouped.push({ heading: 'Antonyms', items: e.antonyms });

  const metaChips: DetailData['metaChips'] = [];
  if (e.level) metaChips.push({ label: `Level: ${e.level}`, kind: 'level' });
  (e.topics ?? []).forEach((t) => metaChips.push({ label: t }));

  return {
    title: e.word,
    kindLabel: (e.partOfSpeech ?? []).map(capitalize).join(' / ') || 'Word',
    turkish: e.meanings ?? [],
    definition: e.definition ?? '',
    examples: e.examples ?? [],
    grouped,
    metaChips,
  };
}

export function idiomToDetail(e: IdiomEntry): DetailData {
  const metaChips: DetailData['metaChips'] = [];
  if (e.level) metaChips.push({ label: `Level: ${e.level}`, kind: 'level' });
  if (e.usageContext) metaChips.push({ label: e.usageContext });

  return {
    title: e.expression,
    kindLabel: 'Idiom',
    turkish: [e.meaningTr],
    definition: e.definitionEn ?? '',
    examples: e.examples ?? [],
    metaChips,
  };
}

export function phrasalToDetail(e: PhrasalVerbEntry): DetailData {
  const metaChips: DetailData['metaChips'] = [];
  if (e.level) metaChips.push({ label: `Level: ${e.level}`, kind: 'level' });

  return {
    title: e.expression,
    kindLabel: 'Phrasal Verb',
    turkish: e.meanings ?? [],
    definition: e.definitionEn ?? '',
    examples: e.examples ?? [],
    metaChips,
  };
}
