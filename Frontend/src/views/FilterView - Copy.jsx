/* eslint-disable no-unused-vars */
// src/components/FilterSection.jsx
import React, { useState, useEffect } from "react";
import tailwindStyles from "../utils/tailwindStyles";
import { FaFilter } from "react-icons/fa6";

const FilterSection = () => {
  const [isShow, setIsShow] = useState(false);

 // const [stateValue] = useState(["AP", "TG"]);
  const [cityValues] = useState([
    "Hyderabad",
    "Vijayawada",
    "Warangal",
    "Noida",
  ]);
  const [builderValues] = useState([
    "My Home",
    "Aparna",
    "Rajpushpa",
    "My Home Baja",
  ]);
  const [communities] = useState([
    "QTI Town",
    "QTI Apartments",
    "QTI Village",
    "None",
  ]);
  const [bedroomTypes] = useState([1, 2, 3, 4, 5]);
  const [propertySizeValues] = useState(["250", "500", "1000", "1250"]);
  const [typeOfTenant] = useState(["Bachelor", "Family", "Expats"]);
  const [parkingValues] = useState(["1 Vehicle Parking", "2 Vehicle Parking"]);
  const [furnishingValues] = useState([
    "Fully Furnished",
    "Semi Furnished",
    "Unfurnished",
  ]);

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [builder, setBuilder] = useState("");
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const [selectedBedroomTypes, setSelectedBedroomTypes] = useState([]);
  const [newPropertySize, setNewPropertySize] = useState("250 Sqft");
  const [newPricing, setNewPricing] = useState(10000);
  const [newBedroom, setNewBedroom] = useState(1);
  const [newBathroom, setNewBathroom] = useState(1);
  const [newTenantType, setNewTenantType] = useState("Bachelor");
  const [newParking, setNewParking] = useState("1 Vehicle Parking");
  const [newFurnishing, setNewFurnishing] = useState("Fully Furnished");

  const handleCommunityChange = (community) => {
    setSelectedCommunities((prev) =>
      prev.includes(community)
        ? prev.filter((item) => item !== community)
        : [...prev, community],
    );
  };

  const handleBedroomTypeChange = (bedroom) => {
    setSelectedBedroomTypes((prev) =>
      prev.includes(bedroom)
        ? prev.filter((item) => item !== bedroom)
        : [...prev, bedroom],
    );
  };

  const incrementBedroom = () => setNewBedroom((prev) => Math.min(prev + 1, 5));
  const decrementBedroom = () => setNewBedroom((prev) => Math.max(prev - 1, 1));
  const incrementBathroom = () =>
    setNewBathroom((prev) => Math.min(prev + 1, 5));
  const decrementBathroom = () =>
    setNewBathroom((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <button
        className={`block lg:hidden flex items-center`}
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        <FaFilter />
        <p className="m-0 pl-2">Filters</p>
      </button>
      <div
        className={`${tailwindStyles.card} hidden lg:block lg:w-1/4 p-4 rounded shadow-sm h-3/4 fixed top-26 left-0`}
      >
        {" "}
        {/*h-screen fixed top-26 left-0 z-10*/}
        <h2 className="text-lg font-semibold mb-4">Filter</h2>
        <form
          style={{ maxHeight: "calc(100% - 50px)" }}
          className="space-y-4 overflow-y-auto"
        >
          {" "}
          {/*style={{ maxHeight: "calc(100% - 150px)" }}*/}
          {/* State Filter */}
          {/* <div>
            <label className="block font-medium mb-2">State</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State</option>
              {stateValue.map((each) => (
                <option value={each}>{each}</option>
              ))}
            </select>
          </div> */}
          {/* City Filter */}
          {/* <div>
            <label className="block font-medium mb-2">City</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select city</option>
              {cityValues.map((each) => (
                <option value={each}>{each}</option>
              ))}
            </select>
          </div> */}
          {/* Builder Filter */}
          <div>
            <label className="block font-medium mb-2">Builder</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={builder}
              onChange={(e) => setBuilder(e.target.value)}
            >
              <option value="">Select Builder</option>
              {builderValues.map((each) => (
                <option value={each}>{each}</option>
              ))}
            </select>
          </div>
          {/* Community Filter */}
          <div>
            <label className="block font-medium mb-2">Community</label>
            <div className="flex flex-wrap gap-2">
              {communities.map((community, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={community}
                    checked={selectedCommunities.includes(community)}
                    onChange={() => handleCommunityChange(community)}
                  />
                  {community}
                </label>
              ))}
            </div>
          </div>
          {/* Bedroom Types Filter */}
          <div>
            <label className="block font-medium mb-2">Bedroom Types</label>
            <div className="flex flex-wrap gap-2">
              {bedroomTypes.map((bedroom, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={bedroom}
                    checked={selectedBedroomTypes.includes(bedroom)}
                    onChange={() => handleBedroomTypeChange(bedroom)}
                  />
                  {bedroom} BHK
                </label>
              ))}
            </div>
          </div>
          {/* Property Size Filter */}
          {/* <div>
            <label className="block font-medium mb-2">Property Size</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={newPropertySize}
              onChange={(e) => setNewPropertySize(e.target.value)}
            >
              {propertySizeValues.map((size, index) => (
                <option key={index} value={size}>
                  {size} sqft
                </option>
              ))}
            </select>
          </div> */}
          {/* Pricing Filter */}
          {/* <div>
            <label className="block font-medium mb-2">Pricing (in INR)</label>
            <input
              type="range"
              className="w-full"
              min="1000"
              max="100000"
              step="5000"
              value={newPricing}
              onChange={(e) => setNewPricing(e.target.value)}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>₹{newPricing}</span>
              <span>Max: ₹1,00,000</span>
            </div>
          </div> */}
          {/* Bedrooms Filter */}
          {/* <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium text-gray-700 mr-2">
              Bedrooms
            </label>
            <button
              type="button"
              className="px-2 py-1 border rounded-md shadow-sm text-gray-600 hover:bg-gray-100"
              onClick={decrementBedroom}
            >
              -
            </button>
            <span className="mx-4 text-gray-700">{newBedroom}</span>
            <button
              type="button"
              className="px-2 py-1 border rounded-md shadow-sm text-gray-600 hover:bg-gray-100"
              onClick={incrementBedroom}
            >
              +
            </button>
          </div> */}
          {/* Bathrooms Filter */}
          {/* <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium text-gray-700 mr-2">
              Bathrooms
            </label>
            <button
              type="button"
              className="px-2 py-1 border rounded-md shadow-sm text-gray-600 hover:bg-gray-100"
              onClick={decrementBathroom}
            >
              -
            </button>
            <span className="mx-4 text-gray-700">{newBathroom}</span>
            <button
              type="button"
              className="px-2 py-1 border rounded-md shadow-sm text-gray-600 hover:bg-gray-100"
              onClick={incrementBathroom}
            >
              +
            </button>
          </div> */}
          {/* Tenant Type Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Tenant
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={newTenantType}
              onChange={(e) => setNewTenantType(e.target.value)}
            >
              {typeOfTenant.map((tenant, index) => (
                <option key={index} value={tenant}>
                  {tenant}
                </option>
              ))}
            </select>
          </div>
          {/* Parking Filter */}
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parking
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={newParking}
              onChange={(e) => setNewParking(e.target.value)}
            >
              {parkingValues.map((parking, index) => (
                <option key={index} value={parking}>
                  {parking}
                </option>
              ))}
            </select>
          </div> */}
          {/* Furnishing Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Furnishing
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={newFurnishing}
              onChange={(e) => setNewFurnishing(e.target.value)}
            >
              {furnishingValues.map((furnish, index) => (
                <option key={index} value={furnish}>
                  {furnish}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className={`${tailwindStyles.secondaryButton} py-2 px-4 rounded w-full mt-4`}
          >
            Apply
          </button>
        </form>
      </div>
      {/* For Mobile............. */}
      {isShow && (
        <div
          div
          className={`${tailwindStyles.card} lg:hidden lg:w-1/4 p-4 h-3/4 rounded shadow-sm`}
        >
          <h2 className="text-lg font-semibold mb-4">Filter</h2>
          <form className="space-y-4 overflow-y-auto">
            {" "}
            {/*style={{ maxHeight: "calc(100% - 150px)" }}*/}
            {/* City Filter */}
            <div>
              <label className="block font-medium mb-2">City</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Select city</option>
                {cityValues.map((each) => (
                  <option value={each}>{each}</option>
                ))}
              </select>
            </div>
            {/* Builder Filter */}
            <div>
              <label className="block font-medium mb-2">Builder</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={builder}
                onChange={(e) => setBuilder(e.target.value)}
              >
                <option value="">Select Builder</option>
                {builderValues.map((each) => (
                  <option value={each}>{each}</option>
                ))}
              </select>
            </div>
            {/* Community Filter */}
            <div>
              <label className="block font-medium mb-2">Community</label>
              <div className="flex flex-wrap gap-2">
                {communities.map((community, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      value={community}
                      checked={selectedCommunities.includes(community)}
                      onChange={() => handleCommunityChange(community)}
                    />
                    {community}
                  </label>
                ))}
              </div>
            </div>
            {/* Bedroom Types Filter */}
            <div>
              <label className="block font-medium mb-2">Bedroom Types</label>
              <div className="flex flex-wrap gap-2">
                {bedroomTypes.map((bedroom, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      value={bedroom}
                      checked={selectedBedroomTypes.includes(bedroom)}
                      onChange={() => handleBedroomTypeChange(bedroom)}
                    />
                    {bedroom} BHK
                  </label>
                ))}
              </div>
            </div>
            {/* Property Size Filter */}
            <div>
              <label className="block font-medium mb-2">Property Size</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={newPropertySize}
                onChange={(e) => setNewPropertySize(e.target.value)}
              >
                {propertySizeValues.map((size, index) => (
                  <option key={index} value={size}>
                    {size} sqft
                  </option>
                ))}
              </select>
            </div>
            {/* Pricing Filter */}
            <div>
              <label className="block font-medium mb-2">Pricing (in INR)</label>
              <input
                type="range"
                className="w-full"
                min="1000"
                max="100000"
                step="5000"
                value={newPricing}
                onChange={(e) => setNewPricing(e.target.value)}
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>₹{newPricing}</span>
                <span>Max: ₹1,00,000</span>
              </div>
            </div>
            {/* Bedrooms Filter */}
            <div className="mb-4 flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-2">
                Bedrooms
              </label>
              <button
                type="button"
                className="px-2 py-1 border rounded-md shadow-sm text-gray-600 hover:bg-gray-100"
                onClick={decrementBedroom}
              >
                -
              </button>
              <span className="mx-4 text-gray-700">{newBedroom}</span>
              <button
                type="button"
                className="px-2 py-1 border rounded-md shadow-sm text-gray-600 hover:bg-gray-100"
                onClick={incrementBedroom}
              >
                +
              </button>
            </div>
            {/* Bathrooms Filter */}
            <div className="mb-4 flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-2">
                Bathrooms
              </label>
              <button
                type="button"
                className="px-2 py-1 border rounded-md shadow-sm text-gray-600 hover:bg-gray-100"
                onClick={decrementBathroom}
              >
                -
              </button>
              <span className="mx-4 text-gray-700">{newBathroom}</span>
              <button
                type="button"
                className="px-2 py-1 border rounded-md shadow-sm text-gray-600 hover:bg-gray-100"
                onClick={incrementBathroom}
              >
                +
              </button>
            </div>
            {/* Tenant Type Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type of Tenant
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={newTenantType}
                onChange={(e) => setNewTenantType(e.target.value)}
              >
                {typeOfTenant.map((tenant, index) => (
                  <option key={index} value={tenant}>
                    {tenant}
                  </option>
                ))}
              </select>
            </div>
            {/* Parking Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parking
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={newParking}
                onChange={(e) => setNewParking(e.target.value)}
              >
                {parkingValues.map((parking, index) => (
                  <option key={index} value={parking}>
                    {parking}
                  </option>
                ))}
              </select>
            </div>
            {/* Furnishing Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Furnishing
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={newFurnishing}
                onChange={(e) => setNewFurnishing(e.target.value)}
              >
                {furnishingValues.map((furnish, index) => (
                  <option key={index} value={furnish}>
                    {furnish}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className={`${tailwindStyles.secondaryButton} py-2 px-4 rounded w-full mt-4`}
            >
              Apply
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FilterSection;
