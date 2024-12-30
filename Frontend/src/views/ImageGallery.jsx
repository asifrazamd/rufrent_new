import React, { useEffect, useState } from "react";


const ImageGallery = (props) => {
  const {allImages} = props
  const [mainImage, setMainImage] = useState(allImages[0]);

    const handleImageClick = (image) => {
        setMainImage(image);
    };
  // const { mainImage, images, handleImageClick } = useImageController();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically switch images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [allImages.length]);

  // Update main image when currentIndex changes
  useEffect(() => {
    if (allImages.length > 0) {
      handleImageClick(allImages[currentIndex]);
    }
  }, [currentIndex, allImages, handleImageClick]);

  // Navigate to the previous image
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };

  // Navigate to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  return (
    <div className="mt-6">
  {/* Main Image with Fixed Dimensions */}
  <div className="flex justify-center mb-4">
    <img
      src={mainImage}
      // alt={mainImage.alt}
      className="w-full h-64 md:h-96 md:w-2/3 lg:w-1/2 rounded shadow-lg object-cover transition-opacity duration-500 ease-in-out"
    />
  </div>

  {/* Thumbnails with Arrows */}
  <div className="flex justify-center items-center space-x-4">
    {/* Previous Button */}
    <button
      onClick={handlePrevious}
      className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full focus:outline-none shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    {/* Thumbnails */}
    <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
      {allImages.map((image, index) => (
        <img
          key={index}
          src={image}
          // alt={image.alt}
          className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded cursor-pointer transition-all duration-300 ease-in-out ${
            currentIndex === index ? "border-2 border-blue-500 scale-110" : ""
          }`}
          onClick={() => setCurrentIndex(index)}
        />
      ))}
    </div>

    {/* Next Button */}
    <button
      onClick={handleNext}
      className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full focus:outline-none shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>
  );
};

export default ImageGallery;
