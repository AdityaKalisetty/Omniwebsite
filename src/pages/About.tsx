import React from 'react';

interface AboutProps {
  closeMenu: () => void;
}

function About({ closeMenu }: AboutProps) {
  React.useEffect(() => {
    closeMenu();
  }, [closeMenu]);

  return <div>About us page content here</div>;
}

export default About;
