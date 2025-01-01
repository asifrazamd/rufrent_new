// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// import apiStatusConstants from "../utils/apiStatusConstants";

// import ImageGallery from "./ImageGallery";
// import LoadingView from "./LoadingView";
// import FailureView from "./FailureView";
// import Navbar from "./Navbar";

// const FullDetailCard = () => {
//   const [apiResponse, setApiResponse] = useState({
//     status: apiStatusConstants.initial,
//     data: null,
//     errorMsg: null,
//   });

//   const local = useParams();
//   const id = local.propertyId;

//   useEffect(() => {
//     const fetchData = async () => {
//       setApiResponse({
//         status: apiStatusConstants.inProgress,
//         data: null,
//         errorMsg: null,
//       });

//       const api = `http://localhost:5000/api/propertyDetails?property_id=${id}`;

//       try {
//         const response = await axios.get(api);

//         setApiResponse({
//           status: apiStatusConstants.success,
//           data: response.data, // Adjust based on your API response structure
//           errorMsg: null,
//         });
//       } catch (error) {
//         setApiResponse({
//           status: apiStatusConstants.failure,
//           data: null,
//           errorMsg: error.response?.data?.message || "Fetch Failed",
//         });
//       }
//     };

//     fetchData();
//   }, [id]); // Added dependency `id` to re-fetch data when `id` changes

//   const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
//   const openAgreementModal = () => setIsAgreementModalOpen(true);
//   const closeAgreementModal = () => setIsAgreementModalOpen(false);

//   const successView = () => {
//     const {
//       prop_type,
//       home_type,
//       community_name,
//       prop_desc,
//       address,
//       open_area,
//       eat_pref,
//       parking_count,
//       deposit,
//       nbaths,
//       rent_lower,
//       // Image_url,
//     } = apiResponse.data;
//     // const { images } = Image_url;
//     return (
//       <div className="mt-16 container mx-auto p-4">
//         {/* <ImageGallery allImages={images} /> */}
//         <div className="bg-gray-200 p-6 rounded-lg shadow-md mt-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">{community_name}</h2>
//             <span className="text-2xl text-gray-600 cursor-pointer">
//               &#9825;
//             </span>{" "}
//             {/* Heart icon */}
//           </div>
//           <ul className="text-gray-600 space-y-2 mb-4">
//             <li>Location: {address}</li>
//             <li>Property Description: {prop_desc}</li>
//             <li>Property Type: {prop_type}</li>
//             <li>Price: ${rent_lower}</li>
//             <li>Bedrooms: {home_type}</li>
//             <li>Bathrooms: {nbaths}</li>
//             <li>Open Area: {open_area}</li>
//             <li>Eat Preference: {eat_pref}</li>
//             <li>Parking: {parking_count} Vehicle</li>
//             <li>Deposit Duration: {deposit} Months</li>
//             {/* <li>Area: {Area} sqft</li> */}
//           </ul>
//           <div className="flex justify-between items-center mt-6">
//             {/* <div className="text-gray-700">
//               <p className="text-lg">Contact Owner</p>
//               <p className="font-bold">{buildingOwnerNumber}</p>
//             </div> */}
//             <button
//               onClick={openAgreementModal}
//               className="bg-purple-600 text-white px-4 py-4 rounded-lg"
//             >
//               Connect To RM
//             </button>
//             {isAgreementModalOpen && (
//               <div className="fixed inset-0 p-8 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//                   <button
//                     className="absolute top-2 right-2 text-gray-500 text-2xl"
//                     onClick={closeAgreementModal}
//                   >
//                     &times;
//                   </button>
//                   <h3 className="text-xl font-bold mb-4">Agreement Details</h3>
//                   <p className="text-gray-700 mb-4">
//                     By proceeding, you agree to the following terms:
//                   </p>
//                   <ul className="text-gray-600 mb-4 space-y-2">
//                     <li>Brokerage Fee: Rs 9000</li>
//                     <li>Agreement Duration: 12 months</li>
//                     <li>Other Terms: Non-refundable service fee applies</li>
//                   </ul>
//                   <div className="flex justify-end space-x-4">
//                     <button
//                       className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
//                       onClick={closeAgreementModal}
//                     >
//                       Deny
//                     </button>
//                     <button
//                       className="bg-purple-600 text-white px-4 py-2 rounded"
//                       onClick={closeAgreementModal}
//                     >
//                       OK
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const loadingView = () => <LoadingView />;

//   const failureView = () => <FailureView />;

//   const renderDetailView = () => {
//     switch (apiResponse.status) {
//       case apiStatusConstants.inProgress:
//         return loadingView();
//       case apiStatusConstants.success:
//         return successView();
//       case apiStatusConstants.failure:
//         return failureView();
//       default:
//         return;
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />
//       {renderDetailView()}
//     </div>
//   );
// };

// export default FullDetailCard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// import apiStatusConstants from "../utils/apiStatusConstants";

// import LoadingView from "./LoadingView";
// import FailureView from "./FailureView";
// import Navbar from "./Navbar";

// const FullDetailCard = () => {
//   const [apiResponse, setApiResponse] = useState({
//     status: apiStatusConstants.initial,
//     data: null,
//     errorMsg: null,
//   });

//   const local = useParams();
//   const id = local.propertyId;

//   useEffect(() => {
//     const fetchData = async () => {
//       setApiResponse({
//         status: apiStatusConstants.inProgress,
//         data: null,
//         errorMsg: null,
//       });

//       const api = `http://localhost:5000/api/propertyDetails?property_id=${id}`;

//       try {
//         const response = await axios.get(api);

//         setApiResponse({
//           status: apiStatusConstants.success,
//           data: response.data, // Adjust based on your API response structure
//           errorMsg: null,
//         });
//       } catch (error) {
//         setApiResponse({
//           status: apiStatusConstants.failure,
//           data: null,
//           errorMsg: error.response?.data?.message || "Fetch Failed",
//         });
//       }
//     };

//     fetchData();
//   }, [id]); // Added dependency `id` to re-fetch data when `id` changes

//   const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
//   // const openAgreementModal = () => setIsAgreementModalOpen(true);
//   // const closeAgreementModal = () => setIsAgreementModalOpen(false);

//   const successView = () => {
//     const {
//       prop_type,
//       home_type,
//       community_name,
//       prop_desc,
//       address,
//       open_area,
//       eat_pref,
//       parking_count,
//       deposit,
//       nbaths,
//       rental_high,
//       // Image_url,
//     } = apiResponse.data;
//     // const { images } = Image_url;
//     return (
//       <div className="mt-16 container mx-auto p-4">
//         {/* <ImageGallery allImages={images} /> */}
//         <div className="bg-gray-200 p-6 rounded-lg shadow-md mt-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">{community_name}</h2>
//             <span className="text-2xl text-gray-600 cursor-pointer">
//               &#9825;
//             </span>{" "}
//             {/* Heart icon */}
//           </div>
//           <ul className="text-gray-600 space-y-2 mb-4">
//             <li>Location: {address}</li>
//             <li>Property Description: {prop_desc}</li>
//             <li>Property Type: {prop_type}</li>
//             <li>Price: {rental_high}</li>
//             <li>Bedrooms: {home_type}</li>
//             <li>Bathrooms: {nbaths}</li>
//             <li>Open Area: {open_area}</li>
//             <li>Eat Preference: {eat_pref}</li>
//             <li>Parking: {parking_count} Vehicle</li>
//             <li>Deposit Duration: {deposit} Months</li>
//             {/* <li>Area: {Area} sqft</li> */}

//           </ul>
//           <div className="flex justify-between items-center mt-6">
//             {/* <div className="text-gray-700">
//               <p className="text-lg">Contact Owner</p>
//               <p className="font-bold">{buildingOwnerNumber}</p>
//             </div> */}
//             <button
//               // onClick={openAgreementModal}
//               className="bg-purple-600 text-white px-4 py-4 rounded-lg"
//             >
//               Connect To RM
//             </button>
//             {/* {isAgreementModalOpen && (
//               <div className="fixed inset-0 p-8 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//                   <button
//                     className="absolute top-2 right-2 text-gray-500 text-2xl"
//                     onClick={closeAgreementModal}
//                   >
//                     &times;
//                   </button>
//                   <h3 className="text-xl font-bold mb-4">Agreement Details</h3>
//                   <p className="text-gray-700 mb-4">
//                     By proceeding, you agree to the following terms:
//                   </p>
//                   <ul className="text-gray-600 mb-4 space-y-2">
//                     <li>Brokerage Fee: Rs 9000</li>
//                     <li>Agreement Duration: 12 months</li>
//                     <li>Other Terms: Non-refundable service fee applies</li>
//                   </ul>
//                   <div className="flex justify-end space-x-4">
//                     <button
//                       className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
//                       onClick={closeAgreementModal}
//                     >
//                       Deny
//                     </button>
//                     <button
//                       className="bg-purple-600 text-white px-4 py-2 rounded"
//                       onClick={closeAgreementModal}
//                     >
//                       OK
//                     </button>
//                  </div>
//                 </div>
//               </div>
//             )}*/}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const loadingView = () => <LoadingView />;

//   const failureView = () => <FailureView />;

//   const renderDetailView = () => {
//     switch (apiResponse.status) {
//       case apiStatusConstants.inProgress:
//         return loadingView();
//       case apiStatusConstants.success:
//         return successView();
//       case apiStatusConstants.failure:
//         return failureView();
//       default:
//         return;
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />
//       {renderDetailView()}
//     </div>
//   );
// };

// export default FullDetailCard;

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import apiStatusConstants from "../utils/apiStatusConstants";

import LoadingView from "./LoadingView";
import FailureView from "./FailureView";
import Navbar from "./Navbar";
import { displayProperties } from "../config/apiRoute";

import { useRoleStore } from "../store/roleStore";

const FullDetailCard = () => {
  const id = useRoleStore((state) => state.id);

  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  });

  const local = useParams();
  const propertyId = local.propertyId;

  const user_id = id; // Replace this with actual user ID from your authentication logic
  console.log("propertyId:", propertyId);
console.log("user_id:", user_id);

  useEffect(() => {
    const fetchData = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      });

     // const response = `http://localhost:5000/api/propertyDetails?property_id=${propertyId}`;

      try {
        const propertyId = 1;
        const response = await displayProperties(propertyId);
        console.log("response",response.data)
        if (response.status === apiStatusConstants.success) {
          console.log("Specific Property:", response.data.results[0]); // Should log details of property with ID 1
        } else {
          console.error("Error:", response.errorMsg);
        }
        setApiResponse({
          status: apiStatusConstants.success,
          data: response.data.results[0], // Adjust based on your API response structure
          errorMsg: null,
        });
      } catch (error) {
        setApiResponse({
          status: apiStatusConstants.failure,
          data: null,
          errorMsg: error.response?.data?.message || "Fetch Failed",
        });
      }
    };

    fetchData();
  }, [propertyId]); // Added dependency `id` to re-fetch data when `id` changes

  // const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);

  // Function to handle "Connect To RM" button click
  const connectToRM = async () => {
    try {
      const api = "http://localhost:5000/api/addRequest";
      const payload = { user_id: user_id, property_id: propertyId };

      const response = await axios.post(api, payload);

      alert("Request sent to RM succesfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error connecting to RM:", error.response || error);
      alert("Failed to connect to RM. Please try again.");
    }
  };

  const successView = () => {
    const {
      prop_type,
      home_type,
      community_name,
      prop_desc,
      address,
      open_area,
      eat_pref,
      parking_count,
      deposit,
      nbaths,
      rental_high,
    } = apiResponse.data;
    console.log("...",apiResponse.data)
    return (
      <div className="mt-16 container mx-auto p-4">
        <div className="bg-gray-200 p-6 rounded-lg shadow-md mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{community_name}</h2>
            <span className="text-2xl text-gray-600 cursor-pointer">
              &#9825;
            </span>{" "}
          </div>
          <ul className="text-gray-600 space-y-2 mb-4">
            <li>Location: {address}</li>
            <li>Property Description: {prop_desc}</li>
            <li>Property Type: {prop_type}</li>
            <li>Price: {rental_high}</li>
            <li>Bedrooms: {home_type}</li>
            <li>Bathrooms: {nbaths}</li>
            <li>Open Area: {open_area}</li>
            <li>Eat Preference: {eat_pref}</li>
            <li>Parking: {parking_count} Vehicle</li>
            <li>Deposit Duration: {deposit} Months</li>
          </ul>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={connectToRM}
              className="bg-purple-600 text-white px-4 py-4 rounded-lg"
            >
              Connect To RM
            </button>
          </div>
        </div>
      </div>
    );
  };

  const loadingView = () => <LoadingView />;

  const failureView = () => <FailureView />;

  const renderDetailView = () => {
    switch (apiResponse.status) {
      case apiStatusConstants.inProgress:
        return loadingView();
      case apiStatusConstants.success:
        return successView();
      case apiStatusConstants.failure:
        return failureView();
      default:
        return;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      {renderDetailView()}
    </div>
  );
};

export default FullDetailCard;
