# Idiom-Tech — İnteraktif İngilizce Sözlük

Lise öğrencileri için hazırlanmış sıcak, kütüphane ruhlu bir İngilizce çalışma
masası: kelimeler, deyimler ve phrasal verbler; Türkçe anlamları, örnek cümleleri
ve çevirileriyle tek tık uzağında. Arayüz Türkçedir; İngilizce içerik kartlarda sunulur.

**🌐 Canlı site:** https://efebalci569-dot.github.io/idiom-tech/

**Hakkında sayfasında** sitenin adresi tıklanabilir bağlantı + karekod (QR) olarak
yer alır; sergide/sınıfta telefonla açmak için kullanılır.

## İçerik

- **446 kelime** (`src/data/vocabulary.json`)
- **95 deyim** (`src/data/idioms.json`)
- **86 phrasal verb** (`src/data/phrasal-verbs.json`)
- Her kayıtta: Türkçe anlam, İngilizce açıklama, çevirili örnek cümle, seviye (A2–B2)
- Sayfalar: Ana Sayfa, Kelimeler, Deyimler & Phrasal Verbs, Favorilerim, Hakkında
- Favoriler `localStorage` içinde saklanır (aynı tarayıcıda kalıcı)
- Tam uyumlu (responsive): masaüstünde iki sütun, mobilde alt sayfa paneli

## Tech stack

React 18 + TypeScript + Vite 6 · React Router (HashRouter) · Lucide icons ·
`react-qr-code` · organized plain CSS (design tokens in `src/index.css`, no
framework required — fast on mobile connections).

## Setup & run

Requirements: **Node.js 18+** and npm.

```bash
npm install     # install dependencies
npm run dev     # local development server (http://localhost:5173)
npm run build   # type-check + production build into dist/
npm run preview # serve the production build locally for testing
node scripts/validate.mjs  # content quality gate (schema, counts, required entries)
```

Adding new content: append a record to the matching JSON file using the existing
schema (`id`, meanings, `definition`/`definitionEn`, `examples` with
`sentence` + `translation`, `level`, `topics`/`usageContext`, `source`). No code
changes needed. Then run `node scripts/validate.mjs` and `npm run build`.

## Publishing to GitHub Pages (HTTPS, QR-ready)

The project is pre-configured for trouble-free GitHub Pages hosting:

1. `vite.config.ts` uses `base: './'` (relative asset URLs — works for both
   project sites and user sites) and routing uses **HashRouter** (`#/vocabulary`),
   so page refreshes and direct links never 404. No server config needed.
2. Create a GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Idiom-Tech v1"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
3. Deploy the built site:
   ```bash
   npm run deploy
   ```
   (runs `npm run build` then publishes `dist/` with the `gh-pages` package).
   Or: upload the contents of `dist/` manually in any static host.
4. In the repo: **Settings → Pages → Deploy from branch → `gh-pages` branch**.
   Your public address will be `https://<user>.github.io/<repo>/` (HTTPS).
5. **Activate the QR code:** put that exact address into `SITE_URL` in
   `src/config/site.ts`, rebuild and redeploy:
   ```bash
   npm run deploy
   ```
   The About page (“Open on Your Phone”) will then render a scannable QR code
   with the caption “Scan to Explore Idiom-Tech”. Test it with 2–3 different
   phones before printing the exhibition poster. Until `SITE_URL` is set, the
   page honestly shows “QR code coming after publishing” instead of a fake code.

## Test raporu (güncel)

Otomatik içerik kontrolü (`node scripts/validate.mjs` varsa çalıştır): şema eksiksiz
(anlamlar, tanımlar, çevirili örnekler); id'ler tekil; gerekli kayıtlar mevcut
(öne çıkan kelimeler/deyimler); Türkçe arama "fırsat" → Opportunity; harf filtresi
"E" yalnızca E-kelimelerini döndürür.

Manual checklist against the project spec:

| # | Scenario | Result |
|---|----------|--------|
| 1 | Home → Vocabulary navigation | ✅ pass |
| 2 | Letter “E” lists only E-words (Earn, Education, Effect, Effort, Environment, Experience…) | ✅ pass (logic covered by gate) |
| 3 | Clicking a word opens correct TR meaning + example in side panel | ✅ pass |
| 4 | Turkish meaning search (“fırsat” → Opportunity) | ✅ pass |
| 5 | Idiom click shows correct explanation | ✅ pass |
| 6 | Idioms / Phrasal Verbs tabs independent, filters reset on switch | ✅ pass |
| 7 | Favorites survive page refresh (localStorage) | ✅ pass (separate Word/Expression sections) |
| 8 | Quiz scoring | ⏭️ **deferred** — quiz ships in v2 (see below) |
| 9 | Mobile use (responsive layout, bottom-sheet panel) | ✅ pass (CSS breakpoints at 960/640px; verify on a real phone after deploy) |
| 10 | Empty search shows friendly message + reset | ✅ pass |
| 11 | QR opens the correct page | ⏳ pending real URL (see publishing steps) |
| 12 | No cross-category data leaks when switching pages | ✅ pass (separate data files, filters, favorites kinds) |
| 13 | Keyboard: search, filters, Esc closes panel, visible focus | ✅ pass |
| 14 | Corrupt/missing fields don’t crash (safe reads, empty states, storage try/catch) | ✅ pass |

## Henüz eklenmedi (planlanan v2)

- **Mini Quiz sayfası** (gerçek veriden 10 soru, karışık şıklar, skor ekranı)
- Hakkında sayfasına proje ekip isimleri (proje sahipleri verecek)
- Kayıt sayısı ~1000'i geçerse sayfalama (pagination)
