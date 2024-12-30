// components/CarouselView.js

import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

const CarouselView = ({ currentImage, onNext, onPrevious, images, currentIndex }) => {
  return (
    <div className="carousel position-relative d-flex flex-column align-items-center">
      <div className="w-100 position-relative">
        <img
          src={currentImage.imageUrl}
          alt={currentImage.alt}
          className="img-fluid rounded shadow-lg"
          style={{ width: '100vw', height: '62vh', objectFit: 'cover', paddingTop: '20px' }}
        />
        <div>
            <h1 className='d-flex flex-row justify-content-center' style={{color: 'red', fontSize: '28px'}}>{currentImage.initialText}</h1>
            <p className='d-flex flex-row justify-content-center' style={{color: 'black', fontSize: '20px'}}>{currentImage.laterText}</p>
        </div>
        {/* Left Arrow */}
        <button
          onClick={onPrevious}
          className="position-absolute top-50 start-0 translate-middle-y btn btn-dark btn-sm"
          style={{ opacity: 0.7 }}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        
        {/* Right Arrow */}
        <button
          onClick={onNext}
          className="position-absolute top-50 end-0 translate-middle-y btn btn-dark btn-sm"
          style={{ opacity: 0.7 }}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Indicators */}
      <div className="d-flex justify-content-center mt-3">
        {images.map((image, index) => (
          <span
            key={image.id}
            className={`mx-1 rounded-circle ${currentIndex === index ? 'bg-primary' : 'bg-secondary'}`}
            style={{
              width: '10px',
              height: '10px',
              cursor: 'pointer',
              opacity: currentIndex === index ? 1 : 0.5
            }}
            onClick={() => onPrevious(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CarouselView;
