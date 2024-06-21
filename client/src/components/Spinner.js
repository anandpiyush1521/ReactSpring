import React from "react";

function Spinner() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
