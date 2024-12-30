// PaginationControls.js
import React from "react";

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="lg:pl-80 flex justify-center items-center space-x-2 mt-6">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md ${
          currentPage === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
        const page = Math.max(1, currentPage - 2) + index; // Calculate page number

        if (page > totalPages) return null;

        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded-md ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
