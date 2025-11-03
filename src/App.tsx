import { useState, lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Photos from './pages/Photos';
import Navbar from './components/Navbar';

// Lazy load ParticleBackground to reduce initial bundle size
const ParticleBackground = lazy(() => import('./components/ParticleBackground'));

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      <div className='app-bg'>
        <Navbar isMenuOpen={isMenuOpen} toggleMenu = {toggleMenu} />
        <Routes>
          <Route path="/" element={<Home closeMenu={closeMenu} />} />
          <Route path="/about" element={<About closeMenu={closeMenu} />} />
          <Route path="/photos" element={<Photos closeMenu={closeMenu}/>} />
        </Routes>
      </div>
    </Router>
  );

}

export default App
