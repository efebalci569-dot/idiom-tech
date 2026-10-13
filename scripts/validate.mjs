// Idiom-Tech content quality gate. Run: node scripts/validate.mjs
// Fails (exit 1) on missing fields, duplicate ids, or missing required entries.
import { readFileSync } from 'node:fs';

const vocab = JSON.parse(readFileSync('src/data/vocabulary.json', 'utf8'));
const idioms = JSON.parse(readFileSync('src/data/idioms.json', 'utf8'));
const phrasals = JSON.parse(readFileSync('src/data/phrasal-verbs.json', 'utf8'));

let failures = 0;
const fail = (msg) => { failures++; console.error('FAIL:', msg); };

console.log(`Counts — words: ${vocab.length}, idioms: ${idioms.length}, phrasals: ${phrasals.length}`);
if (vocab.length < 100) fail('vocabulary must have 100+ entries');
if (idioms.length < 30) fail('idioms must have 30+ entries');
if (phrasals.length < 30) fail('phrasal verbs must have 30+ entries');

function checkUnique(list, name) {
  const ids = list.map((e) => e.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) fail(`${name} has duplicate ids: ${[...new Set(dupes)].join(', ')}`);
}
checkUnique(vocab, 'vocabulary');
checkUnique(idioms, 'idioms');
checkUnique(phrasals, 'phrasals');

const LEVELS = new Set(['', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']);

for (const e of vocab) {
  if (!e.word || !e.id) fail(`vocab entry missing word/id: ${JSON.stringify(e).slice(0, 60)}`);
  if (!Array.isArray(e.meanings) || e.meanings.length === 0) fail(`${e.id}: missing Turkish meanings`);
  if (!e.definition) fail(`${e.id}: missing English definition`);
  if (!Array.isArray(e.examples) || e.examples.length === 0) fail(`${e.id}: missing examples`);
  for (const ex of e.examples ?? []) {
    if (!ex.sentence || !ex.translation) fail(`${e.id}: example missing sentence/translation`);
  }
  if (/\s/.test(e.word ?? '')) fail(`${e.id}: vocabulary headword should be a single word`);
  if (!LEVELS.has(e.level ?? '')) fail(`${e.id}: unexpected level "${e.level}"`);
}

for (const e of idioms) {
  if (!e.expression || !e.id) fail(`idiom missing expression/id`);
  if (!e.meaningTr) fail(`${e.id}: missing Turkish meaning`);
  if (!e.definitionEn) fail(`${e.id}: missing English definition`);
  if (!Array.isArray(e.examples) || e.examples.length === 0) fail(`${e.id}: missing examples`);
  for (const ex of e.examples ?? []) {
    if (!ex.sentence || !ex.translation) fail(`${e.id}: example missing sentence/translation`);
  }
  if (!LEVELS.has(e.level ?? '')) fail(`${e.id}: unexpected level "${e.level}"`);
}

for (const e of phrasals) {
  if (!e.expression || !e.id) fail(`phrasal missing expression/id`);
  if (!Array.isArray(e.meanings) || e.meanings.length === 0) fail(`${e.id}: missing Turkish meanings`);
  if (!e.definitionEn) fail(`${e.id}: missing English definition`);
  if (!Array.isArray(e.examples) || e.examples.length === 0) fail(`${e.id}: missing examples`);
  if (!LEVELS.has(e.level ?? '')) fail(`${e.id}: unexpected level "${e.level}"`);
}

const mustWords = ['Achieve', 'Benefit', 'Environment', 'Improve', 'Opportunity', 'Responsibility',
  'Earn', 'Education', 'Effect', 'Effort', 'Experience'];
for (const w of mustWords) {
  if (!vocab.some((e) => e.word === w)) fail(`required word missing: ${w}`);
}
const mustIdioms = ['Break the ice', 'A piece of cake', 'Once in a blue moon', 'Under the weather',
  'Back to square one', 'Barking up the wrong tree', 'Beat around the bush', 'Hit the books', 'Cost an arm and a leg'];
for (const x of mustIdioms) {
  if (!idioms.some((e) => e.expression === x)) fail(`required idiom missing: ${x}`);
}
const mustPhrasals = ['Give up', 'Find out', 'Look after', 'Turn on', 'Turn off', 'Carry on',
  'Run out of', 'Get along with', 'Back up', 'Blow up', 'Break down', 'Bring up'];
for (const x of mustPhrasals) {
  if (!phrasals.some((e) => e.expression.toLowerCase() === x.toLowerCase())) fail(`required phrasal missing: ${x}`);
}

// Simulate app search logic: Turkish query "fırsat" must find Opportunity.
const norm = (s) => String(s ?? '').toLocaleLowerCase('en').trim();
const hit = vocab.filter((e) => [e.word, ...(e.meanings ?? []), e.definition].some((f) => norm(f).includes(norm('fırsat'))));
if (!hit.some((e) => e.word === 'Opportunity')) fail('Turkish search "fırsat" did not find Opportunity');

// Letter filter simulation: E must return only E-words, including all six required.
const eWords = vocab.filter((e) => norm(e.word).startsWith('e'));
if (!mustWords.filter((w) => w.startsWith('E')).every((w) => eWords.some((e) => e.word === w))) {
  fail('letter filter E misses required entries');
}
if (eWords.some((e) => !norm(e.word).startsWith('e'))) fail('letter filter E leaked non-E entries');

if (failures === 0) console.log('All content checks passed.');
else { console.error(`${failures} check(s) failed.`); process.exit(1); }
