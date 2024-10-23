import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const TimelineLoading = () => {
  return (
    <div className="text-4xl text-center mt-16">
      <FontAwesomeIcon icon={faRotateRight} spin className="text-gray-400" />
    </div>
  );
};

export default TimelineLoading;
