import '../styles/PhotoCard.css';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface PhotoCardProps {
    image: string;
    title: string;
    photoId: string;
    index: number;
}

function PhotoCard({ image, title, photoId, index }: PhotoCardProps) {

    const getCategoryFromId = (id: string): string => {
        const prefix = id.split('-')[0].toUpperCase();

        switch(prefix) {
            case 'AB':
                return 'Abstract';
            case 'SK':
                return 'Sky';
            case 'NA':
                return 'Nature';
            default:
                return 'Uncategorized';
        }
    };

    const [isImageOpen, setIsImageOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleImageClick = () => {
        setIsImageOpen(true);
        setIsActive(false);
    };

    const handleCardClick = () => {
        setIsActive(true);
        // Auto-remove active state after animation
        setTimeout(() => setIsActive(false), 300);
    };

    return (
        <>
            <motion.div
                className={`photo-card ${isActive ? 'active' : ''}`}
                onClick={handleCardClick}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration: 0.5,
                    delay: (index % 3) * 0.1,
                    ease: "easeOut"
                }}
            >
                <div className="photo-card-image">
                    <img src={image} alt={title} />
                    <div className='photo-card-magnify' onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick();
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </div>
                </div>
                <div className="photo-card-content">
                    <h3 className="photo-card-title">{title}</h3>
                    <p className="photo-card-id">{getCategoryFromId(photoId)}</p>
                    <button className="photo-card-buy-btn" onClick={(e) => e.stopPropagation()}>Buy Now</button>
                </div>
            </motion.div>
            {isImageOpen && (
                <div className="photo-card-modal" onClick={() => setIsImageOpen(false)}>
                    <button className="photo-card-modal-close" onClick={() => setIsImageOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <img src={image} alt={title} onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </>
    )
}

export default PhotoCard;

