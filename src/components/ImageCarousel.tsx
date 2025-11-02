import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../styles/ImageCarousel.css';
import photo1 from "../photos/coloradoMountain.jpg";
import photo2 from "../photos/shiva.jpg";
import photo3 from "../photos/sky.jpg";



const carouselImages = [
    photo1, photo2, photo3,
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
        <div className="carousel-wrapper">
            <Slider {...settings}>
                {carouselImages.map((url, index) => (
                    <div key={index} style={{position: "relative"}}>
                        <img src={url} alt={`Slide ${index+1}`} />
                        <div className="carousel-overlay" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageCarousel;