import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from "../assets/OmnigraphyFullLogo.svg";

interface NavbarProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}
function Navbar({ isMenuOpen, toggleMenu }: NavbarProps) {
  const handleLinkClick = () => {
    // Only close menu if it's actually open (mobile view)
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <nav className="glass-navbar">
      <Link to="/" className="logo">
        <img src={logo} alt='OmnigraphyLogo'></img>
      </Link>

      <button className='menu-toggle' onClick={toggleMenu}>
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li>
            <Link to="/" onClick={handleLinkClick}>Home</Link>
        </li>
        <li>
            <Link to="/photos" onClick={handleLinkClick}>Photos</Link>
        </li>
        <li>
            <Link to="/about" onClick={handleLinkClick}>About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
