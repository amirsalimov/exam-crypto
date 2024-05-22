import { useStateManagment } from "../contextState/state"; // Corrected import
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "../components/chart";

interface CoinDetailsType {
  image: {
    large: string;
  };
  name: string;
  description: {
    en: string;
  };
  market_data: {
    market_cap_rank: number;
    current_price: {
      usd: number;
      eur: number;
      rub: number;
    };
    market_cap: {
      usd: number;
      eur: number;
      rub: number;
    };
  };
}

const CoinDetails = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const [details, setDetails] = useState<CoinDetailsType | null>(null);
  const { state } = useStateManagment();

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "rub":
        return "₽";
      default:
        return "$";
    }
  };

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const getCoinDetails = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error("Failed to fetch coin details:", error);
    }
  };

  useEffect(() => {
    if (coinId) {
      getCoinDetails();
    }
  }, [coinId]);

  if (!details) {
    return <div className="text-white">Loading...</div>;
  }

  const currencySymbol = getCurrencySymbol(state.currency);
  const currency =
    state.currency as keyof typeof details.market_data.current_price;
  const currentPrice = details.market_data?.current_price[currency] || 0;
  const marketCap = details.market_data?.market_cap[currency] || 0;

  return (
    <section className="mt-7 mb-10 lg:mb-52 pl-5 pr-10 flex flex-col lg:flex-row">
      <div className="flex flex-col gap-5 lg:gap-10 border-b-2 border-r-0 lg:border-b-0 lg:border-r-2 border-zinc-500 pb-5 sm:pb-8 lg:pr-8 w-full lg:w-[650px]">
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-5 lg:gap-10">
          <img
            src={details.image?.large}
            alt="coinimage"
            width={160}
            height={160}
            className="w-28 h-28 lg:h-40 lg:w-40"
          />
          <h1 className="text-white font-bold text-3xl lg:text-5xl capitalize">
            {details.name}
          </h1>
        </div>
        <div>
          <p className="text-white text-sm lg:text-base lg:leading-7 line-clamp-5 text-left sm:text-center lg:text-left">
            {details.description?.en}
          </p>
        </div>
        <div className="flex flex-col gap-0 sm:gap-2 lg:gap-5 items-start sm:items-center lg:items-start">
          <h1 className="text-white text-base sm:text-xl lg:text-2xl font-bold">
            Rank:{" "}
            <span className="font-normal">
              {details.market_data?.market_cap_rank}
            </span>
          </h1>
          <h1 className="text-white text-base sm:text-xl lg:text-2xl font-bold">
            Current Price:{" "}
            <span className="font-normal">
              {currencySymbol} {formatNumber(currentPrice)}
            </span>
          </h1>
          <h1 className="text-white text-base sm:text-xl lg:text-2xl font-bold">
            Market Cap:{" "}
            <span className="font-normal">
              {currencySymbol} {formatNumber(marketCap)}
            </span>
          </h1>
        </div>
      </div>
      {coinId && <Chart id={coinId} />}
    </section>
  );
};

export default CoinDetails;
