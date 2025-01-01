import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { addNewRecord, getRecords } from "../config/apiRoute";
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

const PostPropertiesView = () => {
  // State for dropdown options
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [builderList, setBuilderList] = useState([]);
  const [communityList, setCommunityList] = useState([]);
  //const [propertyType, setPropertyType] = useState([]);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isLoadingBuilder, setIsLoadingBuilder] = useState(false);
  const [isLoadingCommunity, setIsLoadingCommunity] = useState(false);
  const [stateError, setStateError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [builderError, setBuilderError] = useState(null);
  const [communityError, setCommunityError] = useState(null);
  const [isLoadingPropType, setIsLoadingPropType] = useState(false);
  const [propTypeError, setPropTypeError] = useState(null);
  const [bedrooms, setBedrooms] = useState([]);
  const [bathrooms, setBathrooms] = useState([]);
  const [balcony, setBalcony] = useState([]);
  const [tenantType, setTenantType] = useState([]);
  const [foodPreference, setFoodPreference] = useState([]);
  const [parking, setParking] = useState([]);
  const [propertyDescription, setPropertyDescription] = useState([]);

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [imagePreviews, setImagePreviews] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [balconyError, setbalconyError] = useState(null);
  const [isLoadingBalcony, setIsLoadingBalcony] = useState(false);
  const [bathroomsError, setbathroomsError] = useState(null);
  const [isLoadingBathrooms, setIsLoadingBathrooms] = useState(false);
  const [bedroomsError, setbedroomsError] = useState(null);
  const [isLoadingBedrooms, setIsLoadingBedrooms] = useState(false);
  const [floorrange, setfloorrange] = useState([]);
  const [floorrangeError, setfloorrangeError] = useState(null);
  const [isLoadingFloorrange, setIsLoadingFloorrange] = useState(false);
  const [homeType, sethomeType] = useState([]);
  const [hometypeError, sethometypeError] = useState(null);
  const [isLoadingHometype, setIsLoadingHometype] = useState(false);
  const [parkingCount, setparkingCount] = useState([]);
  const [parkingcountError, setparkingcountError] = useState(null);
  const [isLoadingParkingcount, setIsLoadingParkingcount] = useState(false);
  const [propDesc, setpropDesc] = useState([]);
  const [propDescError, setpropDescError] = useState(null);
  const [isLoadingPropdesc, setIsLoadingPropdesc] = useState(false);
  const [propType, setPropType] = useState([]);

  const [isLoadingProptype, setIsLoadingProptype] = useState(false);
  const [rentalRange, setrentalRange] = useState([]);
  const [rentalRangeError, setrentalRangeError] = useState(null);
  const [isLoadingRentalRange, setIsLoadingRentalRange] = useState(false);
  const [tenant, settenant] = useState([]);
  const [tenantError, settenantError] = useState(null);
  const [isLoadingTenant, setIsLoadingTenant] = useState(false);
  const [tenantEat, settenantEat] = useState([]);
  const [tenantEatError, settenantEatError] = useState(null);
  const [isLoadingTenantEat, setIsLoadingTenantEat] = useState(false);
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
        name: "prop_type",
        type: "dropdown",
        options: propType,
      },
      {
        label: "Home-Type",
        name: "home_type",
        type: "dropdown",
        options: homeType,
      },
    ],
    [
      {
        label: "Prop-Desc",
        name: "prop_desc",
        type: "dropdown",
        options: propDesc,
      },
      { label: "Tower#", name: "towerNumber", type: "text" },
      { label: "Floor#", name: "floorNumber", type: "number" },
      { label: "Flat#", name: "flatNumber", type: "text" },
      { label: "Rental Price", name: "rentalPrice", type: "text" },

      {
        label: "Baths",
        name: "nbaths",
        type: "dropdown",
        options: bathrooms,
      },
    ],
    [
      {
        label: "Balconies",
        name: "nbalcony",
        type: "dropdown",
        options: balcony,
      },
      {
        label: "Parking",
        name: "parking_count",
        type: "dropdown",
        options: parkingCount,
      },
      {
        label: "Tenant-Type",
        name: "tenant_type",
        type: "dropdown",
        options: tenant,
      },
      {
        label: "Eat-Pref",
        name: "eat_pref",
        type: "dropdown",
        options: tenantEat,
      },
      { label: "Upload Images", name: "images", type: "file" },
    ],
  ]);
  console.log("hoine....", homeType);
  const [formData, setFormData] = useState({
    prop_type_id: "",
    home_type_id: "",
    prop_desc_id: "",
    community_id: "",
    no_beds: "",
    no_baths: "",
    no_balconies: "",
    tenant_type_id: "",
    tenant_eat_pref_id: "",

    parking_count_id: "",

    current_status: "",
    tower_no: "",
    floor_no: "",
    flat_no: "",
    rental_low: "",
  });
  console.log("form", formData);
  //console.log(stateList)
  // Fetch state list when component mounts
  useEffect(() => {
    const fetchStateList = async () => {
      setIsLoadingState(true);
      setStateError(null);
      try {
        // Fetching records from 'st_state' table with field names 'id,name'
        const response = await getRecords("st_state", "id,name");

        // Setting the state with the fetched data
        setStateList(response);
        //console.log("State list fetched:", response);
      } catch (err) {
        // Handling the error
        setStateError("Failed to fetch state list. Please try again later.");
        console.error("Error fetching state list:", err);
      } finally {
        // Stopping the loading state
        setIsLoadingState(false);
      }
    };

    fetchStateList();
  }, []); // Empty dependency array, so it runs once when the component mounts

  // Fetch city list when state changes
  useEffect(() => {
    const fetchCityList = async () => {
      setIsLoadingCity(true);
      setCityError(null);
      try {
        // Fetching city list with the state_id parameter
        const response = await getRecords("st_city", "id,name", {
          state_id: formData.state,
        });
        console.log(formData.state);
        setCityList(response);
        console.log("City list fetched:", response);
      } catch (err) {
        setCityError("Failed to fetch city list. Please try again later.");
        console.error("Error fetching city list:", err);
      } finally {
        setIsLoadingCity(false);
      }
    };

    if (formData.state) {
      fetchCityList();
    }
  }, [formData.state]);

  // Fetch builder list when city changes
  useEffect(() => {
    const fetchBuilderList = async () => {
      if (!formData.city) {
        setBuilderList([]);
        return;
      }

      setIsLoadingBuilder(true);
      setBuilderError(null);
      try {
        const response = await getRecords("st_builder", "id,name", {
          city_id: formData.city,
        });
        setBuilderList(response);
      } catch (err) {
        setBuilderError(
          "Failed to fetch builder list. Please try again later.",
        );
        console.error("Error fetching builder list:", err);
      } finally {
        setIsLoadingBuilder(false);
      }
    };
    fetchBuilderList();
  }, [formData.city]);

  // Fetch community list when builder changes
  useEffect(() => {
    const fetchCommunityList = async () => {
      if (!formData.builder) {
        setCommunityList([]);
        return;
      }

      setIsLoadingCommunity(true);
      setCommunityError(null);
      try {
        const response = await getRecords("st_community", "id,name", {
          builder_id: formData.builder,
        });
        setCommunityList(response);
      } catch (err) {
        setCommunityError(
          "Failed to fetch builder list. Please try again later.",
        );
        console.error("Error fetching builder list:", err);
      } finally {
        setIsLoadingCommunity(false);
      }
    };
    fetchCommunityList();
  }, [formData.builder]);

  // Fetch All Remaining Static Data
  useEffect(() => {
    const fetchPropertyTypeList = async () => {
      setIsLoadingPropType(true);
      setPropTypeError(null);
      try {
        const response = await getRecords("st_prop_type", "id,prop_type");
        const data = response || [];
        setPropType(Array.isArray(data) ? data : []);
        console.log("property", data);
      } catch (err) {
        setPropTypeError(
          "Failed to fetch property type list. Please try again later.",
        );
        console.error("Error fetching property type list:", err);
      } finally {
        setIsLoadingPropType(false);
      }
    };
    fetchPropertyTypeList();
  }, []);
  // balcony
  useEffect(() => {
    const fetchBalconyList = async () => {
      setIsLoadingBalcony(true);
      setbalconyError(null);
      try {
        const response = await getRecords("st_balcony", "id,nbalcony");
        setBalcony(response);
      } catch (err) {
        setbalconyError(
          "Failed to fetch balcony list. Please try again later.",
        );
        console.error("Error fetching balcony list:", err);
      } finally {
        setIsLoadingBalcony(false);
      }
    };
    fetchBalconyList();
  }, []);

  //bathsroom
  useEffect(() => {
    const fetchBathroomsList = async () => {
      setIsLoadingBathrooms(true);
      setbathroomsError(null);
      try {
        const response = await getRecords("st_baths", "id,nbaths");
        setBathrooms(response);
      } catch (err) {
        setbathroomsError(
          "Failed to fetch bathrooms list. Please try again later.",
        );
        console.error("Error fetching bathrooms list:", err);
      } finally {
        setIsLoadingBathrooms(false);
      }
    };
    fetchBathroomsList();
  }, []);
  //bedrooms
  useEffect(() => {
    const fetchBedroomsList = async () => {
      setIsLoadingBedrooms(true);
      setbedroomsError(null);
      try {
        const response = await getRecords("st_beds", "id,nbeds");
        setBedrooms(response);
        console.log("beds", response);
      } catch (err) {
        setbedroomsError(
          "Failed to fetch bedrooms list. Please try again later.",
        );
        console.error("Error fetching bedrooms list:", err);
      } finally {
        setIsLoadingBedrooms(false);
      }
    };
    fetchBedroomsList();
  }, []);
  //floor-range
  useEffect(() => {
    const fetchFloorRangeList = async () => {
      setIsLoadingFloorrange(true);
      setfloorrangeError(null);
      try {
        const response = await getRecords(
          "st_floor_range",
          "id,floor_lower_limit,floor_upper_limit",
        );
        setfloorrange(response);
        console.log("floor", response);
      } catch (err) {
        setfloorrangeError(
          "Failed to fetch floorrange list. Please try again later.",
        );
        console.error("Error fetching floorrange list:", err);
      } finally {
        setIsLoadingFloorrange(false);
      }
    };
    fetchFloorRangeList();
  }, []);

  // home_type
  useEffect(() => {
    const fetchHometypeList = async () => {
      setIsLoadingHometype(true);
      sethometypeError(null);
      try {
        const response = await getRecords("st_home_type", "id,home_type");
        sethomeType(response);

        console.log(response);
      } catch (err) {
        sethometypeError(
          "Failed to fetch hometype list. Please try again later.",
        );
        console.error("Error fetching hometype list:", err);
      } finally {
        setIsLoadingHometype(false);
      }
    };
    fetchHometypeList();
  }, []);
  //console.log("home",homeType)
  // parking-count
  useEffect(() => {
    const fetchParkingcountList = async () => {
      setIsLoadingParkingcount(true);
      setparkingcountError(null);
      try {
        const response = await getRecords(
          "st_parking_count",
          "id,parking_count",
        );
        setparkingCount(response);
      } catch (err) {
        setparkingcountError(
          "Failed to fetch parkingcount list. Please try again later.",
        );
        console.error("Error fetching parkingcount list:", err);
      } finally {
        setIsLoadingParkingcount(false);
      }
    };
    fetchParkingcountList();
  }, []);
  // prop-desc
  useEffect(() => {
    const fetchPropdescList = async () => {
      setIsLoadingPropdesc(true);
      setpropDescError(null);
      try {
        const response = await getRecords("st_prop_desc", "id,prop_desc");
        setpropDesc(response);
      } catch (err) {
        setpropDescError(
          "Failed to fetch propdesc list. Please try again later.",
        );
        console.error("Error fetching propdesc list:", err);
      } finally {
        setIsLoadingPropdesc(false);
      }
    };
    fetchPropdescList();
  }, []);

  // rental-range
  useEffect(() => {
    const fetchRentalRangeList = async () => {
      setIsLoadingRentalRange(true);
      setrentalRangeError(null);
      try {
        const response = await getRecords(
          "st_rental_range",
          "id,lower_limit,higher_limit",
        );
        setrentalRange(response);
      } catch (err) {
        setrentalRangeError(
          "Failed to fetch rentalrange list. Please try again later.",
        );
        console.error("Error fetching rentalrange list:", err);
      } finally {
        setIsLoadingRentalRange(false);
      }
    };
    fetchRentalRangeList();
  }, []);
  // tenant
  useEffect(() => {
    const fetchTenantList = async () => {
      setIsLoadingTenant(true);
      settenantError(null);
      try {
        const response = await getRecords("st_tenant", "id,tenant_type");
        settenant(response);
      } catch (err) {
        settenantError("Failed to fetch tenant list. Please try again later.");
        console.error("Error fetching tenant list:", err);
      } finally {
        setIsLoadingTenant(false);
      }
    };
    fetchTenantList();
  }, []);
  // tenant-eat-pref
  useEffect(() => {
    const fetchTenantEatList = async () => {
      setIsLoadingTenantEat(true);
      settenantEatError(null);
      try {
        const response = await getRecords("st_tenant_eat_pref", "id,eat_pref");
        settenantEat(response);
      } catch (err) {
        settenantEatError(
          "Failed to fetch tenanteat list. Please try again later.",
        );
        console.error("Error fetching tenanteat list:", err);
      } finally {
        setIsLoadingTenantEat(false);
      }
    };
    fetchTenantEatList();
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
        ...(name === "state" && {
          city: "",
          builder: "",
          community: "",
          prop_type: "",
        }),
        ...(name === "city" && { builder: "", community: "", prop_type: "" }),
        ...(name === "builder" && { community: "", prop_type: "" }),
      }));

      // Check if prop_type has changed and update the panels
      if (name === "prop_type") {
        setPanels((prevPanels) => {
          const updatedPanels = [...prevPanels];
          console.log("panels", value);
          // Clear out the second panel first
          updatedPanels[1] = [];

          // Add new fields based on the selected prop_type
          if (value === 3) {
            updatedPanels[1] = [
              { label: "Unit#", name: "unitNumber", type: "text" },
              { label: "Rental Price", name: "rentalPrice", type: "text" },
              {
                label: "Prop-Desc",
                name: "prop_desc",
                type: "dropdown",
                options: propDesc,
              },
              {
                label: "Baths",
                name: "nbaths",
                type: "dropdown",
                options: bathrooms,
              },
            ];
            // { label: "Rental Price", name: "rentalPrice", type: "text" },
            // { label: "Baths", name: "bathrooms", type: "dropdown", options: bathrooms },
          } else if (value === 1) {
            updatedPanels[1] = [
              { label: "Tower#", name: "towerNumber", type: "text" },
              { label: "Floor#", name: "floorNumber", type: "number" },
              { label: "Flat#", name: "flatNumber", type: "text" },
              { label: "Rental Price", name: "rentalPrice", type: "text" },
              {
                label: "Prop-Desc",
                name: "prop_desc",
                type: "dropdown",
                options: propDesc,
              },
              {
                label: "Baths",
                name: "nbaths",
                type: "dropdown",
                options: bathrooms,
              },
            ];
            [
              // { label: "Rental Price", name: "rentalPrice", type: "text" },
              {
                label: "Balconies",
                name: "nbalcony",
                type: "dropdown",
                options: balcony,
              },
              {
                label: "Parking",
                name: "parking_count",
                type: "dropdown",
                options: parkingCount,
              },
              {
                label: "Tenant-Type",
                name: "tenant_type",
                type: "dropdown",
                options: tenant,
              },
              {
                label: "Eat-Pref",
                name: "eat_pref",
                type: "dropdown",
                options: tenantEat,
              },
              { label: "Upload Images", name: "images", type: "file" },
            ];
          }
          setPanels(updatedPanels);
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
      .map((value) =>
        value === null || value === undefined ? "NULL" : `'${value}'`,
      )
      .join(",");

    try {
      console.log("Submitting data:", {
        tableName,
        fieldNames,
        formattedFieldValues,
      });

      const response = await addNewRecord(
        tableName,
        fieldNames,
        formattedFieldValues,
      );
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
              ) : input.name === "prop_type" ? (
                <SearchableDropdown
                  name={input.name}
                  options={Array.isArray(propType) ? propType : []}
                  value={formData[input.name]}
                  onChange={(selected) =>
                    handleInputChange({
                      target: {
                        name: prop_type_id,
                        value: selected?.id || null,
                      },
                    })
                  }
                  placeholder="Select Property Type"
                  displayKey="prop_type"
                  valueKey="id"
                />
              ) : input.name === "home_type" ? (
                <SearchableDropdown
                  name={input.name}
                  options={Array.isArray(homeType) ? homeType : []} // Ensure this is the correct array, like homeType
                  value={formData[input.name]} // This should correctly reflect the selected value from formData
                  onChange={handleInputChange}
                  placeholder={`Select ${input.label}`}
                  displayKey="home_type" // This should match the field inside each option (home_type)
                  valueKey="id" // The unique key for each option
                />
              ) : input.name === "nbalcony" ? (
                <SearchableDropdown
                  name={input.name}
                  options={Array.isArray(balcony) ? balcony : []} // Ensure this is the correct array, like homeType
                  value={formData[input.name]} // This should correctly reflect the selected value from formData
                  onChange={handleInputChange}
                  placeholder={`Select ${input.label}`}
                  displayKey="nbalcony" // This should match the field inside each option (home_type)
                  valueKey="id" // The unique key for each option
                />
              ) : input.name === "parking_count" ? (
                <SearchableDropdown
                  name={input.name}
                  options={Array.isArray(parkingCount) ? parkingCount : []} // Ensure this is the correct array, like homeType
                  value={formData[input.name]} // This should correctly reflect the selected value from formData
                  onChange={handleInputChange}
                  placeholder={`Select ${input.label}`}
                  displayKey="parking_count" // This should match the field inside each option (home_type)
                  valueKey="id" // The unique key for each option
                />
              ) : input.name === "tenant_type" ? (
                <SearchableDropdown
                  name={input.name}
                  options={Array.isArray(tenant) ? tenant : []} // Ensure this is the correct array, like homeType
                  value={formData[input.name]} // This should correctly reflect the selected value from formData
                  onChange={handleInputChange}
                  placeholder={`Select ${input.label}`}
                  displayKey="tenant_type" // This should match the field inside each option (home_type)
                  valueKey="id" // The unique key for each option
                />
              ) : input.name === "eat_pref" ? (
                <SearchableDropdown
                  name={input.name}
                  options={Array.isArray(tenantEat) ? tenantEat : []} // Ensure this is the correct array, like homeType
                  value={formData[input.name]} // This should correctly reflect the selected value from formData
                  onChange={handleInputChange}
                  placeholder={`Select ${input.label}`}
                  displayKey="eat_pref" // This should match the field inside each option (home_type)
                  valueKey="id" // The unique key for each option
                />
              ) : (
                <SearchableDropdown
                  name={input.name}
                  options={input.options}
                  value={formData[input.name]}
                  onChange={handleInputChange}
                  placeholder={`Select ${input.label}`}
                  displayKey={
                    // input.name === "home_type"
                    //   ? "home_type"
                    input.name === "nbaths"
                      ? "nbaths"
                      : input.name === "prop_desc"
                        ? "prop_desc"
                        : //: input.name === "balcony"
                          //? "nbalcony"
                          input.name === "tenant_type"
                          ? "tenant_type"
                          : input.name === "eat_pref"
                            ? "eat_pref"
                            : input.name === "parking_count" && "parking_count"
                  }
                  valueKey="id"
                />
              )}
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

export default PostPropertiesView;
