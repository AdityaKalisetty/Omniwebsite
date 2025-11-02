import ImageCarousel from "../components/ImageCarousel";
import '../styles/Home.css';
import React from 'react';
import { motion } from 'framer-motion';

interface HomeProps {
    closeMenu: () => void;
}

function Home({ closeMenu } : HomeProps) {

    React.useEffect(() => {
        closeMenu();
    }, [closeMenu]);

    const text = "Cards, Canvas, & Camera";

    return (
        <div className="home-container">

            {/* Animated Text Container */}
            <div className="text-container">
                <motion.h1
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    {text}
                </motion.h1>
            </div>

            {/* Carousel with fade-in animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
            >
                <ImageCarousel />
            </motion.div>
        </div>
    );

}

export default Home
