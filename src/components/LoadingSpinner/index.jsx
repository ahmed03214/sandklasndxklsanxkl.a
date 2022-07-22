import React from "react";

const LoadingSpinner = ({ className = "", m = 5 }) => {
  return (
    <span
      className={`spinner-border mx-auto mt-${m} d-block ${className}`}
      role="status"
    />
  );
};

export default LoadingSpinner;
