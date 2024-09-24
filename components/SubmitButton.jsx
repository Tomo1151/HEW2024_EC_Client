import React from "react";

const SubmitButton = ({ text, onSubmit }) => {
  return (
    <button
      className="block text-xl p-4 bg-main-theme text-white w-[50%] mx-auto my-8 rounded absolute bottom-8 left-1/2 -translate-x-1/2"
      type="submit"
      onClick={onSubmit}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
