import React, { useState, useEffect } from "react";
import { universalContext } from "../Context/Context";
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";

function Homepage() {
  const { crypto, load, results, selectedPrice, selectedCap } = universalContext();
  const [current_page, setCurrent_page] = useState(1);
  const [coins_perpage] = useState(10);

  const parseRange1 = (range) => {
    if (!range) return { min1: 0, max1: Infinity };
    if (range === "100000+") return { min1: 100000, max1: Infinity };
    const [min1, max1] = range.split("-").map(Number);
    return { min1, max1 };
  };

  const parseRange2 = (range) => {
    if (!range) return { min2: 0, max2: Infinity };
    if (range === "100000000000+") return { min2: 100000000000, max2: Infinity };
    const [min2, max2] = range.split("-").map(Number);
    return { min2, max2 };
  };

  const { min1, max1 } = parseRange1(selectedPrice);
  const { min2, max2 } = parseRange2(selectedCap);

  const filteredCoins = crypto.filter(
    (c) =>
      (c.name.toLowerCase().includes(results.toLowerCase()) ||
        c.symbol.toLowerCase().includes(results.toLowerCase())) &&
      (c.current_price >= min1 && c.current_price <= max1) &&  
      (c.market_cap >= min2 && c.market_cap <= max2)
  );

  const lastCoinIndex = current_page * coins_perpage;
  const firstCoinIndex = lastCoinIndex - coins_perpage;
  const currentCoins = filteredCoins.slice(firstCoinIndex, lastCoinIndex);

  useEffect(() => {
    setCurrent_page(1);
  }, [results, selectedPrice, selectedCap]);

  if (load)
    return <p className="text-2xl text-center mt-10 text-white">Loading...</p>;

  if (!crypto || crypto.length === 0)
    return (
      <p className="text-2xl text-center mt-10 text-white">
        No crypto data found.
      </p>
    );

  return (
    <div className="px-6 py-10 bg-gray-800 min-h-screen">
      <h2 className="text-5xl mb-5 text-center text-orange-500">Cryptos</h2>
      <Search />
      <Filter />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="px-4 py-2">Logo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Market Cap</th>
              <th className="px-4 py-2">24h Change</th>
              <th className="px-4 py-2">Volume</th>
            </tr>
          </thead>
          <tbody>
            {currentCoins.map((c) => (
              <tr key={c.id} className="border-b text-center hover:bg-gray-100">
                <td className="px-4 py-2">
                  <NavLink to={`/crypto/${c.id}`}>
                    <img src={c.image} alt={c.name} className="w-8 h-8 mx-auto" />
                  </NavLink>
                </td>
                <td className="px-4 py-2">
                  <NavLink to={`/crypto/${c.id}`}>{c.name}</NavLink>
                </td>
                <td className="px-4 py-2 uppercase">{c.symbol}</td>
                <td className="px-4 py-2">${c.current_price.toLocaleString()}</td>
                <td className="px-4 py-2">${c.market_cap.toLocaleString()}</td>
                <td
                  className={`px-4 py-2 ${
                    c.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {c.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td className="px-4 py-2">${c.total_volume.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination
          total={filteredCoins.length}
          coins_perpage={coins_perpage}
          setCurrent_page={setCurrent_page}
          current_page={current_page}
        />
      </div>
    </div>
  );
}

export default Homepage;
