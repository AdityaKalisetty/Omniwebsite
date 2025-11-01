import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from "../assets/OmnigraphyFullLogo.svg";

interface NavbarProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}
function Navbar({ isMenuOpen, toggleMenu }: NavbarProps) {
  return (
    <nav className="glass-navbar">
      <div className="logo">
        <img src={logo} alt='OmnigraphyLogo' style={{ height: '50px' }}></img>
      </div>
      
      <button className='menu-toggle' onClick={toggleMenu}>
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li>
            <Link to="/" onClick={toggleMenu}>Home</Link>
        </li>
        <li>
            <Link to="/about" onClick={toggleMenu}>About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
