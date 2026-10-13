import { useEffect } from 'react';
import QRBlock from '../components/QRBlock';

export default function About() {
  useEffect(() => {
    document.title = 'About Project | Idiom-Tech';
  }, []);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
      <h1>About Idiom-Tech</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '44rem' }}>
        Idiom-Tech is an educational web platform designed to help high school
        students explore English vocabulary, idioms, and phrasal verbs through
        organized content, clear explanations, and interactive learning tools.
      </p>

      <div style={{ marginTop: '1.5rem' }}>
        <section className="prose-card" aria-label="Project purpose">
          <h2>Project Purpose</h2>
          <p>
            High school students often meet unfamiliar English words, phrasal verbs
            and idioms in their coursebooks. Looking them up one by one is slow and
            memorizing lists without context rarely works. Idiom-Tech was built to
            solve this: click any entry to see its Turkish meaning, English
            definition, an example sentence and its Turkish translation — without
            leaving the page.
          </p>
        </section>

        <section className="prose-card" aria-label="Target audience">
          <h2>Target Audience</h2>
          <p>
            The platform is designed for high school students learning English, and
            it is also useful for English teachers and anyone who wants to improve
            their vocabulary in a structured way.
          </p>
        </section>

        <section className="prose-card" aria-label="Learning approach">
          <h2>Learning Approach</h2>
          <ul>
            <li><strong>Alphabetical order</strong> — entries are easy to scan, just like a dictionary.</li>
            <li><strong>Side detail panels</strong> — meanings open next to the list, so reading flow is never broken.</li>
            <li><strong>Example sentences</strong> — every entry shows real usage with a Turkish translation.</li>
            <li><strong>Favorites</strong> — students build a personal review list saved in their browser.</li>
            <li><strong>Separate categories</strong> — words, idioms and phrasal verbs each have their own section, search and A–Z filter.</li>
          </ul>
        </section>

        <section className="prose-card" aria-label="Educational resources">
          <h2>Educational Resources</h2>
          <p>
            Definitions and example sentences on this site are written originally
            for learners. Topics (Education, Environment, Health and others) describe
            general themes only — they do not claim to match any specific official
            curriculum unit. Teachers are encouraged to verify entries against the
            coursebooks used in their own classes.
          </p>
        </section>

        <section className="prose-card" aria-label="Project team">
          <h2>Project Team</h2>
          <p>
            Team member and advisor names will be added here by the project owners.
          </p>
        </section>

        <section className="prose-card" aria-label="Mobile access via QR code">
          <h2>Open on Your Phone</h2>
          <p>
            Visitors can open Idiom-Tech on their phones by scanning the QR code
            below — handy during project exhibitions.
          </p>
          <div className="qr-block">
            <QRBlock />
          </div>
        </section>
      </div>
    </div>
  );
}
