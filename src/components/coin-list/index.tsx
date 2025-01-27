import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useStateManagment } from "../../contextState/state";
import { Link } from "react-router-dom";

const CoinList = () => {
  const { state, dispatch } = useStateManagment();
  let currency: string;

  if (state.currency === "usd") {
    currency = "$";
  } else if (state.currency === "eur") {
    currency = "€";
  } else if (state.currency === "rub") {
    currency = "₽";
  } else {
    currency = "$";
  }

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

  const filteredCoins = state.allCoins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return (
    <section className="mb-10">
      <div
        className=""
        style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 10px" }}
      >
        <Table
          className="overflow-x-auto whitespace-nowrap w-[600px] sm:w-full"
          style={{ backgroundColor: "rgb(24 24 27)" }}
        >
          <TableHeader className="bg-sky-300">
            <TableRow className="">
              <TableHead className="font-bold text-gray-900 w-4/12 text-xs sm:text-sm py-3 sm:py-5">
                Coin
              </TableHead>
              <TableHead className="font-bold text-gray-900 w-2/12 text-right text-xs sm:text-sm py-3 sm:py-5">
                Price
              </TableHead>
              <TableHead className="font-bold text-gray-900 w-2/12 text-right text-xs sm:text-sm py-3 sm:py-5">
                24h Change
              </TableHead>
              <TableHead className="font-bold text-gray-900 w-2/12 text-right text-xs sm:text-sm py-3 sm:py-5">
                Market Cap
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b border-zinc-700">
            {filteredCoins.map((coin) => (
              <TableRow
                key={coin.id}
                className="transition hover:bg-zinc-800 cursor-pointer border-b border-zinc-700"
              >
                <TableCell className="font-medium flex items-center gap-4 py-2 sm:py-4">
                  <img
                    src={coin.image}
                    alt="coinimage"
                    width={50}
                    height={50}
                    className="w-10 h-10 sm:w-14 sm:h-14"
                  />
                  <div className="flex flex-col justify-start">
                    <Link
                      to={`/coin-details/${coin.id}`}
                      className="text-white font-normal text-base sm:text-xl uppercase hover:underline"
                    >
                      {coin.symbol}
                    </Link>
                    <span className="text-muted-foreground text-sm capitalize">
                      {coin.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right py-2 sm:py-4">
                  <span className="font-medium text-white text-xs sm:text-sm">
                    {currency} {coin.current_price}
                  </span>
                </TableCell>
                <TableCell className="text-right py-2 sm:py-4">
                  <div className="flex justify-end items-center gap-2 sm:gap-4">
                    {coin.price_change_percentage_24h > 0 ? (
                      <span className="font-medium text-green-500 text-xs sm:text-sm">
                        + {coin.price_change_percentage_24h}%
                      </span>
                    ) : (
                      <span className="font-medium text-red-500 text-xs sm:text-sm">
                        {coin.price_change_percentage_24h}%
                      </span>
                    )}
                    <button
                      type="button"
                      className=""
                      onClick={() => handleToggleWatchlist(coin)}
                    >
                      {state.watchList.some(
                        (watchlistCoin) => watchlistCoin.id === coin.id
                      ) ? (
                        <svg
                          className="w-5 h-5 sm:w-7 sm:h-7"
                          width="26"
                          height="24"
                          viewBox="0 0 26 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            width="26"
                            height="24"
                            fill="url(#pattern0_2_266)"
                          />
                          <defs>
                            <pattern
                              id="pattern0_2_266"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0_2_266"
                                transform="matrix(0.01 0 0 0.00964286 0 0.0178571)"
                              />
                            </pattern>
                            <image
                              id="image0_2_266"
                              width="100"
                              height="100"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 sm:w-7 sm:h-7"
                          width="26"
                          height="24"
                          viewBox="0 0 26 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            width="26"
                            height="24"
                            fill="url(#pattern0_2_269)"
                          />
                          <defs>
                            <pattern
                              id="pattern0_2_269"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0_2_269"
                                transform="matrix(0.00923077 0 0 0.01 0.0384615 0)"
                              />
                            </pattern>
                            <image
                              id="image0_2_269"
                              width="100"
                              height="100"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                      )}
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium text-white uppercase py-2 sm:py-4">
                  <span className="font-medium text-white text-xs sm:text-sm">
                    {currency} {formatNumber(coin.market_cap)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default CoinList;
