import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MessagesSquare, MousePointerClick, Sparkles, Quote, LibraryBig, PencilLine } from 'lucide-react';
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

const MARQUEE_WORDS = ['achieve • başarmak', 'opportunity • fırsat', 'break the ice • ortamı yumuşatmak', 'give up • vazgeçmek', 'curious • meraklı', 'once in a blue moon • kırk yılda bir', 'knowledge • bilgi', 'look after • bakmak'];

export default function Home() {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const [selWord, setSelWord] = useState<VocabularyEntry | null>(null);
  const [selIdiom, setSelIdiom] = useState<IdiomEntry | null>(null);

  useEffect(() => {
    document.title = 'Idiom-Tech | İngilizce Sözlük: Kelimeler, Deyimler, Phrasal Verbs';
  }, []);

  const featuredWords = useMemo(
    () => FEATURED_WORDS.map((w) => WORDS.find((e) => e.word === w)).filter((e): e is VocabularyEntry => Boolean(e)),
    [],
  );
  const featuredIdioms = useMemo(
    () => FEATURED_IDIOMS.map((x) => IDIOMS.find((e) => e.expression === x)).filter((e): e is IdiomEntry => Boolean(e)),
    [],
  );

  const wordOfDay = useMemo(() => {
    const day = new Date().getDate();
    return WORDS.length ? WORDS[day % WORDS.length] : null;
  }, []);

  const idiomOfDay = useMemo(() => {
    const day = new Date().getDate();
    return IDIOMS.length ? IDIOMS[(day * 7) % IDIOMS.length] : null;
  }, []);

  const wordDetail: DetailData | null = selWord ? wordToDetail(selWord) : null;
  const idiomDetail: DetailData | null = selIdiom ? idiomToDetail(selIdiom) : null;

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-panel">
            <div className="hero-grid">
              <div>
                <span className="hero-badge"><Sparkles size={15} /> Lise öğrencileri için interaktif sözlük</span>
                <h1>İngilizceyi <span className="accent">kelime kelime</span> değil, hikâyesiyle öğren.</h1>
                <p className="hero-sub">
                  <strong>{WORDS.length}+ kelime, {IDIOMS.length} deyim, {PHRASALS.length} phrasal verb</strong> seni
                  bekliyor. Her karta tıkla: <strong>Türkçe anlamı</strong>, İngilizce açıklaması, örnek cümle
                  ve çevirisi hemen yanında açılsın. Ezber listesi değil, gerçek bir çalışma masası.
                </p>
                <div className="hero-actions">
                  <Link className="btn btn-primary" to="/vocabulary">
                    <BookOpen size={18} /> Kelimelere Göz At <ArrowRight size={18} />
                  </Link>
                  <Link className="btn btn-secondary" to="/idioms">
                    <MessagesSquare size={18} /> Deyimleri Keşfet <ArrowRight size={18} />
                  </Link>
                </div>
                <p className="hero-note">💡 İpucu: Beğendiğin kartları kalple favorilere ekle, sınavdan önce oradan tekrar et.</p>
                <div className="hero-stats">
                  <div className="stat-chip"><strong>{WORDS.length}+</strong><span>kelime kartı</span></div>
                  <div className="stat-chip"><strong>{IDIOMS.length}</strong><span>günlük deyim</span></div>
                  <div className="stat-chip"><strong>{PHRASALS.length}</strong><span>phrasal verb</span></div>
                </div>
              </div>

              <div className="hero-visual" aria-hidden="true">
                <div className="mini-card word-card">
                  <span className="pin" />
                  <div className="en">Achieve</div>
                  <div className="tr">Başarmak, elde etmek</div>
                  <span className="tag">Fiil · B1</span>
                </div>
                <div className="mini-card idiom-card">
                  <span className="pin" />
                  <div className="en">Break the ice</div>
                  <div className="tr">Ortamı yumuşatmak</div>
                  <span className="tag">Deyim · B1</span>
                </div>
                <div className="mini-card idiom-card">
                  <span className="pin" />
                  <div className="en">Give up</div>
                  <div className="tr">Vazgeçmek</div>
                  <span className="tag">Phrasal Verb · B1</span>
                </div>
                <div className="mini-card word-card">
                  <span className="pin" />
                  <div className="en">Opportunity</div>
                  <div className="tr">Fırsat</div>
                  <span className="tag">İsim · B1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="marquee" aria-hidden="true">
            <span>{MARQUEE_WORDS.map((w, i) => <span key={i}>{w} <span className="dot">✦</span></span>)}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker"><LibraryBig size={14} style={{ verticalAlign: -2 }} /> Raflar</div>
          <div className="category-grid">
            <article className="category-card green">
              <span className="category-icon"><BookOpen size={24} /></span>
              <h3>Kelime Rafı</h3>
              <p>
                Kitaplarda en çok karşına çıkan kelimeler; A2'den B2'ye seviyeli, konulu
                (eğitim, çevre, sağlık, teknoloji...) ve hepsi <strong>Türkçe anlam + örnek cümle + çeviri</strong> ile.
                Alfabeyle gez, seviyeye göre süz, karta tıkla öğren.
              </p>
              <div className="category-meta">
                <span className="count-pill">📚 {WORDS.length} kart</span>
                <span className="count-pill">🔤 A–Z dizili</span>
                <span className="count-pill">🎯 A2–B2</span>
              </div>
              <Link className="btn btn-forest" to="/vocabulary" style={{ marginTop: '1rem' }}>
                Kelimelere Git <ArrowRight size={18} />
              </Link>
            </article>
            <article className="category-card orange">
              <span className="category-icon"><MessagesSquare size={24} /></span>
              <h3>Deyim & Phrasal Rafı</h3>
              <p>
                Türkçeye birebir çevrilemeyen ama konuşmada her yerde olan ifadeler:
                <em> "a piece of cake", "look after", "give up"...</em> Her deyimde
                <strong> ne demek, nerede kullanılır, örnekte nasıl durur</strong> — hepsi tek kartta.
              </p>
              <div className="category-meta">
                <span className="count-pill">💬 {IDIOMS.length} deyim</span>
                <span className="count-pill">🧩 {PHRASALS.length} phrasal verb</span>
              </div>
              <Link className="btn btn-primary" to="/idioms" style={{ marginTop: '1rem' }}>
                İfadelere Git <ArrowRight size={18} />
              </Link>
            </article>
          </div>

          <div className="quote-band">
            <Quote size={26} style={{ flexShrink: 0, color: 'var(--brand)' }} />
            <p style={{ margin: 0 }}>
              <strong>Nasıl çalışmalısın?</strong> Günde 5 kart seç, önce Türkçe anlamı kapatıp
              İngilizcesinden tahmin et, sonra örneği yüksek sesle oku. Favorilere eklediklerin
              otomatik olarak <strong>Favorilerim</strong> sayfanda birikir — sınav haftası altın değerinde olur.
            </p>
          </div>
        </div>
      </section>

      {(wordOfDay || idiomOfDay) && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">✨ Bugünün masası</div>
                <h2>Günün Kelimesi & Deyimi</h2>
                <p>Her gün değişir — defterine yazmayı unutma.</p>
              </div>
            </div>
            <div className="word-day">
              {wordOfDay && (
                <div className="word-day-card">
                  <div className="label">📖 Günün Kelimesi</div>
                  <div className="big">{wordOfDay.word}</div>
                  <div className="mean">{wordOfDay.meanings.slice(0, 3).join(', ')}</div>
                  {wordOfDay.examples[0] && (
                    <div className="ex">“{wordOfDay.examples[0].sentence}” — {wordOfDay.examples[0].translation}</div>
                  )}
                  <Link className="btn btn-secondary" to="/vocabulary" style={{ marginTop: '0.9rem' }}>Sözlükte aç <ArrowRight size={16} /></Link>
                </div>
              )}
              {idiomOfDay && (
                <div className="word-day-card idiom">
                  <div className="label">💬 Günün Deyimi</div>
                  <div className="big" style={{ fontSize: '1.6rem' }}>{idiomOfDay.expression}</div>
                  <div className="mean">{idiomOfDay.meaningTr}</div>
                  {idiomOfDay.examples[0] && (
                    <div className="ex">“{idiomOfDay.examples[0].sentence}” — {idiomOfDay.examples[0].translation}</div>
                  )}
                  <Link className="btn btn-secondary" to="/idioms" style={{ marginTop: '0.9rem' }}>Deyimlerde aç <ArrowRight size={16} /></Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Öne çıkanlar</div>
              <h2>Önce Bunlara Bak</h2>
              <p>Karta tıkla, sağdaki sözlük kartında anlamı açılsın.</p>
            </div>
            <Link to="/vocabulary">Tüm kelimeler <ArrowRight size={16} /></Link>
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
              <div className="kicker">Konuşma dili</div>
              <h2>Günün Deyimleri</h2>
              <p>Filmlerde, dizilerde, sınavın konuşma bölümünde lazım olacaklar.</p>
            </div>
            <Link to="/idioms">Tüm ifadeler <ArrowRight size={16} /></Link>
          </div>
          <div className="list-layout">
            <div className="entry-grid">
              {featuredIdioms.map((e) => (
                <EntryCard
                  key={e.id}
                  title={e.expression}
                  badge="Deyim"
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

      <section className="section" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker"><PencilLine size={14} style={{ verticalAlign: -2 }} /> 3 adımda</div>
              <h2>Nasıl Çalışılır?</h2>
              <p>Kaybolmak yok — yöntem basit.</p>
            </div>
          </div>
          <div className="steps">
            <div className="step">
              <span className="step-num">1</span>
              <h3><MousePointerClick size={18} style={{ verticalAlign: -3 }} /> Keşfet</h3>
              <p>Kelime, deyim, phrasal verb raflarına gir. Arama çubuğuna Türkçe ya da İngilizce yaz, A–Z harflerle gez, seviyene göre filtrele.</p>
            </div>
            <div className="step">
              <span className="step-num">2</span>
              <h3>Anlamı yakala</h3>
              <p>Karta tıkla: Türkçe karşılığı, İngilizce açıklaması, eş-zıt anlamlıları ve <strong>çevirili örnek cümle</strong> hemen yanında açılır.</p>
            </div>
            <div className="step">
              <span className="step-num">3</span>
              <h3>Biriktir & tekrar et</h3>
              <p>İşe yarayanları kalple favorilere at. Sınavdan bir gece önce <strong>Favorilerim</strong> sayfan senin özel tekrar listen olur.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
