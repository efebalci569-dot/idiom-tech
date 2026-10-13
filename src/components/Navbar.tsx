import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BookOpenText } from 'lucide-react';
import { SITE_NAME } from '../config/site';

const LINKS = [
  { to: '/', label: 'Ana Sayfa', end: true },
  { to: '/vocabulary', label: 'Kelimeler', end: false },
  { to: '/idioms', label: 'Deyimler & Phrasal Verbs', end: false },
  { to: '/favorites', label: 'Favorilerim', end: false },
  { to: '/about', label: 'Hakkında', end: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="logo" aria-label={`${SITE_NAME} ana sayfa`}>
          <span className="logo-mark" aria-hidden="true">
            <BookOpenText size={20} />
          </span>
          <span>
            {SITE_NAME}
            <small>İnteraktif İngilizce Sözlük</small>
          </span>
        </NavLink>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav aria-label="Ana gezinti">
          <ul className={`nav-links${open ? ' open' : ''}`}>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
