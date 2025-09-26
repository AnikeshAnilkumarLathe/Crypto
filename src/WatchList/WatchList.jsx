import React, { useEffect } from 'react';
import { universalContext } from '../Context/Context';
import { NavLink } from 'react-router-dom';

function WatchList() {
  const { watchList, setWatchList, crypto, load } = universalContext();

  const coinsInWatchList = crypto.filter(coin =>watchList.includes(coin.id));
  const handleRemove = (c) => {
    setWatchList(prev => prev.filter(id =>id!== c.id));
  };

  if (load) return <p className="text-2xl text-center mt-10 text-white">Loading...</p>;
  if (!coinsInWatchList.length)
    return (
      <div className="px-6 py-10 bg-gray-800 min-h-screen text-center">
        <div className="text-5xl mb-10 text-orange-500">My WatchList</div>
        <p className="text-xl text-white">Your watchlist is empty!</p>
      </div>
    );

  return (
    <div className="px-6 py-10 bg-gray-800 min-h-screen">
      <div className="text-5xl mb-10 text-center text-orange-500">My WatchList</div>
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
            {coinsInWatchList.map(c => (
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
                <td className={`px-4 py-2 ${c.price_change_percentage_24h > 0 ? "text-green-500":"text-red-500"}`}>
                  {c.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td className="px-4 py-2">${c.total_volume.toLocaleString()}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleRemove(c)}
                    className="bg-red-500 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md shadow-md transition"
                  >Remove </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WatchList;
