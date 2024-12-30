import React, { useState } from 'react';
import tailwindStyles from '../utils/tailwindStyles';

const MyListingCardView = ({ property }) => {
  // Set initial main image
  const [mainImage, setMainImage] = useState(property.images[0]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className={`${tailwindStyles.whiteCard} shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row md:space-x-6 p-4 md:p-6 w-full max-w-4xl mx-auto mb-6`}>
      {/* Left Side: Images */}
      <div className={`flex flex-col md:w-1/2 space-y-4`}>
        {/* Main Image */}
        <div className="w-full h-50 md:h-80 overflow-hidden rounded-lg">
          <img
            src={mainImage}
            alt="Property Main"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Thumbnail Images */}
        <div className="flex space-x-2">
          {property.images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(image)}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden ${
                mainImage === image ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-50 "
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: Property Details */}
      <div className="flex flex-col md:w-1/2 space-y-4">
        <h2 className={`${tailwindStyles.heading} text-xl font-semibold `}>{property.title}</h2>
        <p className={`${tailwindStyles.paragraph}`}>{property.description}</p>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Location:</span> {property.location}</p>
          <p><span className="font-medium">Price:</span> ${property.price}</p>
          <p><span className="font-medium">Bedrooms:</span> {property.bedrooms}</p>
          <p><span className="font-medium">Bathrooms:</span> {property.bathrooms}</p>
          <p><span className="font-medium">Square Feet:</span> {property.sqft} sqft</p>
        </div>
        
      {/* Status Badge */}
      <div className='flex items-center justify-between'>
      <div
        className={`flex items-center justify-center w-1/3 h-10 rounded-md text-white font-semibold bg-green-500`}
      >
        {property.status}
  
      </div>
        {/* Edit Button */}
        <div >
          <button className={`${tailwindStyles.secondaryButton} font-semibold rounded-md transition duration-200`}>
            Edit
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MyListingCardView;
