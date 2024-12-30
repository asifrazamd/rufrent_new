// apiService.js
import axios from "axios";
import apiStatusConstants from "../utils/apiStatusConstants";
import { apiUrl } from "../config/apiRoute";

export const fetchProperties = async (currentPage, pageLimit) => {
  const api = `${apiUrl}/getAllProperties?page=${currentPage}&limit=${pageLimit}`;
  try {
    const response = await axios.get(api);
    return {
      status: apiStatusConstants.success,
      data: response.data,
      errorMsg: null,
    };
  } catch (error) {
    return {
      status: apiStatusConstants.failure,
      data: null,
      errorMsg: error.response?.data?.message || "Fetch Failed",
    };
  }
};
// import {displayProperties} from '../config/apiRoute'

// (async () => {
//   const currentPage = 1;
//   const pageLimit = 10;
//   const result = await displayProperties(currentPage, pageLimit);

//   if (result.status === apiStatusConstants.success) {
//     console.log('Fetched properties:', result.data);
//   } else {
//     console.error('Failed to fetch properties:', result.errorMsg);
//   }
// })();

