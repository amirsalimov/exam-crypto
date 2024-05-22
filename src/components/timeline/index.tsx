import React from "react";

const ChartTimeLine = ({
  activeButton,
  handleButtonClick,
}: {
  activeButton: number;
  handleButtonClick: (index: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2 sm:gap-5 lg:gap-9">
      <button
        className={`transition border border-sky-300 outline-none rounded-md text-xs sm:text-sm lg:text-base py-2 lg:py-2.5 w-1/4 font-bold text-left px-2 lg:px-5 ${
          activeButton === 1
            ? "bg-sky-300 text-gray-900 hover:bg-sky-300"
            : "text-white bg-inherit hover:bg-sky-300 hover:text-gray-900"
        }`}
        onClick={() => handleButtonClick(1)}
      >
        24 Hours
      </button>
      <button
        className={`transition border border-sky-300 outline-none rounded-md text-xs sm:text-sm lg:text-base py-2 lg:py-2.5 w-1/4 font-bold text-left px-2 lg:px-5 ${
          activeButton === 30
            ? "bg-sky-300 text-gray-900 hover:bg-sky-300"
            : "text-white bg-inherit hover:bg-sky-300 hover:text-gray-900"
        }`}
        onClick={() => handleButtonClick(30)}
      >
        30 Days
      </button>
      <button
        className={`transition border border-sky-300 outline-none rounded-md text-xs sm:text-sm lg:text-base py-2 lg:py-2.5 w-1/4 font-bold text-left px-2 lg:px-5 ${
          activeButton === 90
            ? "bg-sky-300 text-gray-900 hover:bg-sky-300"
            : "text-white bg-inherit hover:bg-sky-300 hover:text-gray-900"
        }`}
        onClick={() => handleButtonClick(90)}
      >
        3 Months
      </button>
      <button
        className={`transition border border-sky-300 outline-none rounded-md text-xs sm:text-sm lg:text-base py-2 lg:py-2.5 w-1/4 font-bold text-left px-2 lg:px-5 ${
          activeButton === 365
            ? "bg-sky-300 text-gray-900 hover:bg-sky-300"
            : "text-white bg-inherit hover:bg-sky-300 hover:text-gray-900"
        }`}
        onClick={() => handleButtonClick(365)}
      >
        1 Year
      </button>
    </div>
  );
};

export default ChartTimeLine;
