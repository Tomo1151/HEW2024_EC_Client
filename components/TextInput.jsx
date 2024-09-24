import React from "react";

const TextInput = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      className="block text-xl p-4 border-b-2 border-main-theme w-[50%] mx-auto my-8"
      type={type || "text"}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
