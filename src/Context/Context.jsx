import React, { useEffect, useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [crypto, setCrypto] = useState([]);
  const [load, setLoad] = useState(true);
  const [results, setResults] = useState("");

  useEffect(() => {
    const fetchCrypto = async () => {
      setLoad(true);
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const data = await res.json();
        setCrypto(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoad(false);
      }
    };

    const delay = setTimeout(() => {
      fetchCrypto();
    }, 1000);

    return () => clearTimeout(delay);
  }, []); // fetch only once

  return (
    <AppContext.Provider value={{ crypto, load, results, setResults }}>
      {children}
    </AppContext.Provider>
  );
};

const universalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, universalContext };
