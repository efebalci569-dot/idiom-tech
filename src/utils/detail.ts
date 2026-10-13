import type { DetailData } from '../components/DetailPanel';
import type { IdiomEntry, PhrasalVerbEntry, VocabularyEntry } from '../types';

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const POS_TR: Record<string, string> = {
  verb: 'Fiil',
  noun: 'İsim',
  adjective: 'Sıfat',
  adverb: 'Zarf',
  pronoun: 'Zamir',
  preposition: 'Edat',
  conjunction: 'Bağlaç',
  interjection: 'Ünlem',
  phrasal: 'Phrasal Verb',
};

function posLabel(pos: string[]): string {
  if (!pos?.length) return 'Kelime';
  return pos.map((p) => POS_TR[p.toLowerCase()] ?? capitalize(p)).join(' / ');
}

export function wordToDetail(e: VocabularyEntry): DetailData {
  const grouped: DetailData['grouped'] = [];
  if (e.synonyms?.length) grouped.push({ heading: 'Eş Anlamlılar (Synonyms)', items: e.synonyms });
  if (e.antonyms?.length) grouped.push({ heading: 'Zıt Anlamlılar (Antonyms)', items: e.antonyms });

  const metaChips: DetailData['metaChips'] = [];
  if (e.level) metaChips.push({ label: `Seviye: ${e.level}`, kind: 'level' });
  (e.topics ?? []).forEach((t) => metaChips.push({ label: t }));

  return {
    title: e.word,
    kindLabel: posLabel(e.partOfSpeech ?? []),
    turkish: e.meanings ?? [],
    definition: e.definition ?? '',
    examples: e.examples ?? [],
    grouped,
    metaChips,
  };
}

export function idiomToDetail(e: IdiomEntry): DetailData {
  const metaChips: DetailData['metaChips'] = [];
  if (e.level) metaChips.push({ label: `Seviye: ${e.level}`, kind: 'level' });
  if (e.usageContext) metaChips.push({ label: e.usageContext });

  return {
    title: e.expression,
    kindLabel: 'Deyim (Idiom)',
    turkish: [e.meaningTr],
    definition: e.definitionEn ?? '',
    examples: e.examples ?? [],
    metaChips,
  };
}

export function phrasalToDetail(e: PhrasalVerbEntry): DetailData {
  const metaChips: DetailData['metaChips'] = [];
  if (e.level) metaChips.push({ label: `Seviye: ${e.level}`, kind: 'level' });

  return {
    title: e.expression,
    kindLabel: 'Phrasal Verb',
    turkish: e.meanings ?? [],
    definition: e.definitionEn ?? '',
    examples: e.examples ?? [],
    metaChips,
  };
}
