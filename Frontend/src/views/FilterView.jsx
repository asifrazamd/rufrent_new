// /* eslint-disable react/jsx-key */
// /* eslint-disable no-unused-vars */
// // src/components/FilterSection.jsx
// import React, { useState, useEffect } from "react";
// import tailwindStyles from "../utils/tailwindStyles";
// import { FaFilter } from "react-icons/fa6";
// import { fetchCityList } from "../services/apiServices";
// import { fetchBuilders, fetchCommunities } from "../utils/useFetchData";
// import SearchableDropdown from "./SearchDropdownView";
// const FilterSection = () => {
//   const [isShow, setIsShow] = useState(false);

//   // const [stateValue] = useState(["AP", "TG"]);
//   const [cityValues] = useState([

//   ]);
//   const [builderValues] = useState([

//   ]);
//   const [communities] = useState([

//   ]);

//   const [typeOfTenant] = useState([]);

//   const [furnishingValues] = useState([

//   ]);

//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [builder, setBuilder] = useState("");
//   const [selectedCommunities, setSelectedCommunities] = useState([]);
//   const [selectedBedroomTypes, setSelectedBedroomTypes] = useState([]);
//   const [data, setData] = useState([])
//   const [errors, setErrors] = useState({});

//   const [newTenantType, setNewTenantType] = useState("Bachelor");

//   const [newFurnishing, setNewFurnishing] = useState("Fully Furnished");
//   const [loading, setLoading] = useState({
//     //state: false,
//     city: false,
//     builder: false,
//     community: false,
//   });

//   const [dropdownData, setDropdownData] = useState({
//     // stateList: [],
//     cityList: [],
//     builderList: [],
//     communityList: [],
//     propertyType: [],
//     bedrooms: [],

//     propertyDescription: [],
//   });

//   console.log("data",data)

//   useEffect(() => {
//     const fetchCities = async () => {
//       // if (!formData.state) return;
//       // setLoading((prev) => ({ ...prev, city: true }));
//       try {
//         const response = await fetchCityList("st_city", "id,name", { rstatus: 1 });
//         setDropdownData((prev) => ({ ...prev, cityList: response }));
//       } catch (err) {
//         console.error("Error fetching city list:", err);
//       } finally {
//         setLoading((prev) => ({ ...prev, city: false }));
//       }
//     };
//     fetchCities();
//   })

//   useEffect(() => {
//     fetchBuilders(data.city, setDropdownData, setLoading);
//   }, [data.city]);

//   useEffect(() => {
//     fetchCommunities(data.builder, setDropdownData, setLoading);
//   }, [data.builder]);

//   const handleInputChange = (e) => {
//     const { name, type, value } = e.target;
//     if (name === "city") {
//       setData((prev) => ({
//         ...prev,
//         [name]: value,
//         builder: "", // Reset builder when city changes
//         community: "", // Reset community when builder changes
//       }));
//       setDropdownData((prev) => ({
//         ...prev,

//         builderList: [],
//         communityList: [],
//       }));
//     } else if (name === "builder") {
//       setData((prev) => ({
//         ...prev,
//         [name]: value,
//         community: "", // Reset community when builder changes
//       }));
//       setDropdownData((prev) => ({
//         ...prev,

//         communityList: [],
//       }));
//     } else {
//       setData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };


//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         // const response = await uploadProperty({
//         //   user_id: 1,
//         //   prop_type_id: formData.propertyType,
//         //   home_type_id: formData.bedrooms,
//         //   prop_desc_id: formData.propertyDescription,
//         //   community_id: formData.community,
        
//         //   no_baths: formData.bathrooms,
//         //   no_balconies: formData.balcony,
//         //   tenant_type_id: formData.tenantType,
//         //   tenant_eat_pref_id: formData.foodPreferences,
//         //   rental_low: 1,
    
//         //   parking_count_id: formData.parking,
        
//         //   tower_no: parseInt(formData.towerNumber),
//         //   floor_no: parseInt(formData.floorNumber),
//         //   flat_no: parseInt(formData.flatNumber),
        
//         // });
//         const response = await uploadProperty([
          
//           data.propertyType,
//          data.bedrooms,
//            data.propertyDescription,
//           data.community,
        
//       //     formData.bathrooms,
//       //    formData.balcony,
//       //    formData.tenantType,
//       //  formData.foodPreferences,
//       //    formData.rentalPrice,
    
//         // formData.parking,
//         // formData.maintenance,
//         //    parseInt(formData.towerNumber),
//         //    formData.floorNumber,
//         //    parseInt(formData.flatNumber),
        
//         ]);
  
     
  
//         console.log("Response:", response);
//         alert("Form submitted successfully!");
//         navigate("/user");
//       } catch (error) {
//         console.error("Error posting data:", error);
//       }
//     };

//   // const handleBedroomTypeChange = (bedroom) => {
//   //   setDropdownData((prev) =>
//   //     prev.includes(bedroom)
//   //       ? prev.filter((item) => item !== bedroom)
//   //       : [...prev, bedroom],
//   //   );
//   // };
//   const renderInputs = (inputs) =>
//     inputs.map((input, idx) => (
//       <div key={idx} className="col-span-1">
//         <label className="block text-gray-700 mb-2">{input.label}</label>
//         {input.type === "dropdown" ? (
//           <SearchableDropdown
//             name={input.name}
//             options={input.options}
//             value={setData[input.name]}
//             onChange={handleInputChange}
//             placeholder={`Select ${input.label}`}
//             isLoading={loading[input.name]}
//             displayKey={input.displayKey || "name"}
//             valueKey="id"
//           />
//         ) : null}
  
//         {/* Error Message */}
//         {errors[input.name] && (
//           <p className="text-red-500 text-sm mt-1">{errors[input.name]}</p>
//         )}
//       </div>
//     ));
  
//   return (
//     <>
//       <button
//         className={`block lg:hidden flex items-center`}
//         onClick={() => {
//           setIsShow(!isShow);
//         }}
//       >
//         <FaFilter />
//         <p className="m-0 pl-2">Filters</p>
//       </button>
//       <div
//         className={`${tailwindStyles.card} hidden lg:block lg:w-1/4 p-4 rounded shadow-sm h-3/4 fixed top-26 left-0`}
//       >
//         {" "}
//         {/*h-screen fixed top-26 left-0 z-10*/}
//         <h2 className="text-lg font-semibold mb-4">Filter</h2>
//         <form
//           style={{ maxHeight: "calc(100% - 50px)" }}
//           className="space-y-4 overflow-y-auto"
//         >
//           {" "}
//           <div>
//             <input type="radio"></input>
//             <label>{data.city}</label>
//               {renderInputs}
//           </div>
//           {/* <div>
//             <label className="block font-medium mb-2">Builder</label>
//             <select
//               className="w-full border rounded px-3 py-2"
//               value={builder}
//               onChange={(e) => setBuilder(e.target.value)}
//             >
//               <option value="">Select Builder</option>
//               {builderValues.map((each) => (
//                 <option value={each}>{each}</option>
//               ))}
//             </select>
//           </div> */}
//           {/* Community Filter */}
//           {/* <div>
//             <label className="block font-medium mb-2">Community</label>
//             <div className="flex flex-wrap gap-2">
//               {communities.map((community, index) => (
//                 <label key={index} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     className="mr-2"
//                     value={community}
//                     checked={selectedCommunities.includes(community)}
//                     onChange={() => handleCommunityChange(community)}
//                   />
//                   {community}
//                 </label>
//               ))}
//             </div>
//           </div> */}
//           {/* Bedroom Types Filter */}
//           {/* <div>
//             <label className="block font-medium mb-2">Bedroom Types</label>
//             <div className="flex flex-wrap gap-2">
//               {bedroomTypes.map((bedroom, index) => (
//                 <label key={index} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     className="mr-2"
//                     value={bedroom}
//                     checked={selectedBedroomTypes.includes(bedroom)}
//                     onChange={() => handleBedroomTypeChange(bedroom)}
//                   />
//                   {bedroom} BHK
//                 </label>
//               ))}
//             </div>
//           </div> */}

//           {/* Tenant Type Filter */}
//           {/* <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Type of Tenant
//             </label>
//             <select
//               className="w-full border rounded px-3 py-2"
//               value={newTenantType}
//               onChange={(e) => setNewTenantType(e.target.value)}
//             >
//               {typeOfTenant.map((tenant, index) => (
//                 <option key={index} value={tenant}>
//                   {tenant}
//                 </option>
//               ))}
//             </select>
//           </div>
//  */}

//           {/* Furnishing Filter */}
//           {/* <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Furnishing
//             </label>
//             <select
//               className="w-full border rounded px-3 py-2"
//               value={newFurnishing}
//               onChange={(e) => setNewFurnishing(e.target.value)}
//             >
//               {furnishingValues.map((furnish, index) => (
//                 <option key={index} value={furnish}>
//                   {furnish}
//                 </option>
//               ))}
//             </select>
//           </div> */}
//           <button
//             type="submit"
//             className={`${tailwindStyles.secondaryButton} py-2 px-4 rounded w-full mt-4`}
//           >
//             Apply
//           </button>
//         </form>
//       </div>
//       {/* For Mobile............. */}
//       {isShow && (
//         <div

//           className={`${tailwindStyles.card} lg:hidden lg:w-1/4 p-4 h-3/4 rounded shadow-sm`}
//         >
//           <h2 className="text-lg font-semibold mb-4">Filter</h2>
//           <form className="space-y-4 overflow-y-auto">
//             {" "}
//             {/*style={{ maxHeight: "calc(100% - 150px)" }}*/}
//             {/* City Filter */}

//             {/* Builder Filter */}
//             <div>
//               <label className="block font-medium mb-2">Builder</label>
//               <select
//                 className="w-full border rounded px-3 py-2"
//                 value={builder}
//                 onChange={(e) => setBuilder(e.target.value)}
//               >
//                 <option value="">Select Builder</option>
//                 {builderValues.map((each) => (
//                   <option value={each}>{each}</option>
//                 ))}
//               </select>
//             </div>
//             {/* Community Filter */}
//             <div>
//               <label className="block font-medium mb-2">Community</label>
//               <div className="flex flex-wrap gap-2">
//                 {communities.map((community, index) => (
//                   <label key={index} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       className="mr-2"
//                       value={community}
//                       checked={selectedCommunities.includes(community)}
//                       onChange={() => handleCommunityChange(community)}
//                     />
//                     {community}
//                   </label>
//                 ))}
//               </div>
//             </div>
//             {/* Bedroom Types Filter */}
//             <div>
//               <label className="block font-medium mb-2">Bedroom Types</label>
//               <div className="flex flex-wrap gap-2">
//                 {bedroomTypes.map((bedroom, index) => (
//                   <label key={index} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       className="mr-2"
//                       value={bedroom}
//                       checked={selectedBedroomTypes.includes(bedroom)}
//                       onChange={() => handleBedroomTypeChange(bedroom)}
//                     />
//                     {bedroom} BHK
//                   </label>
//                 ))}
//               </div>
//             </div>


//             {/* Tenant Type Filter */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Type of Tenant
//               </label>
//               <select
//                 className="w-full border rounded px-3 py-2"
//                 value={newTenantType}
//                 onChange={(e) => setNewTenantType(e.target.value)}
//               >
//                 {typeOfTenant.map((tenant, index) => (
//                   <option key={index} value={tenant}>
//                     {tenant}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Furnishing Filter */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Furnishing
//               </label>
//               <select
//                 className="w-full border rounded px-3 py-2"
//                 value={newFurnishing}
//                 onChange={(e) => setNewFurnishing(e.target.value)}
//               >
//                 {furnishingValues.map((furnish, index) => (
//                   <option key={index} value={furnish}>
//                     {furnish}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               type="submit"
//               className={`${tailwindStyles.secondaryButton} py-2 px-4 rounded w-full mt-4`}
//             >
//               Apply
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default FilterSection;


// src/components/FilterSection.jsx
import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa6";
import tailwindStyles from "../utils/tailwindStyles";
import { fetchBuilders,fetchCommunities } from "../utils/useFetchData";
import { fetchCityList, fetchStaticData } from "../services/apiServices";
//import { fetchCity } from "../utils/useFetchData";
import SearchableDropdown from "./SearchDropdownView";

const staticDataConfig = [
 
  { bedrooms: ["st_home_type", "id,home_type"] },
  { propertyDescription: ["st_prop_desc", "id,prop_desc"] },
];

const FilterSection = () => {
  const [errors, setErrors] = useState({});
  const [isShow, setIsShow] = useState(false);
  
  const [filters, setFilters] = useState({
    city: "",
    builder: "",
    community: "",
    bedroomType: "",

    propertyDescription: "",
  });
  

  const [dropdownData, setDropdownData] = useState({
    cityList: [],
    builderList: [],
    communityList: [],
    bedroomTypes: [],
   
    propertyDescriptions: [],
  });
console.log("drop",dropdownData)
  const [filteredResults, setFilteredResults] = useState([]);
  console.log("uuuuu",filteredResults)
 const [loading, setLoading] = useState({
     //state: false,
     city: false,
     builder: false,
     community: false,
   });
  // Fetch initial city list
  useEffect(() => {
    const fetchCities = async () => {
      try {
       // setLoading((prev) => ({ ...prev, city: true }));

        const response = await fetchCityList('st_city', 'id,name', { rstatus: 1 });
        setDropdownData((prev) => ({ ...prev, cityList: response }));
       
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading((prev) => ({ ...prev, city: false }));
      }
    };
    fetchCities();
  }, []);

  // Fetch builders based on selected city
  // useEffect(() => {
    
  //   const fetchBuilders = async (cityId, setDropdownData, setLoading) => {
      
  //     console.log("111")
  //    // if (!cityId) return;
      
  //     try {
  //       // setLoading((prev) => ({ ...prev, builder: true }));
  //     console.log("2222")
  //       console.log("333")
  //       const res = await fetchBuildersList('st_builder', 'id,name', { city_id:"198", rstatus: 1 });
  //       console.log("response",res[0])
  //       setDropdownData((prev) => ({ ...prev, builderList: res[0] }));
        
  //     } catch (err) {
  //       console.error("Error fetching builder list:", err);
  //     } finally {
  //      // setLoading((prev) => ({ ...prev, builder: false }));
  //     }
  //   };
  //   fetchBuilders()
  // }, []);

  // useEffect(() => {
  //   const fetchInitialData1 = async () => {
  //     try {
  //       setLoading((prev) => ({ ...prev,builder: true }));

  //       const cities = await fetchBuildersList('st_builder', 'id,name', { city_id:city, rstatus: 1 });
  //       setDropdownData((prev) => ({ ...prev, builderList: cities }));
       
  //     } catch (error) {
  //       console.error("Error fetching cities:", error);
  //     } finally {
  //       setLoading((prev) => ({ ...prev, builder: false }));
  //     }
  //   };
  //   fetchInitialData1();
  // }, []);

   useEffect(() => {
      fetchBuilders(filters.city, setDropdownData, setLoading);
      console.log("yoooo",filters.city)
    }, [filters.city]);

    useEffect(() => {
        fetchCommunities(filters.builder, setDropdownData, setLoading);
        console.log("yeeee",filters.builder)
      }, [filters.builder]);

  // Fetch communities based on selected builder
  // useEffect(() => {
  //   const fetchCommunities = async (builder,setDropdownData,setLoading) => {
  //     console.log("wwww",builder)
  //     if (!builder) return;
  //     setLoading((prev) => ({ ...prev, community: true }));
  //     try {
  //       const response = await fetchCommunitiesList('st_community', 'id,name', { builder_id: builder,rstatus:1 });
  //       setDropdownData((prev) => ({ ...prev, communityList: response}));
  //     } catch (err) {
  //       console.error("Error fetching community list:", err);
  //     } finally {
  //       setLoading((prev) => ({ ...prev, community: false }));
  //     }
  //   };
  //   fetchCommunities();
  // }, []);


  

// useEffect(() => {
//   fetchBuilders(formData.city, setDropdownData, setLoading);
// }, [formData.city]);

  // Fetch static dropdown data
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
            })
          );
        
    
        
        } catch (err) {
          console.error("Error fetching static data:", err);
        }
      };
    
      fetchData();
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "city") {
        setFilters((prev) => ({
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
        setFilters((prev) => ({
          ...prev,
          [name]: value,
          community: "", // Reset community when builder changes
        }));
        setDropdownData((prev) => ({
          ...prev,
  
          communityList: [],
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    };
  

  const handleApplyFilters = async (e) => {
    e.preventDefault();
    try {
     
      // Fetch filtered results using all selected filters
      const filterCriteria = {
        city: filters.city,
        builder: filters.builder,
        community: filters.community,
        bedroomType: filters.bedroomType,
        furnishing: filters.furnishing,
        propertyDescription: filters.propertyDescription,
      };

      //const filteredData = await fetchStaticData("property_table", "id,name,details", filterCriteria);
     console.log("rrr",filterCriteria)
      setFilteredResults(filterCriteria);
    } catch (error) {
      console.error("Error applying filters:", error);
    } 
  };

  const renderDropdown = (name, options, label) => (
    <div className="mb-4">
      <label className="block font-medium mb-2">{label}</label>
      <SearchableDropdown
        name={name}
        options={options}
        value={filters[name]}
        onChange={handleChange}
        placeholder={`Select ${label}`}
        displayKey="name"
        valueKey="id"
       // isLoading={loading}
      />
    </div>
  );

  return (
    <>
      <button
        className={`block lg:hidden flex items-center`}
        onClick={() => setIsShow(!isShow)}
      >
        <FaFilter />
        <p className="m-0 pl-2">Filters</p>
      </button>
      <div
        className={`${tailwindStyles.card} ${isShow ? "block" : "hidden"} lg:block lg:w-1/4 p-4 rounded shadow-sm fixed top-26 left-0`}
      >
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        {/* <form onSubmit={handleApplyFilters} className="space-y-4">
          {renderDropdown("city", dropdownData.cityList, "City")}
          {renderDropdown("builder", dropdownData.builderList, "Builder")}
          {renderDropdown("community", dropdownData.communityList, "Community")}
          {renderDropdown("bedroomType", dropdownData.bedrooms, "Bedroom Type")}
          {renderDropdown("furnishing", dropdownData.furnishings, "Furnishing")}
          {renderDropdown("propertyDescription", dropdownData.propertyDescriptions, "Property Description")}
          <button
            type="submit"
            className={`${tailwindStyles.secondaryButton} py-2 px-4 rounded w-full`}
          >
            Apply
          </button>
        </form> */}
      </div>
      <div>
        <h3 className="text-lg font-semibold my-4">Filtered Results</h3>
        <ul>
          {filteredResults.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FilterSection;
