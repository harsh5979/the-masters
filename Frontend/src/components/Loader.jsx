import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
      <button
        type="button"
        className="flex items-center p-4 bg-white rounded-lg shadow-lg"
        disabled
      >
        <svg
          className="animate-spin h-8 w-8 mr-3 text-red-600"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            d="M12 4V1m0 22v-3m-8-8H1m22 0h-3m-4-8l-2 2m0 0l-2-2m4 0l2-2m0 0l2 2m-2-2l-2 2m2 2l2-2m-2 0l-2 2"
          />
        </svg>
        <span className="text-lg">Loading...</span>
      </button>
    </div>
  );
};

export default Loader;
