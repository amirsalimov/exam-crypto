import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CoinDetails from "./pages/Details";
import Header from "./layout/header";
import { StateProvider } from "./contextState/state";
import WatchList from "./layout/watchlist/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <StateProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin-details/:coinId" element={<CoinDetails />} />
        </Routes>
        <WatchList />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </StateProvider>
    </BrowserRouter>
  );
}

export default App;
