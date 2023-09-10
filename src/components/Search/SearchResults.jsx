import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { StockContext } from "../../Context/StockContext";

const SearchResults = ({ results, refOutSide }) => {
  const { darkMode } = useContext(ThemeContext);
  const { setStockSymbol } = useContext(StockContext);

  return (
    <ul
      ref={refOutSide}
      className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll ${
        darkMode
          ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark"
          : "bg-white border-neutral-200 custom-scrollbar"
      }`}
    >
      {results.map(({ description, symbol }) => (
        <li
          key={symbol}
          className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${
            darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200"
          }`}
          onClick={() => {
            setStockSymbol(symbol);
          }}
        >
          <span>{symbol}</span>
          <span>{description}</span>
        </li>
      ))}
    </ul>
  );
};
export default SearchResults;
