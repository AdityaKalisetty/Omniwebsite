import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../styles/ImageCarousel.css';
import { useEffect, useState } from 'react';
import { fetchPhotosByKeyword, getImageUrl } from '../services/strapi';
import type { Photo } from '../services/strapi';

function ImageCarousel() {
    const [landscapePhotos, setLandscapePhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLandscapePhotos = async () => {
            setLoading(true);
            const photos = await fetchPhotosByKeyword('landscape');
            setLandscapePhotos(photos);
            setLoading(false);
        };

        loadLandscapePhotos();
    }, []);

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    if (loading) {
        return (
            <div className="carousel-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'white' }}>Loading carousel...</p>
            </div>
        );
    }

    if (landscapePhotos.length === 0) {
        return (
            <div className="carousel-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'white' }}>No landscape photos found</p>
            </div>
        );
    }

    return (
        <div className="carousel-wrapper">
            <Slider {...settings}>
                {landscapePhotos.map((photo) => (
                    <div key={photo.id} style={{position: "relative"}}>
                        <img src={getImageUrl(photo)} alt={photo.title} />
                        <div className="carousel-overlay" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageCarousel;