import React from "react";
import Link from "next/link";

const TimelineTab = ({ tabName, isActive, onClick }) => {
  return (
    <div
      className="flex min-w-48 h-12 select-none cursor-pointer hover:bg-gray-200 duration-200 rounded"
      onClick={onClick}
    >
      <p
        className={`w-3/5 mx-auto text-center pb-2 pt-3 mb-1 border-b-4 ${
          isActive ? "border-main-theme " : "border-transparent"
        } duration-200`}
      >
        {tabName}
      </p>
    </div>
  );
};

export default TimelineTab;
