import React, { useContext, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import LineChart from "../components/LineChart";
import { motion } from "framer-motion";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [chartData, setChartData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "	CG-JkyXJkK6aHCQDxaE6H7GVwVA",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  const fetchChartData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "	CG-JkyXJkK6aHCQDxaE6H7GVwVA",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=5&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setChartData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchChartData();
  }, [currency]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (coinData && chartData) {
    return (
      <Layout>
        <motion.div
          className="max-w-[1000px] mt-5 mx-auto flex flex-col justify-center items-center gap-4 min-h-screen"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="coin-name px-10 py-2 flex flex-col justify-center items-center border-[1px] border-zinc-700 rounded-lg"
            variants={itemVariants}
          >
            <motion.img
              className="sm:max-w-[30px] md:max-w-[80px] lg:max-w-[100px]"
              src={coinData?.image?.large}
              variants={itemVariants}
              alt=""
            />
            <motion.p
              className="text-white mt-2 md:text-sm lg:text-xl"
              variants={itemVariants}
            >
              <b>
                {coinData.name}({coinData.symbol.toUpperCase()})
              </b>
            </motion.p>
            <motion.p
              className="text-white md:text-sm lg:text-lg mt-2"
              variants={itemVariants}
            >
              Rank - {coinData.market_cap_rank}
            </motion.p>
          </motion.div>
          <motion.div
            className="coin-chart w-full h-fit"
            variants={itemVariants}
          >
            <LineChart chartData={chartData} />
          </motion.div>
          <motion.div
            className="coin-info w-full border-[1px] border-zinc-700 rounded-lg overflow-hidden"
            variants={itemVariants}
          >
            <motion.ul
              className="text-white p-2 flex justify-between border-b-[1px] border-zinc-700"
              variants={itemVariants}
            >
              <li>CryptoMarket Rank</li>
              <li>{coinData.market_cap_rank}</li>
            </motion.ul>
            <motion.ul
              className="text-white p-2 flex justify-between border-b-[1px] border-zinc-700"
              variants={itemVariants}
            >
              <li>Current Price</li>
              <li>
                {currency.symbol}{" "}
                {coinData.market_data.current_price[
                  currency.name
                ].toLocaleString()}
              </li>
            </motion.ul>
            <motion.ul
              className="text-white p-2 flex justify-between border-b-[1px] border-zinc-700"
              variants={itemVariants}
            >
              <li>Market Cap</li>
              <li>
                {currency.symbol}{" "}
                {coinData.market_data.market_cap[
                  currency.name
                ].toLocaleString()}
              </li>
            </motion.ul>
            <motion.ul
              className="text-white p-2 flex justify-between border-b-[1px] border-zinc-700"
              variants={itemVariants}
            >
              <li>24H high</li>
              <li>
                {currency.symbol}{" "}
                {coinData.market_data.high_24h[currency.name].toLocaleString()}
              </li>
            </motion.ul>
            <motion.ul
              className="text-white p-2 flex justify-between"
              variants={itemVariants}
            >
              <li>24H low</li>
              <li>
                {currency.symbol}{" "}
                {coinData.market_data.low_24h[currency.name].toLocaleString()}
              </li>
            </motion.ul>
          </motion.div>
        </motion.div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="spinner">
          <div className="spin"></div>
        </div>
      </Layout>
    );
  }
};

export default Coin;
