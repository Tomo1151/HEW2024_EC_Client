import React from "react";

const TextInput = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      className="block text-md p-4 border-b-2 border-main-theme w-[85%] mx-auto my-8"
      type={type || "text"}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
