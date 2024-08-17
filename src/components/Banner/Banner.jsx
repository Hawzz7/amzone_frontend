import Slider from "react-slick";
import bannerimage1 from "../../assets/banner/bannerImgOne.jpg";
import bannerimage2 from "../../assets/banner/bannerImgTwo.jpg";
import bannerimage3 from "../../assets/banner/bannerImgThree.jpg";
import bannerimage4 from "../../assets/banner/bannerImgFour.jpg";
import bannerimage5 from "../../assets/banner/bannerImgFive.jpg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";

const images = [
  bannerimage1,
  bannerimage2,
  bannerimage3,
  bannerimage4,
  bannerimage5,
  bannerimage1,
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransition, setIsTransition] = useState(true);


  useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);


  useEffect(() => {
    if (current === images.length - 1) {
      setTimeout(() => {
        setIsTransition(false);
        setCurrent(0);
      }, 500); 
    } else {
      setIsTransition(true);

    }
  }, [current]);


  const prevSlide = () => {
    if (current === 0) {
      setIsTransition(false);
      setCurrent(images.length - 2); 
    } else {
      setIsTransition(true);
      setCurrent(current - 1);
    }
  };


  const nextSlide = () => {
    if (current === images.length - 1) {
      setIsTransition(false);
      setCurrent(0);
    } else {
      setIsTransition(true);
      setCurrent(current + 1);
    }
  };


  return (
    <div className="w-full">
      <div
        className="overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex transition ease-out duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`banner ${index + 1}`}
              className="w-full"
            />
          ))}
        </div>
        <div className="absolute top-0 h-full w-full justify-between items-center flex text-black">
          <button onClick={prevSlide}>
            <ArrowBackIosIcon style={{ fontSize: 35 }} />
          </button>
          <button onClick={nextSlide}>
            <ArrowForwardIosIcon style={{ fontSize: 35 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
