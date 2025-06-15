import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2   rounded-xl   transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };
