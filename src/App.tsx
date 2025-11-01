import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <div className='app-bg'>
        <Navbar isMenuOpen={isMenuOpen} toggleMenu = {toggleMenu} />
        <Routes>
          <Route path="/" element={<Home closeMenu={closeMenu} />} />
          <Route path="/about" element={<About closeMenu={closeMenu} />} /> 
        </Routes>
      </div>
    </Router>
  );

}

export default App
