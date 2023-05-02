import React from "react";

function Btn({ children, onClick, className, disabled, bg_color }) {
  return (
    <button
      className={`block w-full py-4 px-4 mb-4 font-bold border-2 border-gray-900 text-gray-900 ${disabled ? 'bg-gray-400 cursor-not-allowed' : bg_color} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Btn;