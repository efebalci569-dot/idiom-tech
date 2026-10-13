import { Link } from 'react-router-dom';
import { BookOpenText } from 'lucide-react';
import { SITE_NAME } from '../config/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="logo">
              <span className="logo-mark" aria-hidden="true">
                <BookOpenText size={20} />
              </span>
              <span>
                {SITE_NAME}
                <small>İnteraktif İngilizce Sözlük</small>
              </span>
            </span>
            <p style={{ marginTop: '0.75rem' }}>
              {SITE_NAME}, lise öğrencileri için hazırlanmış sıcak bir çalışma masasıdır:
              kelimeler, deyimler ve phrasal verbler; Türkçe anlamları, örnek cümleleri
              ve çevirileriyle tek tık uzağında. Ezber listesi değil, kütüphane ruhlu bir sözlük.
            </p>
          </div>
          <div>
            <h4>Keşfet</h4>
            <ul>
              <li><Link to="/">Ana Sayfa</Link></li>
              <li><Link to="/vocabulary">Kelimeler</Link></li>
              <li><Link to="/idioms">Deyimler &amp; Phrasal Verbs</Link></li>
            </ul>
          </div>
          <div>
            <h4>Proje</h4>
            <ul>
              <li><Link to="/favorites">Favorilerim</Link></li>
              <li><Link to="/about">Hakkında</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          {SITE_NAME} — eğitim amaçlı hazırlanmıştır. Her gün 5 kart, her hafta 1 tekrar. 📖
        </div>
      </div>
    </footer>
  );
}
