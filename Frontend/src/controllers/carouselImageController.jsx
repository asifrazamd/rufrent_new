// controllers/CarouselController.js

import React, { useState } from 'react';
import CarouselModel from '../models/carouselImageModel'
import CarouselView from '../views/CarouselImageView';


const CarouselController = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === CarouselModel.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? CarouselModel.length - 1 : prevIndex - 1
    );
  };

  return (
    <CarouselView
      currentImage={CarouselModel[currentIndex]}
      onNext={handleNext}
      onPrevious={handlePrevious}
      images={CarouselModel}
      currentIndex={currentIndex}
    />
  );
};

export default CarouselController;
