import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { addNewRecord,getRecords } from "../config/apiRoute";
import tailwindStyles from "../utils/tailwindStyles";
import SearchableDropdown from "./SearchDropdownView";

const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="mt-2 px-6">
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-lg top-1/2 transform -translate-y-1/2 z-0"></div>

        {/* Steps */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index + 1 <= currentStep;
          const isCompleted = index + 1 < currentStep;

          return (
            <div key={index} className="relative">
              {/* Connector line */}
              {index > 0 && (
                <div
                  className={`absolute top-1/2 -left-1/2 transform -translate-y-1/2 w-full h-2 ${"bg-gray-200"} z-0`}
                ></div>
              )}

              {/* Step Circle */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isActive
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                } z-10 shadow-md relative`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Reusable API fetch function
const fetchData = async (endpoint, fields, params = {}, onSuccess, onError, setLoading) => {
  setLoading(true);
  try {
    const response = await getRecords(endpoint, fields, params);
    onSuccess(response || []);
  } catch (error) {
    onError(`Failed to fetch ${endpoint}. Please try again later.`);
    console.error(`Error fetching ${endpoint}:`, error);
  } finally {
    setLoading(false);
  }
};

const MyComponent = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps=3;    
  // State for dropdowns and loading/error states
  const [dropdowns, setDropdowns] = useState({
    stateList: [],
    cityList: [],
    builderList: [],
    communityList: [],
    propType: [],
    homeType: [],
    bathrooms: [],
    balcony: [],
    parkingCount: [],
    propDesc: [],
    rentalRange: [],
    tenant: [],
    tenantEat: [],
  });

  const [loading, setLoading] = useState({
    state: false,
    city: false,
    builder: false,
    community: false,
    propType: false,
    homeType: false,
    bathrooms: false,
    balcony: false,
    parkingCount: false,
    propDesc: false,
    rentalRange: false,
    tenant: false,
    tenantEat: false,

  });

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    state: "",
    city: "",
    builder: "",
    community_id: "",
    prop_type_id: "",
    home_type_id: "",
    prop_desc_id: "",
    no_beds: "",
    no_baths: "",
    no_balconies: "",
    tenant_type_id: "",
    tenant_eat_pref_id: "",
    parking_count_id: "",
    tower_no: "",
    floor_no: "",
    flat_no: "",
    rental_low: "",
  });
  const [panels, setPanels] = useState([
      [
        {
          label: "State",
          name: "state",
          type: "dropdown",
          options: stateList,
        },
        {
          label: "City",
          name: "city",
          type: "dropdown",
          options: cityList,
        },
        {
          label: "Builder",
          name: "builder",
          type: "dropdown",
          options: builderList,
        },
        {
          label: "Community",
          name: "community_id",
          type: "dropdown",
          options: communityList,
        },
        {
          label: "Prop-type",
          name: "prop_type_id",
          type: "dropdown",
          options: propType,
        },
        {
          label: "Home-Type",
          name: "home_type_id",
          type: "dropdown",
          options:homeType,
        },
      ],
      [
        {
          label: "Prop-Desc",
          name: "prop_desc_id",
          type: "dropdown",
          options: propDesc,
        },
        { label: "Tower#", name: "tower_no", type: "text" },
        { label: "Floor#", name: "floor_no", type: "number" },
        { label: "Flat#", name: "flat_no", type: "text" },
        { label: "Rental Price", name: "rental_low", type: "text" },
  
        {
          label: "Baths",
          name: "no_baths",
          type: "dropdown",
          options: bathrooms,
        },
       
      ],
      [
        {
          label: "Balconies",
          name: "no_balconies",
          type: "dropdown",
          options: balcony,
        },
        {
          label: "Parking",
          name: "parking_count_id",
          type: "dropdown",
          options: parkingCount,
        },
        {
          label: "Tenant-Type",
          name: "tenant_type_id",
          type: "dropdown",
          options: tenant,
        },
        {
          label: "Eat-Pref",
          name: "tenant_eat_pref_id",
          type: "dropdown",
          options: tenantEat,
        },
        { label: "Upload Images", name: "images", type: "file" }
      ],
    ]);

  // Fetch data with dependencies
  useEffect(() => {
    fetchData(
      "st_state",
      "id,name",
      {},
      (data) => setDropdowns((prev) => ({ ...prev, stateList: data })),
      (error) => setErrors((prev) => ({ ...prev, state: error })),
      (loading) => setLoading((prev) => ({ ...prev, state: loading }))
    );
  }, []);

  useEffect(() => {
    if (formData.state) {
      fetchData(
        "st_city",
        "id,name",
        { state_id: formData.state },
        (data) => setDropdowns((prev) => ({ ...prev, cityList: data })),
        (error) => setErrors((prev) => ({ ...prev, city: error })),
        (loading) => setLoading((prev) => ({ ...prev, city: loading }))
      );
    }
  }, [formData.state]);

  useEffect(() => {
    if (formData.city) {
      fetchData(
        "st_builder",
        "id,name",
        { city_id: formData.city },
        (data) => setDropdowns((prev) => ({ ...prev, builderList: data })),
        (error) => setErrors((prev) => ({ ...prev, builder: error })),
        (loading) => setLoading((prev) => ({ ...prev, builder: loading }))
      );
    }
  }, [formData.city]);

  useEffect(() => {
    if (formData.builder) {
      fetchData(
        "st_community",
        "id,name",
        { builder_id: formData.builder },
        (data) => setDropdowns((prev) => ({ ...prev, communityList: data })),
        (error) => setErrors((prev) => ({ ...prev, community: error })),
        (loading) => setLoading((prev) => ({ ...prev, community: loading }))
      );
    }
  }, [formData.builder]);

  // Fetch static dropdown data
  useEffect(() => {
    const staticDataEndpoints = [
      { key: "propType", endpoint: "st_prop_type", fields: "id,prop_type" },
      { key: "homeType", endpoint: "st_home_type", fields: "id,home_type" },
      { key: "bathrooms", endpoint: "st_baths", fields: "id,nbaths" },
      { key: "balcony", endpoint: "st_balcony", fields: "id,nbalcony" },
      { key: "parkingCount", endpoint: "st_parking_count", fields: "id,parking_count" },
      { key: "propDesc", endpoint: "st_prop_desc", fields: "id,prop_desc" },
      { key: "rentalRange", endpoint: "st_rental_range", fields: "id,lower_limit,higher_limit" },
      { key: "tenant", endpoint: "st_tenant", fields: "id,tenant_type" },
      { key: "tenantEat", endpoint: "st_tenant_eat_pref", fields: "id,eat_pref" },
    ];

    staticDataEndpoints.forEach(({ key, endpoint, fields }) => {
      fetchData(
        endpoint,
        fields,
        {},
        (data) => setDropdowns((prev) => ({ ...prev, [key]: data })),
        (error) => setErrors((prev) => ({ ...prev, [key]: error })),
        (loading) => setLoading((prev) => ({ ...prev, [key]: loading }))
      );
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, type, files } = e.target;
  
    if (type === "file") {
      const fileList = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileList],
      }));
      const previews = fileList.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    } else {
      const { value } = e.target;
  
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "state" && { city: "", builder: "", community: "", prop_type: "" }),
        ...(name === "city" && { builder: "", community: "", prop_type: "" }),
        ...(name === "builder" && { community: "", prop_type: "" }),
      }));
  
      // Check if prop_type has changed and update the panels
      if (name === "prop_type") {
        setPanels((prevPanels) => {
          const updatedPanels = [...prevPanels];
           console.log("panels",value)
          // Clear out the second panel first
          updatedPanels[1] = [];
  
          // Add new fields based on the selected prop_type
          if (value === 3) {
            updatedPanels[1] = [
              { label: "Unit#", name: "tower_no", type: "text" },
              { label: "Rental Price", name: "rental_low", type: "text" },
              {
                label: "Prop-Desc",
                 name: "prop_desc_id",
                    type: "dropdown",
                     options: propDesc,
                  },
              { label: "Baths", name: "no_baths", type: "dropdown", options: bathrooms },
            ];
              // { label: "Rental Price", name: "rentalPrice", type: "text" },
              // { label: "Baths", name: "bathrooms", type: "dropdown", options: bathrooms },
            
          } else if (value === 1) {
            updatedPanels[1] = [
             
              { label: "Tower#", name: "tower_no", type: "text" },
              { label: "Floor#", name: "floor_no", type: "number" },
              { label: "Flat#", name: "flat_no", type: "text" },
              { label: "Rental Price", name: "rental_low", type: "text" },
              {
                label: "Prop-Desc",
                 name: "prop_desc_id",
                    type: "dropdown",
                     options: propDesc,
                  },
              { label: "Baths", name: "no_baths", type: "dropdown", options: bathrooms },
            ];
            [
              // { label: "Rental Price", name: "rentalPrice", type: "text" },
              {
                label: "Balconies",
                name: "no_balconies",
                type: "dropdown",
                options: balcony,
              },
              {
                label: "Parking",
                name: "parking_count_id",
                type: "dropdown",
                options: parkingCount,
              },
              {
                label: "Tenant-Type",
                name: "tenant_type_id",
                type: "dropdown",
                options: tenant,
              },
              {
                label: "Eat-Pref",
                name: "tenant_eat_pref_id",
                type: "dropdown",
                options: tenantEat,
              },
              { label: "Upload Images", name: "images", type: "file" }
            ]
          }
           setPanels(updatedPanels)
          return updatedPanels;
        });
      }
    }
  
    // Clear error for the specific field
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  
  
  
    
    
    
  
    const handleRemoveImage = (index) => {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };
  
    const openImageModal = (image) => {
      setModalImage(image);
    };
  
    const closeImageModal = () => {
      setModalImage(null);
    };
  
    const validatePanel = (panelFields) => {
      const panelErrors = {};
      panelFields.forEach((field) => {
        const value = formData[field.name];
        if (field.type === "dropdown" && !value) {
          panelErrors[field.name] =
            `Please select a valid ${field.label.toLowerCase()}.`;
        } else if ((field.type === "text" || field.type === "number") && !value) {
          panelErrors[field.name] = `${field.label} must be a number.`;
        }
      });
      return panelErrors;
    };
  
  
    const handleNext = () => {
      const panelFields = panels[currentStep - 1];
      const panelErrors = validatePanel(panelFields);
  
      if (Object.keys(panelErrors).length > 0) {
        setErrors(panelErrors);
        return;
      }
      setCurrentStep((prev) => prev + 1);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const tableName = "dy_property";
      const fieldNames = [
        "user_id",
        "prop_type_id",
        "home_type_id",
        "prop_desc_id",
        "community_id",
        "no_baths",
        "no_balconies",
        "tenant_type_id",
        "tenant_eat_pref_id",
        "rental_low",
        "rental_high",
        "parking_count_id",
        "tower_no",
        "floor_no",
        "flat_no",
      ].join(",");
    
      const fieldValues = [
        1, // Example user_id
        formData.prop_type_id || null,
        formData.home_type_id || null,
        formData.prop_desc_id || null,
        formData.community_id || null,
        formData.no_baths || null,
        formData.no_balconies || null,
        formData.tenant_type_id || null,
        formData.tenant_eat_pref_id || null,
        formData.rental_low || null,
        formData.rental_high || null,
        formData.parking_count_id || null,
        parseInt(formData.tower_no) || null,
        parseInt(formData.floor_no) || null,
        parseInt(formData.flat_no) || null,
      ];
    
      // Format fieldValues for SQL
      const formattedFieldValues = fieldValues
        .map((value) => (value === null || value === undefined ? "NULL" : `'${value}'`))
        .join(",");
    
      try {
        console.log("Submitting data:", { tableName, fieldNames, formattedFieldValues });
    
        const response = await addNewRecord(tableName, fieldNames, formattedFieldValues);
        if (response.message === "Record added successfully") {
          alert("Property posted successfully!");
        } else {
          alert(`Failed to post property: ${response.message}`);
        }
      } catch (error) {
        console.error("Error posting property:", error);
        alert("An error occurred while posting the property.");
      }
    };
    
  
  
    
    
    
    
  
    const renderInputs = (inputs) =>
      inputs.map((input, idx) => (
        <>
          <div key={idx} className="col-span-1">
            <label className="block text-black-700 mb-2">{input.label}</label>
            {input.type === "dropdown" ? (
              <div>
                {input.name === "state" ? (
                  <SearchableDropdown
                    name={input.name}
                    options={stateList}
                    value={formData[input.name]}
                    onChange={handleInputChange}
                    placeholder={`Search ${input.label}`}
                    isLoading={isLoadingState}
                    disabled={isLoadingState}
                    error={stateError}
                    displayKey="name"
                    valueKey="id"
                  />
                ) : input.name === "city" ? (
                  <SearchableDropdown
                    name={input.name}
                    options={cityList}
                    value={formData[input.name]}
                    onChange={handleInputChange}
                    placeholder={`Search ${input.label}`}
                    isLoading={isLoadingCity}
                    disabled={isLoadingCity || !formData.state}
                    error={cityError}
                    helperText={
                      !formData.state ? "Please select a state first" : ""
                    }
                    displayKey="name"
                    valueKey="id"
                  />
                ) : input.name === "builder" ? (
                  <SearchableDropdown
                    name={input.name}
                    options={builderList}
                    value={formData[input.name]}
                    onChange={handleInputChange}
                    placeholder={`Search ${input.label}`}
                    isLoading={isLoadingBuilder}
                    disabled={isLoadingBuilder || !formData.city}
                    error={builderError}
                    helperText={
                      !formData.city ? "Please select a city first" : ""
                    }
                    displayKey="name"
                    valueKey="id"
                  />
                ) : input.name === "community_id" ? (
                  <SearchableDropdown
                    name={input.name}
                    options={communityList}
                    value={formData[input.name]}
                    onChange={handleInputChange}
                    placeholder={`Search ${input.label}`}
                    isLoading={isLoadingCommunity}
                    disabled={isLoadingCommunity || !formData.builder}
                    error={communityError}
                   
                    helperText={
                      !formData.builder ? "Please select a builder first" : ""
                    }
                    displayKey="name"
                    valueKey="id"
                  />
                ) : input.name === "prop_type_id" ? (
                  <SearchableDropdown
                   name={input.name}
                   //options={Array.isArray(propType) ? propType : []}
                   options={propType}
                   value={formData[input.name]}
                   onChange={handleInputChange}
                                placeholder="Select Property Type"
                 displayKey="prop_type"
                 valueKey="id"
  />          
                ):input.name === "home_type_id" ?(
                <SearchableDropdown
                name={input.name}
                options={Array.isArray(homeType) ? homeType : []} // Ensure this is the correct array, like homeType
                value={formData[input.name]} // This should correctly reflect the selected value from formData
                onChange={handleInputChange}
                placeholder={`Select ${input.label}`}
                displayKey="home_type"    // This should match the field inside each option (home_type)
                valueKey="id"             // The unique key for each option
              />
  
                ) : input.name === "no_balconies" ?(
                  <SearchableDropdown
                  name={input.name}
                  options={Array.isArray(balcony) ? balcony : []} // Ensure this is the correct array, like homeType
                  value={formData[input.name]} // This should correctly reflect the selected value from formData
                  onChange={handleInputChange}
                  placeholder={`Select ${input.label}`}
                  displayKey="nbalcony"    // This should match the field inside each option (home_type)
                  valueKey="id"             // The unique key for each option
                />
    
                  ): input.name === "parking_count_id" ?(
                    <SearchableDropdown
                    name={input.name}
                    options={Array.isArray(parkingCount) ? parkingCount : []} // Ensure this is the correct array, like homeType
                    value={formData[input.name]} // This should correctly reflect the selected value from formData
                    onChange={handleInputChange}
                    placeholder={`Select ${input.label}`}
                    displayKey="parking_count"    // This should match the field inside each option (home_type)
                    valueKey="id"             // The unique key for each option
                  />
      
                    ): input.name === "tenant_type_id" ?(
                      <SearchableDropdown
                      name={input.name}
                      options={Array.isArray(tenant) ? tenant : []} // Ensure this is the correct array, like homeType
                      value={formData[input.name]} // This should correctly reflect the selected value from formData
                      onChange={handleInputChange}
                      placeholder={`Select ${input.label}`}
                      displayKey="tenant_type"    // This should match the field inside each option (home_type)
                      valueKey="id"             // The unique key for each option
                    />
        
                      ): input.name === "tenant_eat_pref_id" ?(
                        <SearchableDropdown
                        name={input.name}
                        options={Array.isArray(tenantEat) ?  tenantEat: []} // Ensure this is the correct array, like homeType
                        value={formData[input.name]} // This should correctly reflect the selected value from formData
                        onChange={handleInputChange}
                        placeholder={`Select ${input.label}`}
                        displayKey="eat_pref"    // This should match the field inside each option (home_type)
                        valueKey="id"             // The unique key for each option
                      />
          
                        ):input.name === "prop_desc_id" ?(
                          <SearchableDropdown
                          name={input.name}
                          options={propDesc} // Ensure this is the correct array, like homeType
                          value={formData[input.name]} // This should correctly reflect the selected value from formData
                          onChange={handleInputChange}
                          placeholder={`Select ${input.label}`}
                          displayKey="prop_desc"    // This should match the field inside each option (home_type)
                          valueKey="id"             // The unique key for each option
                        />
            
                          ):input.name === "parking_count_id" ?(
                            <SearchableDropdown
                            name={input.name}
                            options={parkingCount} // Ensure this is the correct array, like homeType
                            value={formData[input.name]} // This should correctly reflect the selected value from formData
                            onChange={handleInputChange}
                            placeholder={`Select ${input.label}`}
                            displayKey="parking_count"    // This should match the field inside each option (home_type)
                            valueKey="id"             // The unique key for each option
                          />
              
                            ):input.name === "no_baths" &&(
                            <SearchableDropdown
                            name={input.name}
                            options={bathrooms} // Ensure this is the correct array, like homeType
                            value={formData[input.name]} // This should correctly reflect the selected value from formData
                            onChange={handleInputChange}
                            placeholder={`Select ${input.label}`}
                            displayKey="nbaths"    // This should match the field inside each option (home_type)
                            valueKey="id"             // The unique key for each option
                          />
              
                            )
                          }
                          
              </div>
            ) : input.type === "file" ? (
              <>
                <input
                  type="file"
                  onChange={handleInputChange}
                  value={""}
                  multiple
                  accept="image/*"
                  className="w-full p-2 border rounded-md"
                />
                {imagePreviews.length > 0 && (
                  <div className="w-full mx-auto px-4">
                    <p>{formData.images.length} Files Choosen</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative group cursor-pointer"
                          onClick={() => openImageModal(preview)}
                        >
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md border"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleRemoveImage(index);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <input
                type={input.type}
                name={input.name}
                value={formData[input.name]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            )}
            {errors[input.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[input.name]}</p>
            )}
          </div>
        </>
      ));
  
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-center text-2xl font-semibold mb-2">
            Add Property
          </h2>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <div className="bg-white shadow-lg p-6 rounded-lg mt-2">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                {renderInputs(panels[currentStep - 1])}
              </div>
  
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className={`${tailwindStyles.thirdButton} px-6 py-2 rounded-md`}
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className={`${tailwindStyles.secondaryButton} px-6 py-2 rounded-md`}
                  onClick={currentStep === totalSteps ? handleSubmit : handleNext}
                >
                  {currentStep === totalSteps ? "Submit" : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
        {modalImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg relative w-3/4 h-3/4 flex items-center justify-center">
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                &times;
              </button>
              <img
                src={modalImage}
                alt="Modal View"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </>
    );
};

export default MyComponent;
