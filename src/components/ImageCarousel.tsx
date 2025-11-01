import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../styles/ImageCarousel.css';

const carouselImages = [
    "/src/photos/coloradoMountain.jpg",
    "/src/photos/shiva.jpg",
    "/src/photos/sky.jpg",
];

function ImageCarousel() {
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <Slider {...settings}>
            {carouselImages.map((url, index) => (
                <div key={index}>
                    <img src={url} alt={`Slide ${index+1}`} />
                    <div 
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "600px",
                            backgroundColor: "rgba(0,0,0,0.1)",
                            pointerEvents: "none",
                        }}
                    />
                </div>
            ))}
        </Slider>
    );
};

export default ImageCarousel;