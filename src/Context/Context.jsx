import React, { useEffect, useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [crypto, setCrypto] = useState([]);
  const [load, setLoad] = useState(true);
  const [results, setResults] = useState("");
  const [selectedPrice, setSelectedPrice] =useState("")
  const [selectedCap, setSelectedCap]= useState("")
  const [gainLoss, setGainLoss]= useState("")
  const [watchList, setWatchList] = useState(() => {
    const stored= localStorage.getItem("watchList");
    return stored? JSON.parse(stored) :[];
  });
  useEffect(()=>{
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList])

  useEffect(() => {
    const fetchCrypto= async () => {
      setLoad(true);
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const data = await res.json();
        console.log(data)
        setCrypto(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoad(false);
      }
    };

    const delay= setTimeout(() => {
      fetchCrypto();
    }, 1000);

    return () => clearTimeout(delay);
  }, []); 

  return (
    <AppContext.Provider value={{ crypto, load, results, setResults, selectedPrice, 
    setSelectedPrice, selectedCap, setSelectedCap, gainLoss, setGainLoss, 
    watchList, setWatchList}}>
      {children}
    </AppContext.Provider>
  );
};

const universalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, universalContext };
