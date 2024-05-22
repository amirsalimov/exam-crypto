import React from "react";
import { useStateManagment } from "../../contextState/state";

const SearchBar = () => {
  const { state, dispatch } = useStateManagment();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: event.target.value });
  };

  return (
    <section className="py-4 sm:py-5">
      <div
        className="flex flex-col items-center gap-4"
        style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 10px" }}
      >
        <h1 className="text-center font-normal text-xl sm:text-2xl md:text-3xl text-white">
          Cryptocurrency Prices by Market Cap
        </h1>
        <input
          type="search"
          placeholder="Search For a Crypto Currency..."
          value={state.searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 md:p-3 lg:p-4 text-xs sm:text-sm md:text-base bg-inherit border rounded-sm border-gray-500 focus:outline focus:outline-1 focus:outline-white text-white"
        />
      </div>
    </section>
  );
};

export default SearchBar;
