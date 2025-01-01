// apiService.js

import apiStatusConstants from "../utils/apiStatusConstants";
import { displayProperties } from "../config/apiRoute";

export const fetchProperties = async (currentPage, pageLimit) => {
  try {
    // Utilizing the displayProperties function to fetch data
    const result = await displayProperties(currentPage, pageLimit);

    // Returning the result as is, since displayProperties already handles status and errorMsg
    console.log("res", result);
    return result;
  } catch (error) {
    // Logging the error in case displayProperties fails unexpectedly
    console.error("Error in fetchProperties:", error);

    // Returning a consistent failure response
    return {
      status: apiStatusConstants.failure,
      data: null,
      errorMsg: "Unexpected Error in fetchProperties",
    };
  }
};

// export const fetchProperties = async (currentPage, pageLimit) => {
//   const api = `${apiUrl}/getAllProperties?page=${currentPage}&limit=${pageLimit}`;
//   try {
//     const response = await axios.get(api);
//     return {
//       status: apiStatusConstants.success,
//       data: response.data,
//       errorMsg: null,
//     };
//   } catch (error) {
//     return {
//       status: apiStatusConstants.failure,
//       data: null,
//       errorMsg: error.response?.data?.message || "Fetch Failed",
//     };
//   }
// };
