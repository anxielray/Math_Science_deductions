// src/components/ui/textarea.jsx
import React from "react";

export const Textarea = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-textarea"
    />
  );
};
