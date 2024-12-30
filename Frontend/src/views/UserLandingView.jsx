// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import Navbar from "./Navbar";
// import FilterSection from "./FilterView";
// import PropertyListingCard from "./userLandingCardView";
// import LoadingView from "./LoadingView";
// import FailureView from "./FailureView";
// import apiStatusConstants from "../utils/apiStatusConstants";

// const UserLandingView = () => {
//   const [apiResponse, setApiResponse] = useState({
//     status: apiStatusConstants.initial,
//     data: null,
//     errorMsg: null,
//   });
//   const [currentPage, setCurrentPage] = useState(1); // Current page state
//   const [totalProperties, setTotalProperties] = useState(0); // Total properties state

//   const pageLimit = 5; // Number of properties per page

//   useEffect(() => {
//     const fetchData = async () => {
//       setApiResponse({
//         status: apiStatusConstants.inProgress,
//         data: null,
//         errorMsg: null,
//       });

//       const api = `http://localhost:5000/api/getAllProperties?page=${currentPage}&limit=${pageLimit}`;
//       try {
//         const response = await axios.get(api);
//         setApiResponse({
//           status: apiStatusConstants.success,
//           data: response.data.properties,
//           errorMsg: null,
//         });
//         setTotalProperties(response.data.totalProperties); // Total items from the API
//       } catch (error) {
//         setApiResponse({
//           status: apiStatusConstants.failure,
//           data: null,
//           errorMsg: error.response?.data?.message || "Fetch Failed",
//         });
//       }
//     };

//     fetchData();
//   }, [currentPage]); // Fetch data when currentPage changes

//   const totalPages = Math.ceil(totalProperties / pageLimit); // Calculate total pages

//   const successView = () => {
//     return (
//       <div className="lg:w-3/4 space-y-6 mb-20">
//         <div className="w-3/4">
//           <input
//             type="text"
//             className="form-control border border-gray-300 rounded-md px-2 py-1 lg:ml-36 xl:ml-44"
//             placeholder="Search Properties..." // Search input for searching property listings
//           />
//         </div>
//         {apiResponse.data.map((property) => (
//           <PropertyListingCard
//             key={property.id}
//             propertyId={property.id}
//             propDesc={property.prop_desc}
//             homeType={property.home_type}
//           />
//         ))}
//         {/* Pagination Controls */}
//         <div className="lg:pl-80 flex justify-center items-center space-x-2 mt-6">
//           {/* Previous Button */}
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 border rounded-md ${
//               currentPage === 1
//                 ? "bg-gray-200 cursor-not-allowed"
//                 : "bg-blue-500 text-white"
//             }`}
//           >
//             Previous
//           </button>

//           {/* Page Numbers */}
//           {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
//             const page = Math.max(1, currentPage - 2) + index; // Calculate page number

//             if (page > totalPages) return null;

//             return (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-3 py-1 border rounded-md ${
//                   page === currentPage
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100 hover:bg-gray-300"
//                 }`}
//               >
//                 {page}
//               </button>
//             );
//           })}

//           {/* Next Button */}
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 border rounded-md ${
//               currentPage === totalPages
//                 ? "bg-gray-200 cursor-not-allowed"
//                 : "bg-blue-500 text-white"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const loadingView = () => <LoadingView />;

//   const failureView = () => <FailureView />;

//   const renderListings = () => {
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
//     <>
//       <Navbar />
//       <div className="px-4 mt-24">
//         <div className="relative flex flex-col lg:flex-row justify-center gap-6">
//           {/* Filter Section */}
//           <FilterSection />
//           {/* User Listings View */}
//           {renderListings()}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserLandingView;

// UserLandingView.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import FilterSection from "./FilterView";
import SuccessView from "./SuccessView";
import LoadingView from "./LoadingView";
import FailureView from "./FailureView";
import apiStatusConstants from "../utils/apiStatusConstants";
import { fetchProperties } from "../services/apiServices";

const UserLandingView = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);

  const pageLimit = 5;

  useEffect(() => {
    const getData = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      });

      const result = await fetchProperties(currentPage, pageLimit);

      if (result.status === apiStatusConstants.success) {
        setApiResponse({
          status: result.status,
          data: result.data.properties,
          errorMsg: null,
        });
        setTotalProperties(result.data.totalProperties);
      } else {
        setApiResponse(result);
      }
    };

    getData();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProperties / pageLimit);

  const renderListings = () => {
    switch (apiResponse.status) {
      case apiStatusConstants.inProgress:
        return <LoadingView />;
      case apiStatusConstants.success:
        return (
          <SuccessView
            apiResponse={apiResponse}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        );
      case apiStatusConstants.failure:
        return <FailureView />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-4 mt-24">
        <div className="relative flex flex-col lg:flex-row justify-center gap-6">
          <FilterSection />
          {renderListings()}
        </div>
      </div>
    </>
  );
};

export default UserLandingView;
