import { useStateManagment } from "../../contextState/state";
import { Link } from "react-router-dom";

const Header = () => {
  const { state, dispatch } = useStateManagment();

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCurrency = event.target.value;
    dispatch({ type: "CHANGE_CURRENCY", payload: newCurrency });
  };

  return (
    <header className="bg-zinc-900 py-3 shadow-md shadow-zinc-950">
      <div
        style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 10px" }}
        className="flex items-center justify-between"
      >
        <Link
          to="/"
          className="text-sky-300 font-bold uppercase text-lg md:text-xl"
        >
          Cryptofolio
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <select
            name="currency"
            id="currency"
            className="bg-inherit text-white font-normal text-xs sm:text-sm md:text-base"
            value={state.currency}
            onChange={handleCurrencyChange}
          >
            <option className="bg-color black" value="usd">USD$</option>
            <option className="bg-color black" value="eur">EURO</option>
            <option className="bg-color black" value="rub">RUBL</option>
          </select>
          <button
            onClick={() => dispatch({ type: "TOGGLE" })}
            type="button"
            className="bg-sky-300 rounded-sm uppercase font-medium py-2 px-4 tracking-normal text-xs transition hover:bg-sky-300 hover:bg-opacity-80 sm:text-sm md:text-sm md:py-3 md:px-6 md:tracking-wide"
          >
            Watch list
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
