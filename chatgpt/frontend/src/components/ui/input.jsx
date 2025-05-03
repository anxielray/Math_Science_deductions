// src/components/ui/input.jsx
import React from "react";

export const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded-md p-2"
    />
  );
};
