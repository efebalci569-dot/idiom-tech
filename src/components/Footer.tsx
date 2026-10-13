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
              {SITE_NAME}
            </span>
            <p style={{ marginTop: '0.75rem' }}>
              {SITE_NAME} is an educational web platform developed for learning
              purposes. It helps high school students explore English vocabulary,
              idioms and phrasal verbs through organized content and clear examples.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/vocabulary">Vocabulary</Link></li>
              <li><Link to="/idioms">Idioms &amp; Phrasal Verbs</Link></li>
            </ul>
          </div>
          <div>
            <h4>Project</h4>
            <ul>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/about">About Project</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          {SITE_NAME} — built as an educational technology project. Content is
          prepared for study purposes.
        </div>
      </div>
    </footer>
  );
}
