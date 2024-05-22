import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

interface State {
  isOpen: boolean;
  watchList: any[];
  allCoins: any[];
  currentPage: number;
  perPage: number;
  totalPages: number;
  currency: string;
  searchQuery: string;
}

type StateActions =
  | { type: "TOGGLE" }
  | { type: "SET_ALL_COINS"; payload: any[] }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "ADD_TO_WATCHLIST"; payload: {} }
  | { type: "REMOVE_FROM_WATCHLIST"; payload: { id: string } }
  | { type: "CHANGE_CURRENCY"; payload: string }
  | { type: "SET_SEARCH_QUERY"; payload: string };

interface StateContextProps {
  state: State;
  dispatch: React.Dispatch<StateActions>;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

const initialState: State = {
  isOpen: false,
  watchList: JSON.parse(localStorage.getItem("watchlist") || "[]"),
  allCoins: [],
  currentPage: 1,
  perPage: 10,
  totalPages: 10,
  currency: "usd",
  searchQuery: "",
};

const StateReducer = (state: State, action: StateActions): State => {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case "SET_ALL_COINS":
      return {
        ...state,
        allCoins: action.payload,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "ADD_TO_WATCHLIST":
      const updatedWatchlist = [...state.watchList, action.payload];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      return {
        ...state,
        watchList: updatedWatchlist,
      };
    case "REMOVE_FROM_WATCHLIST":
      const updatedWatchlistRemove = state.watchList.filter(
        (coin) => coin.id !== action.payload.id
      );
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlistRemove));
      return {
        ...state,
        watchList: updatedWatchlistRemove,
      };
    case "CHANGE_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

interface StateProviderProps {
  children: ReactNode;
}

export const StateProvider = ({ children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(StateReducer, initialState);

  const getAllCoins = async (page: number, currency: string) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=${state.perPage}&page=${page}&sparkline=false&price_change_percentage=24h`
      );
      const data = await response.json();

      dispatch({ type: "SET_ALL_COINS", payload: data });
    } catch (error) {
      console.error("Failed to fetch coins data:", error);
    }
  };

  useEffect(() => {
    getAllCoins(state.currentPage, state.currency);
  }, [state.currentPage, state.currency]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateManagment = (): StateContextProps => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateManagment must be used within a StateProvider");
  }
  return context;
};
