// apiService.js
import { getRecords,addNewRecord } from "../config/apiRoute";


// export const fetchProperties = async (currentPage, pageLimit) => {
//   return await axios.get(
//     `${apiUrl}/getAllProperties?page=${currentPage}&limit=${pageLimit}`
//   );
// };

// export const fetchStateList = async () => {
//   return await getRecords(tableName,fieldNames,params);
// };

// export const fetchStateList = async (
//   tableName,
//   fieldNames,
//   additionalParams = {},
// ) => {
//    return getRecords(tableName,fieldNames,additionalParams)
 
// };

export const fetchStaticData = async (
  tableName,
  fieldNames,
  additionalParams = {},
) => {
   return getRecords(tableName,fieldNames,additionalParams)
 
};

export const fetchCityList = async (
  tableName,
  fieldNames,
  additionalParams = {},
) => {
   return getRecords(tableName,fieldNames,additionalParams)
 
};

export const fetchBuildersList = async (
  tableName,
  fieldNames,
  additionalParams = {},
) => {
   return getRecords(tableName,fieldNames,additionalParams)
 
};

export const fetchCommunitiesList = async (
  tableName,
  fieldNames,
  additionalParams = {},
) => {
   return getRecords(tableName,fieldNames,additionalParams)
 
};

export const uploadProperty = async (fieldValues) => {
  // return await axios.post(`${apiUrl}/upload-property`, propertyData);
   const tableName="dy_property"
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
          
          "parking_count_id",
          "maintenance_id",
          "tower_no",
          "floor_no",
          "flat_no",
          
        ].join(",");

        const formattedFieldValues = fieldValues
      .map((value) => (value === null || value === undefined ? "NULL" : `'${value}'`))
      .join(",");
    // Sending a POST request to the server with the data (table name, field names, and values)
    return addNewRecord(
      tableName, // The name of the table where the record is to be added
      fieldNames, // The names of the fields to be inserted
    formattedFieldValues, // The values for each field in the record
);
};
