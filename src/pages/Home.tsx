import ImageCarousel from "../components/ImageCarousel";
import '../styles/Home.css';
function Home() {

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
