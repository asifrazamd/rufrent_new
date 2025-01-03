/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// SuccessView.js
import React from "react";
import PropertyListingCard from "./userLandingCardView";
import PaginationControls from "./PaginationControls";

const SuccessView = ({
  apiResponse,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  //console.log(apiResponse);
  return (
    <div className="lg:w-3/4 space-y-6 mb-20">
    
      {apiResponse.data.map((property) => (
        <PropertyListingCard
          key={property.id}
          propertyId={property.id}
          propDesc={property.prop_desc}
          homeType={property.home_type}
          propType={property.prop_type}
        />
      ))}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default SuccessView;
