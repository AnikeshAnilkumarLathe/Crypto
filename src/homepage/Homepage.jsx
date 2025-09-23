import React, { useState, useEffect } from "react";
import { universalContext } from "../Context/Context";
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";

function Homepage() {
  const { crypto, load, results } = universalContext();
  const [current_page, setCurrent_page] = useState(1);
  const [coins_perpage] = useState(10);

  const filteredCoins = crypto.filter(
    (c) =>
      c.name.toLowerCase().includes(results.toLowerCase()) ||
      c.symbol.toLowerCase().includes(results.toLowerCase())
  );

  const lastCoinIndex = current_page * coins_perpage;
  const firstCoinIndex = lastCoinIndex - coins_perpage;
  const currentCoins = filteredCoins.slice(firstCoinIndex, lastCoinIndex);

  useEffect(() => {
    setCurrent_page(1);
  }, [results]);

  if (load) return <p className="text-2xl text-center mt-10">Loading...</p>;

  if (!crypto || crypto.length === 0)
    return <p className="text-2xl text-center mt-10">No crypto data found.</p>;

  return (
    <div className="px-6 py-10 bg-gray-800 min-h-screen">
      <h2 className="text-5xl mb-5 text-center text-orange-500">Cryptos</h2>
      <Search />

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
