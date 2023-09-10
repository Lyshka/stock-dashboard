import { useState } from "react";
import { Dashboard } from "./components";
import { ThemeContext } from "./Context/ThemeContext";
import { StockContext } from "./Context/StockContext";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("META");

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider  value={{stockSymbol, setStockSymbol}}>
        <Dashboard />
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
};
export default App;
