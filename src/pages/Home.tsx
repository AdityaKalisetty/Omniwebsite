import ImageCarousel from "../components/ImageCarousel";
import '../styles/Home.css';
import React from 'react';

interface HomeProps {
    closeMenu: () => void;
}
function Home({ closeMenu } : HomeProps) {

    React.useEffect(() => {
        closeMenu();
    }, [closeMenu]);

    return (
        <div className="home-container">
            <div className="text-container">
                <h1>Cards, Canvas, & Camera</h1>
            </div>
            <ImageCarousel />
        </div>
    );

}

export default Home
