// src/hooks/useFetchData.js
import { useState, useEffect } from "react";
//import { getRecords } from "../config/apiRoute"; // Adjust this import according to your project structure
import {
  
  
  fetchBuildersList,
  fetchCommunitiesList,
 
} from "../services/apiServices";



  
// builderUtils.js
export const fetchBuilders = async (cityId, setDropdownData, setLoading) => {
  if (!cityId) return;
  setLoading((prev) => ({ ...prev, builder: true }));
  try {
    const response = await fetchBuildersList('st_builder', 'id,name', { city_id: cityId, rstatus: 1 });
    setDropdownData((prev) => ({ ...prev, builderList: response }));
  } catch (err) {
    console.error("Error fetching builder list:", err);
  } finally {
    setLoading((prev) => ({ ...prev, builder: false }));
  }
};

export const fetchCommunities = async (builder,setDropdownData,setLoading) => {
      if (!builder) return;
      setLoading((prev) => ({ ...prev, community: true }));
      try {
        const response = await fetchCommunitiesList('st_community', 'id,name', { builder_id: builder,rstatus:1 });
        setDropdownData((prev) => ({ ...prev, communityList: response}));
      } catch (err) {
        console.error("Error fetching community list:", err);
      } finally {
        setLoading((prev) => ({ ...prev, community: false }));
      }
    };
    fetchCommunities();

   
    //  export const fetchData = async (staticDataConfig,setDropdownData) => {
    //       try {
    //         const responses = await Promise.all(
    //           staticDataConfig.map(async (each) => {
    //             // Get the table name and field names from the staticDataConfig
    //             const value = Object.values(each)[0];
    //             const key=Object.keys(each)[0]; // table name, field names
    //             console.log("key",key)
    //             // Fetch the data using the values
    //             const data = await fetchStaticData(value[0], value[1],{rstatus:1});
    //             console.log(data);
                
    //             setDropdownData((prev) => ({
    //               ...prev,
    //               [key]: data, // Use the key to dynamically update the dropdownData state
    //             }));
                
    //           //   if(key=="propertyType"){
    //           //  setDropdownData((prev)=>
    
    //           //  ({...prev,propertyType:data})
    //           //  ) }
    //           })
    //         );
          
      
          
    //       } catch (err) {
    //         console.error("Error fetching static data:", err);
    //       }
    //     };
      
    //     fetchData();



