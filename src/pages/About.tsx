import { useEffect } from 'react';
import { Link2 } from 'lucide-react';
import QRBlock from '../components/QRBlock';
import { SITE_URL } from '../config/site';

export default function About() {
  useEffect(() => {
    document.title = 'Hakkında | Idiom-Tech';
  }, []);

  return (
    <div className="container" style={{ paddingBottom: '1rem' }}>
      <div className="page-hero">
        <div className="kicker">📖 Bu sözlük neden var?</div>
        <h1>Idiom-Tech <span className="hl">Hakkında</span></h1>
        <p>
          Ders kitaplarında, dizilerde, şarkılarda karşına çıkan İngilizce kelimeler ve
          kalıplar tek tek aratılınca öğrenme bölünüyor; liste ezberleyince de akılda kalmıyor.
          Burası o yüzden var: <strong>tıkla, anlamı gör, örneği oku, favorine ekle</strong> — sayfadan ayrılmadan.
        </p>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <section className="prose-card" aria-label="Projenin amacı">
          <h2>🎯 Projenin Amacı</h2>
          <p>
            Lise İngilizcesinde en çok lazım olan kelimeleri, deyimleri ve phrasal verbleri
            tek masada toplamak. Her kartta <strong>Türkçe anlam, İngilizce açıklama, örnek cümle
            ve Türkçe çeviri</strong> var. Alfabetik sıra ve seviye filtreleriyle sözlük gibi
            taranabiliyor; yandan açılan kartlarla okuma akışı hiç bölünmüyor.
          </p>
        </section>

        <section className="prose-card" aria-label="Kimler için">
          <h2>👩‍🎓 Kimler İçin?</h2>
          <p>
            Önce lise öğrencileri için: sınavlara, konuşma pratiğine ve dizi-film izlerken
            takılan yerlere birebir. Öğretmenler derste tahtaya yansıtıp örnek okutabilir;
            kendi kendine çalışan herkes de seviyesine göre (A2–B2) ilerleyebilir.
          </p>
        </section>

        <section className="prose-card" aria-label="Nasıl çalışılır">
          <h2>📚 Nasıl Çalışılır?</h2>
          <ul>
            <li><strong>Alfabetik raf düzeni</strong> — gerçek sözlük gibi tara, kaybolma.</li>
            <li><strong>Yan kartlar</strong> — anlam sağda açılır, listen kaybolmaz.</li>
            <li><strong>Çevirili örnekler</strong> — her kartta gerçek hayattan bir cümle ve Türkçesi.</li>
            <li><strong>Favorilerim</strong> — kalbe dokun, kişisel tekrar listen tarayıcında saklansın.</li>
            <li><strong>Üç ayrı raf</strong> — kelimeler, deyimler ve phrasal verblerin araması ve filtresi ayrı.</li>
            <li><strong>Günün kartları</strong> — ana sayfada her gün değişen kelime + deyim seni bekler.</li>
          </ul>
        </section>

        <section className="prose-card" aria-label="İçerik notu">
          <h2>✏️ İçerik Notu</h2>
          <p>
            Tanımlar ve örnek cümleler öğrenenler için özel yazıldı. Konu etiketleri (eğitim, çevre,
            sağlık...) genel temalardır; belirli bir müfredatın üniteleriyle birebir eşleşme iddiası taşımaz.
            Öğretmenlerin kendi ders kitaplarıyla karşılaştırarak kullanması önerilir.
          </p>
        </section>

        <section className="prose-card" aria-label="Proje ekibi">
          <h2>👥 Proje Ekibi</h2>
          <p>
            Ekip ve danışman isimleri buraya proje sahipleri tarafından eklenecek.
          </p>
        </section>

        <section className="prose-card" aria-label="Telefonla açma">
          <h2>📱 Telefonundan Aç</h2>
          <p>
            Sitenin adresi: <a href={SITE_URL} target="_blank" rel="noreferrer"><Link2 size={15} style={{ verticalAlign: -2 }} /> {SITE_URL}</a>
            {' '}— bağlantıya dokunarak ya da aşağıdaki karekodu okutarak sözlüğü telefonunda açabilirsin.
            Sergide ya da sınıfta sunarken karekod çok pratik olur.
          </p>
          <div className="qr-block">
            <QRBlock />
          </div>
        </section>
      </div>
    </div>
  );
}
