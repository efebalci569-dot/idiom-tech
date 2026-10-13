import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MessagesSquare, MousePointerClick, Sparkles } from 'lucide-react';
import { EntryCard } from '../components/EntryCard';
import DetailPanel, { type DetailData } from '../components/DetailPanel';
import { useFavoritesContext } from '../context/FavoritesContext';
import { idiomToDetail, wordToDetail } from '../utils/detail';
import vocabulary from '../data/vocabulary.json';
import idioms from '../data/idioms.json';
import phrasals from '../data/phrasal-verbs.json';
import type { IdiomEntry, PhrasalVerbEntry, VocabularyEntry } from '../types';

const WORDS = vocabulary as VocabularyEntry[];
const IDIOMS = idioms as IdiomEntry[];
const PHRASALS = phrasals as unknown as PhrasalVerbEntry[];

const FEATURED_WORDS = ['Achieve', 'Benefit', 'Environment', 'Improve', 'Opportunity', 'Responsibility'];
const FEATURED_IDIOMS = ['Break the ice', 'A piece of cake', 'Once in a blue moon', 'Under the weather'];

export default function Home() {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const [selWord, setSelWord] = useState<VocabularyEntry | null>(null);
  const [selIdiom, setSelIdiom] = useState<IdiomEntry | null>(null);

  useEffect(() => {
    document.title = 'Idiom-Tech | Discover English. Understand More.';
  }, []);

  const featuredWords = useMemo(
    () => FEATURED_WORDS.map((w) => WORDS.find((e) => e.word === w)).filter((e): e is VocabularyEntry => Boolean(e)),
    [],
  );
  const featuredIdioms = useMemo(
    () => FEATURED_IDIOMS.map((x) => IDIOMS.find((e) => e.expression === x)).filter((e): e is IdiomEntry => Boolean(e)),
    [],
  );

  const wordDetail: DetailData | null = selWord ? wordToDetail(selWord) : null;
  const idiomDetail: DetailData | null = selIdiom ? idiomToDetail(selIdiom) : null;

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-badge"><Sparkles size={15} /> Interactive English Learning</span>
            <h1>Discover English. <span className="accent">Understand More.</span></h1>
            <p className="hero-sub">
              Explore English vocabulary, learn everyday idioms, and improve your
              language skills with a simple and interactive learning experience.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/vocabulary">
                Explore Vocabulary <ArrowRight size={18} />
              </Link>
              <Link className="btn btn-secondary" to="/idioms">
                Discover Idioms <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-stats">
              <div><strong>{WORDS.length}+</strong><span>Vocabulary words</span></div>
              <div><strong>{IDIOMS.length}</strong><span>Idioms</span></div>
              <div><strong>{PHRASALS.length}</strong><span>Phrasal verbs</span></div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="mini-card word-card">
              <div className="en">Achieve</div>
              <div className="tr">Başarmak</div>
              <span className="tag">Verb · B1</span>
            </div>
            <div className="mini-card idiom-card">
              <div className="en">Break the ice</div>
              <div className="tr">Ortamı yumuşatmak</div>
              <span className="tag">Idiom · B1</span>
            </div>
            <div className="mini-card idiom-card">
              <div className="en">Give up</div>
              <div className="tr">Vazgeçmek</div>
              <span className="tag">Phrasal Verb · B1</span>
            </div>
            <div className="mini-card word-card">
              <div className="en">Opportunity</div>
              <div className="tr">Fırsat</div>
              <span className="tag">Noun · B1</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="category-grid">
            <article className="category-card">
              <span className="category-icon"><BookOpen size={24} /></span>
              <h3>English Vocabulary</h3>
              <p>Discover essential English words, understand their meanings, and explore real-life examples.</p>
              <Link className="btn btn-primary" to="/vocabulary" style={{ marginTop: '1rem' }}>
                Explore Words <ArrowRight size={18} />
              </Link>
            </article>
            <article className="category-card">
              <span className="category-icon"><MessagesSquare size={24} /></span>
              <h3>Idioms &amp; Phrasal Verbs</h3>
              <p>Learn common English expressions and phrasal verbs through clear explanations and practical examples.</p>
              <Link className="btn btn-primary" to="/idioms" style={{ marginTop: '1rem' }}>
                Explore Expressions <ArrowRight size={18} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Featured Words</h2>
              <p>Start learning right here — click a word to see its meaning.</p>
            </div>
            <Link to="/vocabulary">View all words <ArrowRight size={16} /></Link>
          </div>
          <div className="list-layout">
            <div className="entry-grid">
              {featuredWords.map((w) => (
                <EntryCard
                  key={w.id}
                  title={w.word}
                  badge={w.partOfSpeech[0]}
                  subtitle={w.meanings.slice(0, 2).join(', ')}
                  selected={selWord?.id === w.id}
                  onSelect={() => setSelWord((prev) => (prev?.id === w.id ? null : w))}
                />
              ))}
            </div>
            <DetailPanel
              data={wordDetail}
              isFavorite={selWord ? isFavorite('word', selWord.id) : false}
              onToggleFavorite={() => selWord && toggleFavorite('word', selWord.id)}
              onClose={() => setSelWord(null)}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Featured Idioms</h2>
              <p>Everyday expressions with real meanings — click an idiom to explore it.</p>
            </div>
            <Link to="/idioms">View all expressions <ArrowRight size={16} /></Link>
          </div>
          <div className="list-layout">
            <div className="entry-grid">
              {featuredIdioms.map((e) => (
                <EntryCard
                  key={e.id}
                  title={e.expression}
                  badge="Idiom"
                  subtitle={e.meaningTr}
                  selected={selIdiom?.id === e.id}
                  onSelect={() => setSelIdiom((prev) => (prev?.id === e.id ? null : e))}
                />
              ))}
            </div>
            <DetailPanel
              data={idiomDetail}
              isFavorite={selIdiom ? isFavorite('idiom', selIdiom.id) : false}
              onToggleFavorite={() => selIdiom && toggleFavorite('idiom', selIdiom.id)}
              onClose={() => setSelIdiom(null)}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>How It Works</h2>
              <p>Three simple steps to start learning.</p>
            </div>
          </div>
          <div className="steps">
            <div className="step">
              <span className="step-num">1</span>
              <h3><MousePointerClick size={18} style={{ verticalAlign: -3 }} /> Explore</h3>
              <p>Browse English words and expressions.</p>
            </div>
            <div className="step">
              <span className="step-num">2</span>
              <h3>Understand</h3>
              <p>Click on an entry to discover its meaning and examples.</p>
            </div>
            <div className="step">
              <span className="step-num">3</span>
              <h3>Learn</h3>
              <p>Review expressions and improve your vocabulary.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
