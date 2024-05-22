import { InboxIcon, X } from "lucide-react";
import React from "react";
import CoinCard from "./card-coin";
import { useStateManagment } from "../../contextState/state";

const WatchList: React.FC = () => {
  const { state, dispatch } = useStateManagment();

  return (
    <div
      className={`${
        state.isOpen ? "translate-x-0" : "translate-x-full"
      } transition shadow-lg shadow-zinc-700 overflow-y-auto bg-zinc-800 p-4 fixed top-0 right-0 h-screen w-3/4 sm:w-2/4 lg:w-2/5 2xl:w-1/4`}
    >
      <div>
        <button onClick={() => dispatch({ type: "TOGGLE" })}>
          <X size={28} color="white" />
          {}
        </button>
      </div>
      <h1 className="text-white text-xl md:text-2xl uppercase font-medium text-center mb-4">
        Watchlist
      </h1>
      <div className="">
        {state.watchList.length > 0 ? (
          <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4">
            {state.watchList.map((coin) => (
              <CoinCard key={coin.id} details={coin} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <InboxIcon className="w-10 h-10 md:w-16 md:h-16 text-muted-foreground" />
            <h1 className="text-center text-muted-foreground sm:text-base md:text-xl">
              Your watch-list is an empty!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchList;
