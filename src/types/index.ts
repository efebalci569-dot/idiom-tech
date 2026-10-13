export interface Example {
  sentence: string;
  translation: string;
}

export interface VocabularyEntry {
  id: string;
  word: string;
  partOfSpeech: string[];
  meanings: string[];
  definition: string;
  examples: Example[];
  synonyms: string[];
  antonyms: string[];
  level: string;
  topics: string[];
  source: string;
}

export interface IdiomEntry {
  id: string;
  expression: string;
  meaningTr: string;
  definitionEn: string;
  examples: Example[];
  usageContext: string;
  level: string;
  source: string;
}

export interface PhrasalVerbEntry {
  id: string;
  expression: string;
  meanings: string[];
  definitionEn: string;
  examples: Example[];
  level: string;
  source: string;
}

/** A unified favorite reference: kind + id, so words and expressions never mix. */
export type FavoriteKind = 'word' | 'idiom' | 'phrasal';

export interface FavoriteRef {
  kind: FavoriteKind;
  id: string;
}
