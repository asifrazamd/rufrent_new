// Importing the axios library to handle HTTP requests
import axios from "axios";
import apiStatusConstants from "../utils/apiStatusConstants";

// Defining the base URL for the API that will be used to make HTTP requests
export const apiUrl = "http://localhost:5000/api";

// Function to add a new record to the database table
export const addNewRecord = async (tableName, fieldNames, fieldValues) => {
  //postproperties
  try {
    // Sending a POST request to the server with the data (table name, field names, and values)
    const response = await axios.post(`${apiUrl}/addNewRecord`, {
      tableName, // The name of the table where the record is to be added
      fieldNames, // The names of the fields to be inserted
      fieldValues, // The values for each field in the record
    });
    // Returning the response data from the server
    return response.data;
  } catch (error) {
    // Logging any errors encountered during the process
    console.error("Error adding new record:", error);
    // Throwing the error to be handled by the calling function
    throw error;
  }
};

// Function to add a request to the system
export const addRequest = async (requestData) => {
  // rmrequests property id, userid
  try {
    // Sending a POST request with the request data to add the request
    const response = await axios.post(`${apiUrl}/addRequest`, requestData);
    // Returning the response data from the server
    return response.data;
  } catch (error) {
    // Logging any errors encountered during the process
    console.error("Error adding request:", error);
    // Throwing the error to be handled by the calling function
    throw error;
  }
};

// Function to fetch all properties from the server

export const displayAllProperties = async () => {
  try {
    // Sending a GET request with pagination parameters to fetch properties
    const url = `${apiUrl}/getAllProperties`;

    // Sending a GET request
    const response = await axios.get(url);

    console.log("API URL:", url); // Debugging URL
    console.log("API Response:", response.data); // Debugging Response

    // Returning success status and data
    return {
      status: apiStatusConstants.success, // Indicating success
      data: response.data,
      errorMsg: null,
    };
  } catch (error) {
    // Logging the error
    console.error("Error fetching properties:", error);

    // Returning failure status and error message
    return {
      status: apiStatusConstants.failure, // Indicating failure
      data: null,
      errorMsg: error.response?.data?.message || "Fetch Failed",
    };
  }
};


export const displayProperties = async (propertyId) => {
  try {
    // Sending a GET request with pagination parameters to fetch properties
    const url =`${apiUrl}/getAllProperties?property_id=${propertyId}`
    
    // Sending a GET request
    const response = await axios.get(url);

    console.log("API URL:", url); // Debugging URL
    console.log("API Response:", response.data); // Debugging Response

    // Returning success status and data
    return {
      status: apiStatusConstants.success, // Indicating success
      data: response.data,
      errorMsg: null,
    };
  } catch (error) {
    // Logging the error
    console.error("Error fetching properties:", error);

    // Returning failure status and error message
    return {
      status: apiStatusConstants.failure, // Indicating failure
      data: null,
      errorMsg: error.response?.data?.message || "Fetch Failed",
    };
  }
};

// Function to fetch all transactions based on the user ID
export const getAllTransactionBasedOnId = async (rmId) => {
  try {
    // Sending a GET request with the RM ID as a parameter to fetch request details
    const response = await axios.get(`${apiUrl}/requests`, {
      params: { rm_id: rmId }, // Passing the RM ID as a query parameter
    });

    // Returning the entire response data
    return response.data;
  } catch (error) {
    // Logging any errors encountered during the process
    console.error("Error fetching request details:", error);
    // Throwing the error to be handled by the calling function
    throw error;
  }
};

// Function to fetch a list of Field Managers (FM) based on a community ID
export const listOfFmBasedOnCommunityId = async (communityId) => {
  try {
    // Sending a GET request with the community ID as a parameter to fetch FM list for the community
    const response = await axios.get(`${apiUrl}/FmList`, {
      params: { communityId }, // Passing the community ID as a query parameter
    });
    // Returning the response data (the list of Field Managers)
    return response.data;
  } catch (error) {
    // Logging any errors encountered during the process
    console.error("Error fetching FM list:", error);
    // Throwing the error to be handled by the calling function
    throw error;
  }
};

// Function to fetch all records from the database
// Function to fetch records from different tables dynamically
export const getRecords = async (
  tableName,
  fieldNames,
  additionalParams = {},
) => {
  try {
    // Construct the where_condition if additionalParams include filtering conditions
    const whereCondition = Object.keys(additionalParams)
      .map((key) => `${key}=${additionalParams[key]}`)
      .join(" AND ");
console.log("where",whereCondition)
    const response = await axios.get(`${apiUrl}/getRecords`, {
      params: {
        tbl_name: tableName,
        field_names: fieldNames,
        where_condition: whereCondition || null, // Add constructed condition
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
};

// Function to update the status of a transaction
export const updateTransaction = async (transactionId, status) => {
  try {
    // Sending a PUT request to update the status of a transaction
    const response = await axios.put(`${apiUrl}/updatetranscationsstatus`, {
      transactionId, // The ID of the transaction being updated
      status, // The new status for the transaction
    });
    // Returning the response data (the updated transaction details)
    return response.data;
  } catch (error) {
    // Logging any errors encountered during the process
    console.error("Error updating transaction:", error);
    // Throwing the error to be handled by the calling function
    throw error;
  }
};
