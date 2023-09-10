import { useState, useContext } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import SearchResults from "./SearchResults";
import { ThemeContext } from "../../Context/ThemeContext";
import { searchSymbols } from "../../api/stock-api";
import { useOutSideAlerter } from "../../hook/useOutSideAlerter";

const Search = () => {
  const { darkMode } = useContext(ThemeContext);
  const { isShow, ref, setIsShow } = useOutSideAlerter();

  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState([]);

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbols(input);
        const result = searchResults.result;

        setBestMatches(result);
      }
    } catch (error) {
      setBestMatches([]);
      console.error(error);
    }
  };

  return (
    <div
      className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"
      }`}
    >
      <input
        type="text"
        value={input}
        className={`w-full px-4 py-2 focus:outline-none rounded-md ${
          darkMode ? " bg-gray-900" : ""
        }`}
        placeholder="Search stock..."
        onChange={(e) => {
          setInput(e.target.value);
          setIsShow(true);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            updateBestMatches();
          }
        }}
      />

      {input && (
        <button onClick={clear} className="m-1">
          <XMarkIcon className="h-4 w-4 fill-gray-500" />
        </button>
      )}

      <button
        onClick={updateBestMatches}
        className="w-8 h-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2"
      >
        <MagnifyingGlassIcon className="h-4 w-4 fill-gray-100" />
      </button>

      {isShow && input && bestMatches.length > 0 ? (
        <SearchResults refOutSide={ref} results={bestMatches} />
      ) : null}
    </div>
  );
};
export default Search;
