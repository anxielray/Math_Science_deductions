// src/components/ui/card.jsx
import React from "react";

export const Card = ({ children }) => {
  return (
    <div className="border rounded-md shadow-md p-4">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="text-gray-700">{children}</div>;
};
    