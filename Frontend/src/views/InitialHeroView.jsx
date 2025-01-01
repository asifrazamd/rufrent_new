import { useState, useEffect } from "react";
import CarouselModel from "../models/carouselImageModel";
import tailwindStyles from "../utils/tailwindStyles";

const HeroSection = () => {
  const images = CarouselModel;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  // Navigation functions
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section
      id="home"
      className="relative bg-gray-200 mt-16 flex flex-col items-center justify-center h-3/4  text-center px-4 py-24"
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.imageUrl}
            alt={`Carousel ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-20 hover:bg-opacity-75"
        onClick={handlePrev}
        aria-label="Previous"
      >
        &#9664;
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-20 hover:bg-opacity-75"
        onClick={handleNext}
        aria-label="Next"
      >
        &#9654;
      </button>

      {/* Content Overlay */}
      <div
        style={{ backgroundColor: "#0908086e", color: "#E9DCC9" }}
        className={`relative z-10 backdrop-blur-sm p-6 rounded-lg shadow-lg w-full max-w-3xl`}
      >
        <h1 className="text-xl md:text-5xl font-bold text-[#4A628A] mb-4">
          Find Your Perfect Rental Property
        </h1>
        <p className="text-base md:text-xl text-[#7AB2D3] mb-8">
          Explore a wide range of properties tailored just for you.
        </p>

        <form className="flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search.."
            className={`${tailwindStyles.paragraph} w-full md:flex-1 px-4 py-2 border border-[#B9E5E8] rounded-md focus:outline-none focus:border-[#4A628A]`}
          />

          {/* Price Filter */}
          {/* <select
            className={`${tailwindStyles.paragraph} w-full md:flex-1 px-4 py-2 border border-[#B9E5E8] rounded-md focus:outline-none focus:border-[#4A628A]`}
          >
            <option value="">Price Range</option>
            <option value="0-1000">Rs 1000 - Rs 20,000</option>
            <option value="1000-2000">Rs 20,000 - Rs 40,000</option>
            <option value="2000-3000">Rs 40,000 - Rs 1,00,000</option>
          </select> */}

          {/* Property Type Filter */}
          <select
            className={`${tailwindStyles.paragraph} w-full md:flex-1 px-4 py-2 border border-[#B9E5E8] rounded-md focus:outline-none focus:border-[#4A628A]`}
          >
            <option value="">Community Type</option>
            <option value="apartment">My Home</option>
            <option value="house">QTI Village</option>
            <option value="condo">QTI Town</option>
          </select>

          {/* Search Button */}
          <button
            type="submit"
            className={`${tailwindStyles.secondaryButton} w-full md:w-auto font-semibold rounded-md transition duration-300 hover:bg-[#035a8e]`}
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
