import { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vocabulary from './pages/Vocabulary';
import Idioms from './pages/Idioms';
import Favorites from './pages/Favorites';
import About from './pages/About';
import { FavoritesProvider } from './context/FavoritesContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <FavoritesProvider>
      <HashRouter>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/idioms" element={<Idioms />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </FavoritesProvider>
  );
}
