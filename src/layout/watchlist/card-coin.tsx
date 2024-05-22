import { X } from "lucide-react";
import c1 from "../../assets/c-1.png";
import { useStateManagment } from "../../contextState/state";
import { Link } from "react-router-dom";
const CoinCard = ({ details }: any) => {
  const { state, dispatch } = useStateManagment();

  const formatNumber = (number: number) => {
    if (number >= 1_000_000) {
      return (
        new Intl.NumberFormat("en-US", {
          style: "decimal",
          minimumFractionDigits: 0,
        }).format(number) + "M"
      );
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 0,
      }).format(number);
    }
  };

  const handleToggleWatchlist = (coin: any) => {
    const isCoinInWatchlist = state.watchList.some(
      (watchlistCoin) => watchlistCoin.id === coin.id
    );
    if (isCoinInWatchlist) {
      dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: coin });
    } else {
      dispatch({ type: "ADD_TO_WATCHLIST", payload: coin });
    }
  };

  return (
    <div className="rounded-xl  bg-zinc-700 flex items-center justify-between px-2 py-1 md:p-4 md:flex md:flex-col md:gap-4 md:items-center">
      <Link
        to={`/coin-details/${details.id}`}
        className="flex items-center gap-1"
      >
        <img
          src={details.image}
          alt="coinimage"
          width={80}
          height={80}
          className="w-11 h-11 md:w-16 md:h-16 lg:w-24 lg:h-24"
        />
        <span className="text-white text-sm font-medium text-center md:hidden">
          $ {formatNumber(details.current_price)}
        </span>
      </Link>
      <div className="hidden items-center md:flex md:flex-col md:items-center md:justify-center md:gap-2">
        <span className="text-white text-lg font-medium text-center">
          $ {formatNumber(details.current_price)}
        </span>
        <button
          className="text-white bg-red-500 py-1 px-4 rounded-md"
          onClick={() => handleToggleWatchlist(details)}
        >
          Remove
        </button>
      </div>
      <button
        className="flex items-center justify-center md:hidden"
        onClick={() => handleToggleWatchlist(details)}
      >
        <X size={20} color="red" />
        {}
      </button>
    </div>
  );
};

export default CoinCard;
