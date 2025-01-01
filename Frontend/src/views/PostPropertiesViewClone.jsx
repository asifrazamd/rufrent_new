/* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
// import tailwindStyles from "../utils/tailwindStyles";
// import SearchableDropdown from "./SearchDropdownView";

// const ProgressBar = ({ currentStep, totalSteps }) => {
//   return (
//     <div className="mt-6 px-6 mb-6">
//       <div className="relative flex items-center justify-between">
//         {/* Background line */}
//         <div className="absolute w-full h-2 bg-gray-200 rounded-lg top-1/2 transform -translate-y-1/2 z-0"></div>

//         {/* Steps */}
//         {Array.from({ length: totalSteps }).map((_, index) => {
//           const isActive = index + 1 <= currentStep;
//           const isCompleted = index + 1 < currentStep;

//           return (
//             <div key={index} className="relative">
//               {/* Connector line */}
//               {index > 0 && (
//                 <div
//                   className={`absolute top-1/2 -left-1/2 transform -translate-y-1/2 w-full h-2 ${"bg-gray-200"} z-0`}
//                 ></div>
//               )}

//               {/* Step Circle */}
//               <div
//                 className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
//                   isCompleted
//                     ? "bg-green-500 border-green-500 text-white"
//                     : isActive
//                       ? "bg-blue-500 border-blue-500 text-white"
//                       : "bg-white border-gray-300 text-gray-500"
//                 } z-10 shadow-md relative`}
//               >
//                 {isCompleted ? "✓" : index + 1}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const PostPropertiesView = () => {
//   // State for dropdown options
//   const [stateList, setStateList] = useState([]);
//   const [cityList, setCityList] = useState([]);
//   const [builderList, setBuilderList] = useState([]);
//   const [communityList, setCommunityList] = useState([]);
//   const [propertyType, setPropertyType] = useState([]);
//   const [isLoadingState, setIsLoadingState] = useState(false);
//   const [isLoadingCity, setIsLoadingCity] = useState(false);
//   const [isLoadingBuilder, setIsLoadingBuilder] = useState(false);
//   const [isLoadingCommunity, setIsLoadingCommunity] = useState(false);
//   const [stateError, setStateError] = useState(null);
//   const [cityError, setCityError] = useState(null);
//   const [builderError, setBuilderError] = useState(null);
//   const [communityError, setCommunityError] = useState(null);
//   const [bedrooms, setBedrooms] = useState([]);
//   const [bathrooms, setBathrooms] = useState([]);
//   const [balcony, setBalcony] = useState([]);
//   const [tenantType, setTenantType] = useState([]);
//   const [foodPreference, setFoodPreference] = useState([]);
//   const [parking, setParking] = useState([]);
//   const [propertyDescription, setPropertyDescription] = useState([]);

//   const [errors, setErrors] = useState({});
//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = 5;
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [modalImage, setModalImage] = useState(null);

//   const [formData, setFormData] = useState({
//     state: "",
//     city: "",
//     builder: "",
//     community: "",
//     propertyType: "",
//     towerNumber: "",
//     floorNumber: "",
//     flatNumber: "",
//     bedrooms: "",
//     bathrooms: "",
//     propertyDescription: "",
//     balcony: "",
//     tenantType: "",
//     foodPreferences: "",
//     rentalPrice: "",
//     parking: "",
//     images: [],
//   });

//   // Fetch state list when component mounts
//   useEffect(() => {
//     const fetchStateList = async () => {
//       setIsLoadingState(true);
//       setStateError(null);
//       try {
//         const response = await axios.get("http://localhost:5000/api/stateList");
//         setStateList(response.data[0]);
//       } catch (err) {
//         setStateError("Failed to fetch state list. Please try again later.");
//         console.error("Error fetching state list:", err);
//       } finally {
//         setIsLoadingState(false);
//       }
//     };

//     fetchStateList();
//   }, []);
//   // Fetch city list when state changes
//   useEffect(() => {
//     const fetchCityList = async () => {
//       if (!formData.state) {
//         setCityList([]);
//         return;
//       }

//       setIsLoadingCity(true);
//       setCityError(null);
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/cityList?state_id=${formData.state}`
//         );
//         setCityList(response.data);
//       } catch (err) {
//         setCityError("Failed to fetch city list. Please try again later.");
//         console.error("Error fetching city list:", err);
//       } finally {
//         setIsLoadingCity(false);
//       }
//     };

//     fetchCityList();
//   }, [formData.state]);

//   // Fetch builder list when city changes
//   useEffect(() => {
//     const fetchBuilderList = async () => {
//       if (!formData.city) {
//         setBuilderList([]);
//         return;
//       }

//       setIsLoadingBuilder(true);
//       setBuilderError(null);
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/buildersList?city_id=${formData.city}`
//         );
//         setBuilderList(response.data);
//       } catch (err) {
//         setBuilderError(
//           "Failed to fetch builder list. Please try again later."
//         );
//         console.error("Error fetching builder list:", err);
//       } finally {
//         setIsLoadingBuilder(false);
//       }
//     };
//     fetchBuilderList();
//   }, [formData.city]);

//   // Fetch community list when builder changes
//   useEffect(() => {
//     const fetchCommunityList = async () => {
//       if (!formData.builder) {
//         setCommunityList([]);
//         return;
//       }

//       setIsLoadingCommunity(true);
//       setCommunityError(null);
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/communitiesList?builder_id=${formData.builder}`
//         );
//         setCommunityList(response.data);
//       } catch (err) {
//         setCommunityError(
//           "Failed to fetch builder list. Please try again later."
//         );
//         console.error("Error fetching builder list:", err);
//       } finally {
//         setIsLoadingCommunity(false);
//       }
//     };
//     fetchCommunityList();
//   }, [formData.builder]);

//   // Fetch All Remaining Static Data
//   useEffect(() => {
//     const fetchStaticData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/stTablesData"
//         );
//         setBedrooms(response.data.home_type_list);
//         setBathrooms(response.data.bathrooms_list);
//         const formattedBalcony = response.data.balcony_list.map((each) => ({
//           id: each.id,
//           nbalcony: `${each.nbalcony}`,
//         }));

//         setBalcony(formattedBalcony);
//         setTenantType(response.data.tenant_type_list);
//         setFoodPreference(response.data.tenant_eat_prefence_list);
//         setParking(response.data.parking_count_list);
//         setPropertyType(response.data.prop_type_list);
//         setPropertyDescription(response.data.property_description_list);
//       } catch (err) {
//         console.error("Error fetching state list:", err);
//       }
//     };

//     fetchStaticData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, type, files } = e.target;

//     if (type === "file") {
//       const fileList = Array.from(files);
//       setFormData((prev) => ({
//         ...prev,
//         images: [...prev.images, ...fileList],
//       }));
//       const previews = fileList.map((file) => URL.createObjectURL(file));
//       setImagePreviews((prev) => [...prev, ...previews]);
//     } else {
//       const { value } = e.target;

//       if (name === "state") {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: value,
//           city: "", // Reset city when state changes
//           builder: "", // Reset builder when state changes
//         }));
//       } else if (name === "city") {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: value,
//           builder: "", // Reset builder when city changes
//           community: "", // Reset community when builder changes
//         }));
//       } else if (name === "builder") {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: value,
//           community: "", // Reset community when builder changes
//         }));
//       } else if (name === "community") {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: value,
//         }));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: value, // type === "checkbox" ? checked :
//         }));
//       }
//     }

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const handleRemoveImage = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const openImageModal = (image) => {
//     setModalImage(image);
//   };

//   const closeImageModal = () => {
//     setModalImage(null);
//   };

//   const validatePanel = (panelFields) => {
//     const panelErrors = {};
//     panelFields.forEach((field) => {
//       const value = formData[field.name];
//       if (field.type === "dropdown" && !value) {
//         panelErrors[field.name] =
//           `Please select a valid ${field.label.toLowerCase()}.`;
//       } else if ((field.type === "text" || field.type === "number") && !value) {
//         panelErrors[field.name] = `${field.label} must be a number.`;
//       }
//     });
//     return panelErrors;
//   };

//   const handleNext = () => {
//     const panelFields = panels[currentStep - 1];
//     const panelErrors = validatePanel(panelFields);

//     if (Object.keys(panelErrors).length > 0) {
//       setErrors(panelErrors);
//       return;
//     }
//     setCurrentStep((prev) => prev + 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/upload-property",
//         {
//           user_id: 1,
//           prop_type_id: formData.propertyType,
//           home_type_id: formData.bedrooms,
//           prop_desc_id: formData.propertyDescription,
//           community_id: formData.community,
//           no_beds: 4,
//           no_baths: formData.bathrooms,
//           no_balconies: formData.balcony,
//           tenant_type_id: formData.tenantType,
//           tenant_eat_pref_id: formData.foodPreferences,
//           rental_low: 1,
//           rental_high: 1,
//           parking_count_id: formData.parking,
//           deposit_range_id: 3,
//           availabl_date: "2025-01-01T00:00:00",
//           tower_no: parseInt(formData.towerNumber),
//           floor_no: parseInt(formData.floorNumber),
//           flat_no: parseInt(formData.flatNumber),
//           maintenance_id: 1,
//         }
//       );
//       console.log("Response:", response.data);
//     } catch (error) {
//       console.error("Error posting data:", error);
//     }
//     alert("Form submitted successfully!");
//   };

//   // ... (other state declarations and handlers remain the same)

//   const panels = [
//     [
//       {
//         label: "State",
//         name: "state",
//         options: stateList,
//         type: "dropdown",
//       },
//       {
//         label: "City",
//         name: "city",
//         type: "dropdown",
//         options: cityList,
//       },
//       {
//         label: "Builder",
//         name: "builder",
//         type: "dropdown",
//         options: builderList,
//       },
//       {
//         label: "Community",
//         name: "community",
//         type: "dropdown",
//         options: communityList,
//       },
//     ],
//     [
//       { label: "Tower Number", name: "towerNumber", type: "text" },
//       { label: "Floor Number", name: "floorNumber", type: "number" },
//       { label: "Flat Number", name: "flatNumber", type: "text" },
//       {
//         label: "Property Type",
//         name: "propertyType",
//         type: "dropdown",
//         options: propertyType,
//       },
//     ],
//     [
//       {
//         label: "Bedrooms",
//         name: "bedrooms",
//         type: "dropdown",
//         options: bedrooms,
//       },
//       {
//         label: "Bathrooms",
//         name: "bathrooms",
//         type: "dropdown",
//         options: bathrooms,
//       },
//       {
//         label: "Property Description",
//         name: "propertyDescription",
//         type: "dropdown",
//         options: propertyDescription,
//       },
//       {
//         label: "Balcony Count",
//         name: "balcony",
//         type: "dropdown",
//         options: balcony,
//       },
//     ],
//     [
//       { label: "Rental Price", name: "rentalPrice", type: "text" },

//       {
//         label: "Parking",
//         name: "parking",
//         type: "dropdown",
//         options: parking,
//       },
//       {
//         label: "Tenant Type",
//         name: "tenantType",
//         type: "dropdown",
//         options: tenantType,
//       },
//       {
//         label: "Food Preferences",
//         name: "foodPreferences",
//         type: "dropdown",
//         options: foodPreference,
//       },
//     ],
//     [{ label: "Upload Images", name: "images", type: "file" }],
//   ];

//   const renderInputs = (inputs) =>
//     inputs.map((input, idx) => (
//       <>
//         <div key={idx} className="col-span-1">
//           <label className="block text-gray-700 mb-2">{input.label}</label>
//           {input.type === "dropdown" ? (
//             <div>
//               {input.name === "state" ? (
//                 <SearchableDropdown
//                   name={input.name}
//                   options={stateList}
//                   value={formData[input.name]}
//                   onChange={handleInputChange}
//                   placeholder={`Search ${input.label}`}
//                   isLoading={isLoadingState}
//                   disabled={isLoadingState}
//                   error={stateError}
//                   displayKey="state_name"
//                   valueKey="id"
//                 />
//               ) : input.name === "city" ? (
//                 <SearchableDropdown
//                   name={input.name}
//                   options={cityList}
//                   value={formData[input.name]}
//                   onChange={handleInputChange}
//                   placeholder={`Search ${input.label}`}
//                   isLoading={isLoadingCity}
//                   disabled={isLoadingCity || !formData.state}
//                   error={cityError}
//                   helperText={
//                     !formData.state ? "Please select a state first" : ""
//                   }
//                   displayKey="city_name"
//                   valueKey="id"
//                 />
//               ) : input.name === "builder" ? (
//                 <SearchableDropdown
//                   name={input.name}
//                   options={builderList}
//                   value={formData[input.name]}
//                   onChange={handleInputChange}
//                   placeholder={`Search ${input.label}`}
//                   isLoading={isLoadingBuilder}
//                   disabled={isLoadingBuilder || !formData.city}
//                   error={builderError}
//                   helperText={
//                     !formData.city ? "Please select a city first" : ""
//                   }
//                   displayKey="builder_name"
//                   valueKey="id"
//                 />
//               ) : input.name === "community" ? (
//                 <SearchableDropdown
//                   name={input.name}
//                   options={communityList}
//                   value={formData[input.name]}
//                   onChange={handleInputChange}
//                   placeholder={`Search ${input.label}`}
//                   isLoading={isLoadingCommunity}
//                   disabled={isLoadingCommunity || !formData.builder}
//                   error={communityError}
//                   helperText={
//                     !formData.builder ? "Please select a builder first" : ""
//                   }
//                   displayKey="community_name"
//                   valueKey="id"
//                 />
//               ) : (
//                 <SearchableDropdown
//                   name={input.name}
//                   options={input.options}
//                   value={formData[input.name]}
//                   onChange={handleInputChange}
//                   placeholder={`Select ${input.label}`}
//                   displayKey={
//                     input.name === "bedrooms"
//                       ? "home_type"
//                       : input.name === "propertyType"
//                         ? "prop_type"
//                         : input.name === "bathrooms"
//                           ? "nbaths"
//                           : input.name === "propertyDescription"
//                             ? "prop_desc"
//                             : input.name === "balcony"
//                               ? "nbalcony"
//                               : input.name === "tenantType"
//                                 ? "tenant_type"
//                                 : input.name === "foodPreferences"
//                                   ? "eat_pref"
//                                   : input.name === "parking" && "parking_count"
//                   }
//                   valueKey="id"
//                 />
//               )}
//             </div>
//           ) : input.type === "file" ? (
//             <>
//               <input
//                 type="file"
//                 onChange={handleInputChange}
//                 value={""}
//                 multiple
//                 accept="image/*"
//                 className="w-full p-2 border rounded-md"
//               />
//               {imagePreviews.length > 0 && (
//                 <div className="w-full mx-auto px-4">
//                   <p>{formData.images.length} Files Choosen</p>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
//                     {imagePreviews.map((preview, index) => (
//                       <div
//                         key={index}
//                         className="relative group cursor-pointer"
//                         onClick={() => openImageModal(preview)}
//                       >
//                         <img
//                           src={preview}
//                           alt={`Preview ${index + 1}`}
//                           className="w-full h-32 object-cover rounded-md border"
//                         />
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             e.stopPropagation();
//                             handleRemoveImage(index);
//                           }}
//                           className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                         >
//                           &times;
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : (
//             <input
//               type={input.type}
//               name={input.name}
//               value={formData[input.name]}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md"
//             />
//           )}
//           {errors[input.name] && (
//             <p className="text-red-500 text-sm mt-1">{errors[input.name]}</p>
//           )}
//         </div>
//       </>
//     ));

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto mt-24">
//         <h2 className="text-center text-2xl font-semibold mb-4">
//           Add Property
//         </h2>
//         <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
//         <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-2 gap-6">
//               {renderInputs(panels[currentStep - 1])}
//             </div>

//             <div className="flex justify-between mt-4">
//               <button
//                 type="button"
//                 className={`${tailwindStyles.thirdButton} px-6 py-2 rounded-md`}
//                 disabled={currentStep === 1}
//                 onClick={() => setCurrentStep((prev) => prev - 1)}
//               >
//                 Previous
//               </button>
//               <button
//                 type="button"
//                 className={`${tailwindStyles.secondaryButton} px-6 py-2 rounded-md`}
//                 onClick={currentStep === totalSteps ? handleSubmit : handleNext}
//               >
//                 {currentStep === totalSteps ? "Submit" : "Next"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       {modalImage && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-4 shadow-lg relative w-3/4 h-3/4 flex items-center justify-center">
//             <button
//               onClick={closeImageModal}
//               className="absolute top-4 right-4 bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
//             >
//               &times;
//             </button>
//             <img
//               src={modalImage}
//               alt="Modal View"
//               className="w-full h-full object-contain"
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PostPropertiesView;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  
  fetchStaticData,
  fetchCityList,
  fetchBuildersList,
  fetchCommunitiesList,
  uploadProperty,
} from "../services/apiServices"; // Import the API service functions

import tailwindStyles from "../utils/tailwindStyles";

import Navbar from "./Navbar";
import ProgressBar from "./ProgressBar";
import SearchableDropdown from "./SearchDropdownView";
import LoadingView from "./LoadingView";
import { fetchBuilders, fetchCommunities } from "../utils/useFetchData";

const staticDataConfig = [
  {
    propertyType: ["st_prop_type", "id,prop_type"],
  },
  {
    bedrooms: ["st_home_type", "id,home_type"],
  },
  {
    bathrooms: ["st_baths", "id,nbaths"],
  },
  {
    balcony: ["st_balcony", "id,nbalcony"],
  },
  {
    tenantType: ["st_tenant", "id,tenant_type"],
  },
  {
    foodPreference: ["st_tenant_eat_pref", "id,eat_pref"],
  },
  {
    parking: ["st_parking_count", "id,parking_count"],
  },
  {
    propertyDescription: ["st_prop_desc", "id,prop_desc"],
  },
];



const PostPropertiesView = () => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true); // Loading state

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const [formData, setFormData] = useState({
   // state: "",
    city: "",
    builder: "",
    community: "",
    propertyType: "",
    towerNumber: "",
    floorNumber: "",
    flatNumber: "",
    bedrooms: "",
    bathrooms: "",
    propertyDescription: "",
    balcony: "",
    tenantType: "",
    foodPreferences: "",
    rentalPrice: "",
    parking: "",
    maintenance:"",
    images: [],
  });

  const [dropdownData, setDropdownData] = useState({
   // stateList: [],
    cityList: [],
    builderList: [],
    communityList: [],
    propertyType: [],
    bedrooms: [],
    bathrooms: [],
    balcony: [],
    tenantType: [],
    foodPreference: [],
    parking: [],
    propertyDescription: [],
  });

  const [loading, setLoading] = useState({
    //state: false,
    city: false,
    builder: false,
    community: false,
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [stateResponse, staticDataResponse] = await Promise.all([
  //         fetchStateList( 'st_state', 'id,name'),
          
  //       ]);
  //       setDropdownData((prev) => ({
  //         ...prev,
  //         stateList: stateResponse,
  //              }));
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          staticDataConfig.map(async (each) => {
            // Get the table name and field names from the staticDataConfig
            const value = Object.values(each)[0];
            const key=Object.keys(each)[0]; // table name, field names
            console.log("key",key)
            // Fetch the data using the values
            const data = await fetchStaticData(value[0], value[1],{rstatus:1});
            console.log(data);
            
            setDropdownData((prev) => ({
              ...prev,
              [key]: data, // Use the key to dynamically update the dropdownData state
            }));
            
          //   if(key=="propertyType"){
          //  setDropdownData((prev)=>

          //  ({...prev,propertyType:data})
          //  ) }
          })
        );
      
  
      
      } catch (err) {
        console.error("Error fetching static data:", err);
      }
    };
  
    fetchData();
  }, []);
  // useEffect(() => {
  //   fetchData(formData.homeType, setDropdownData, setLoading);
  // });
  

  useEffect(() => {
    const fetchCities = async () => {
      // if (!formData.state) return;
      // setLoading((prev) => ({ ...prev, city: true }));
      try {
        const response = await fetchCityList("st_city","id,name",  { rstatus: 1 });
        setDropdownData((prev) => ({ ...prev, cityList: response }));
        
      } catch (err) {
        console.error("Error fetching city list:", err);
      } finally {
        setLoading((prev) => ({ ...prev, city: false }));
      }
    };
    fetchCities();
  })
  //  [formData.state]);

  // useEffect(() => {
  //   const fetchBuilders = async () => {
  //     if (!formData.city) return;
  //     setLoading((prev) => ({ ...prev, builder: true }));
  //     try {
  //       const response = await fetchBuildersList('st_builder', 'id,name', { city_id: formData.city,rstatus:1 });
  //       setDropdownData((prev) => ({ ...prev, builderList: response }));
  //     } catch (err) {
  //       console.error("Error fetching builder list:", err);
  //     } finally {
  //       setLoading((prev) => ({ ...prev, builder: false }));
  //     }
  //   };
  //   fetchBuilders();
  // }, [formData.city]);

  useEffect(() => {
    fetchBuilders(formData.city, setDropdownData, setLoading);
  }, [formData.city]);

  useEffect(() => {
    fetchCommunities(formData.builder, setDropdownData, setLoading);
  }, [formData.builder]);

  const handleInputChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      const fileList = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileList],
      }));
      const previews = fileList.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
   // }
    //  else if (name === "state") {
    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: value,
    //     city: "", // Reset city when state changes
    //     builder: "", // Reset builder when state changes
    //     community: "",
    //   }));
    //   setDropdownData((prev) => ({
    //     ...prev,
    //     cityList: [],
    //     builderList: [],
    //     communityList: [],
    //   }));
    } else if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        builder: "", // Reset builder when city changes
        community: "", // Reset community when builder changes
      }));
      setDropdownData((prev) => ({
        ...prev,

        builderList: [],
        communityList: [],
      }));
    } else if (name === "builder") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        community: "", // Reset community when builder changes
      }));
      setDropdownData((prev) => ({
        ...prev,

        communityList: [],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
      // Skip validation for TowerNumber, FloorNumber, and FlatNumber if propertyType is 3
      if (
        formData.propertyType === 3 &&
        (
          field.name === "floorNumber" ||
          field.name === "flatNumber")
      ) {
        return; // Skip validation for these fields
      }

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
    try {
      // const response = await uploadProperty({
      //   user_id: 1,
      //   prop_type_id: formData.propertyType,
      //   home_type_id: formData.bedrooms,
      //   prop_desc_id: formData.propertyDescription,
      //   community_id: formData.community,
      
      //   no_baths: formData.bathrooms,
      //   no_balconies: formData.balcony,
      //   tenant_type_id: formData.tenantType,
      //   tenant_eat_pref_id: formData.foodPreferences,
      //   rental_low: 1,
  
      //   parking_count_id: formData.parking,
      
      //   tower_no: parseInt(formData.towerNumber),
      //   floor_no: parseInt(formData.floorNumber),
      //   flat_no: parseInt(formData.flatNumber),
      
      // });
      const response = await uploadProperty([
        1,
        formData.propertyType,
       formData.bedrooms,
         formData.propertyDescription,
        formData.community,
      
        formData.bathrooms,
       formData.balcony,
       formData.tenantType,
     formData.foodPreferences,
       formData.rentalPrice,
  
      formData.parking,
      formData.maintenance,
         parseInt(formData.towerNumber),
         formData.floorNumber,
         parseInt(formData.flatNumber),
      
      ]);

   

      console.log("Response:", response);
      alert("Form submitted successfully!");
      navigate("/user");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  //console.log(formData)

  const panels = [
    [
      // {
      //   label: "State",
      //   name: "state",
      //   options: dropdownData.stateList,
      //   type: "dropdown",
      //   displayKey: "name",
      // },
      {
        label: "City",
        name: "city",
        options: dropdownData.cityList,
        type: "dropdown",
        displayKey: "name",
      },
      {
        label: "Builder",
        name: "builder",
        options: dropdownData.builderList,
        type: "dropdown",
        displayKey: "name",
      },
      {
        label: "Community",
        name: "community",
        options: dropdownData.communityList,
        type: "dropdown",
        displayKey: "name",
      },
      {
        label: "Property Type",
        name: "propertyType",
        options: dropdownData.propertyType,
        type: "dropdown",
        displayKey: "prop_type",
      },
      {
        label: "Property Description",
        name: "propertyDescription",
        options: dropdownData.propertyDescription,
        type: "dropdown",
        displayKey: "prop_desc",
      },
      {
        label: "Home-Type",
        name: "bedrooms",
        options: dropdownData.bedrooms,
        type: "dropdown",
        displayKey: "home_type",
      },
     
    ],
    [
      { label: "Tower/Unit Number", name: "towerNumber", type: "text" },
      { label: "Floor Number", name: "floorNumber", type: "number" },
      { label: "Flat Number", name: "flatNumber", type: "text" },

     
      {
        label: "Bathrooms",
        name: "bathrooms",
        options: dropdownData.bathrooms,
        type: "dropdown",
        displayKey: "nbaths",
      },

      {
        label: "Balcony Count",
        name: "balcony",
        options: dropdownData.balcony,
        type: "dropdown",
        displayKey: "nbalcony",
      },
      {
        label: "Parking",
        name: "parking",
        options: dropdownData.parking,
        type: "dropdown",
        displayKey: "parking_count",
      },
    ],
    [
      { label: "Monthly Rental", name: "rentalPrice", type: "number" },
      
      {
        label: "Tenant Type",
        name: "tenantType",
        options: dropdownData.tenantType,
        type: "dropdown",
        displayKey: "tenant_type",
      },
      {
        label: "Food Preferences",
        name: "foodPreferences",
        options: dropdownData.foodPreference,
        type: "dropdown",
        displayKey: "eat_pref",
      },
      {label: "Maintenance", name:"maintenance",type:"checkbox"},

      { label: "Upload Images", name: "images", type: "file" },
    ],
  ];

  const totalSteps = panels.length;
  const renderInputs = (inputs) =>
    inputs.map((input, idx) => (
      <div key={idx} className="col-span-1">
        <label className="block text-gray-700 mb-2">{input.label}</label>
        {input.type === "dropdown" ? (
          <SearchableDropdown
            name={input.name}
            options={input.options}
            value={formData[input.name]}
            onChange={handleInputChange}
            placeholder={`Select ${input.label}`}
            isLoading={loading[input.name]}
            displayKey={input.displayKey || "name"}
            valueKey="id"
          />
        ) : input.type === "file" ? (
          <input
            type="file"
            onChange={handleInputChange}
            multiple
            accept="image/*"
            className="w-full p-2 border rounded-md"
          />
        ) : input.type === "checkbox" ? (
          <div className="flex items-center">
            <input
              type="checkbox"
              name={input.name}
              checked={formData[input.name] || false}
              onChange={(e) =>
                handleInputChange({
                  target: { name: input.name, value: e.target.checked ? 1 : 2 },
                })
              }
              className="mr-2"
            />
            <span>{input.label}</span>
          </div>
        ) : (
          <input
            type={input.type}
            name={input.name}
            value={formData[input.name]}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${
              (
                input.name === "floorNumber" ||
                input.name === "flatNumber") &&
              formData.propertyType === 3
                ? "opacity-50 bg-gray-200 cursor-not-allowed"
                : ""
            }`}
            placeholder={`Enter ${input.label}`}
            disabled={
              (
                input.name === "floorNumber" ||
                input.name === "flatNumber") &&
              formData.propertyType === 3
            }
          />
        )}
        {errors[input.name] && (
          <p className="text-red-500 text-sm mt-1">{errors[input.name]}</p>
        )}
      </div>
    ));
  

  return (
    <>
      <Navbar />
      {pageLoading ? (
        <LoadingView />
      ) : (
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-center text-2xl font-semibold mb-4">
            Add Property
          </h2>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderInputs(panels[currentStep - 1])}

                {/* Uploaded Images Collection */}
                {imagePreviews.length > 0 && currentStep == totalSteps && (
                  <div className="col-span-full mx-auto px-4">
                    <p>{formData.images.length} Files Chosen</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ">
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
                  onClick={
                    currentStep === totalSteps ? handleSubmit : handleNext
                  }
                >
                  {currentStep === totalSteps ? "Submit" : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {modalImage && (
        <div className="fixed inset-0 top-10 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-gray-600 rounded-lg p-4 shadow-lg relative w-3/4 h-3/4 flex items-center justify-center">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-gray-600  text-white rounded-full w-8 h-8 flex items-center justify-center"
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
