import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto"; 
import { Line } from "react-chartjs-2";

function CoinDetails() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
      const coinInfo = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const coinJson = await coinInfo.json();
        setCoinData(coinJson);

        const chartRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
        );
        const chartJson = await chartRes.json();

        const labels = chartJson.prices.map((p) =>
          new Date(p[0]).toLocaleDateString()
        );
        const prices = chartJson.prices.map((p) =>p[1]);
      setChartData({
          labels,
          datasets: [
            {
              label:`${coinJson.name} Price (USD)`,data: prices,fill: false,borderColor: "yellow",
              tension: 0.1
            }
          ]
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!coinData) return <p>No data found.</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex flex-col items-center">
      <div className="flex items-center gap-3 mb-5">
       <img src={coinData.image?.large} alt={coinData.name} className="w-12 h-12 mx-auto flex" />
       <h1 className="text-3xl font-bold mb-4 text-white">{coinData.name}</h1>
      </div>

      {chartData && (
    <div className="mb-6 w-full max-w-7xl h-[500px] md:h-96 mx-auto">
      <Line data={chartData} />
    </div>
  )}

      <div className="mb-6 text-white grid grid-cols-1 md:grid-cols-2 gap-8">
        <p>Market Rank: {coinData.market_cap_rank}</p>
        <p>Current Price: ${coinData.market_data.current_price.usd}</p>
        <p>24h High: ${coinData.market_data.high_24h.usd}</p>
        <p>24h Low: ${coinData.market_data.low_24h.usd}</p>
        <p>Circulating Supply: {coinData.market_data.circulating_supply}</p>
        <p>Total Supply: {coinData.market_data.total_supply}</p>
      </div>

      <div className="text-white">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="whitespace-pre-line">
            {coinData.description?.en}
        </p>
      </div>
    </div>
  );
}

export default CoinDetails;
