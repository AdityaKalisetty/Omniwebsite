import React from 'react';
import '../styles/About.css';

interface AboutProps {
  closeMenu: () => void;
}

function About({ closeMenu }: AboutProps) {
  React.useEffect(() => {
    closeMenu();
  }, [closeMenu]);

  return (
    <div className="about-container">
      <h1>About Omnigraphy</h1>
      <p>Welcome to Omnigraphy - Cards, Canvas, & Camera. This is where creativity meets photography.</p>
    </div>
  );
}

export default About;
