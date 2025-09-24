import React from "react";
import { universalContext } from "../Context/Context";

function Filter() {
  const { selectedPrice, setSelectedPrice, selectedCap, setSelectedCap } = universalContext();

  return (
    <div className="my-4 flex gap-2 items-center text-white">
      <div>
      <label>Price Range:</label>
      <select
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className="px-2 py-1 rounded bg-amber-50 text-black"
      >
        <option value="">All</option>
        <option value="0-1">0-1</option>
        <option value="1-1000">1-1000</option>
        <option value="1000-10000">1000-10000</option>
        <option value="10000-100000">10000-100000</option>
        <option value="100000+">Above 100000</option>
      </select>
      </div>
      <div>
      <label>Market Cap Range:</label>
      <select
        value={selectedCap}
        onChange={(e) => setSelectedCap(e.target.value)}
        className="px-2 py-1 rounded bg-amber-50 text-black"
      >
        <option value="">All</option>
          <option value="1000000000-10000000000">1B - 10B</option>
          <option value="10000000000-100000000000">10B-100B</option>
          <option value="100000000000+">Above 100B</option>
      </select>
      </div>
    </div>
  );
}

export default Filter;
