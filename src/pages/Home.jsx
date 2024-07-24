import React, { useContext, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { FiSearch } from "react-icons/fi";

import CryptoTable from "../components/CryptoTable";
import { CoinContext } from "../context/CoinContext";
import FAQs from "./FAQs";
import { useScroll } from "../context/ScrollContext";
import { motion } from "framer-motion";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displayedCoins, setDisplayedCoins] = useState([]);
  const { faqsRef } = useScroll();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setDisplayedCoins(allCoin);
  }, [allCoin]);

  useEffect(() => {
    if (searchInput) {
      const results = allCoin.filter((coin) =>
        coin.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      // console.log(results)
      setSearchResults(results);
      setDisplayedCoins(results);
    } else {
      setSearchResults([]);
      setDisplayedCoins(allCoin); // Reset displayed coins when search is cleared
    }
  }, [searchInput, allCoin]);

  const handleSearchInputChange = (e) => {
    // console.log(e.target.value)
    setSearchInput(e.target.value);
  };

  const handleSearchResultClick = (coin) => {
    setDisplayedCoins([coin]);
    setSearchInput("");
    setSearchResults([]);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-col mb-8">
          <motion.h1
            className="text-white text-5xl md:text-6xl lg:text-7xl text-center mt-12 mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            onAnimationComplete={handleAnimationComplete}
          >
            Crypto Marketplace
          </motion.h1>
          <motion.p
            className="text-white text-md text-center max-w-[350px] m-auto"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            onAnimationComplete={handleAnimationComplete}
          >
            Welcome to Crypto Marketplace. Sign up to know more about your
            favourite crypto.
          </motion.p>
        </div>
        <div className="mb-5 mx-auto min-w-[300px] sm:min-w-[320px] md:min-w-[420px] relative">
          <input
            type="text"
            className="border border-slate-300 rounded-lg p-3 text-white w-full"
            placeholder="Search crypto here..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <FiSearch className="absolute text-white text-2xl right-2 top-[50%] translate-y-[-50%] bg-[#131313]" />
          {searchResults.length > 0 && searchInput ? (
            <div className="absolute z-10 w-full border border-slate-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
              {searchResults.map((coin) => {
                return (
                  <div
                    key={coin?.id}
                    className="p-2 cursor-pointer text-white hover:bg-zinc-800 transition-all"
                    onClick={() => handleSearchResultClick(coin)}
                  >
                    {coin?.name}
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        {animationComplete && (
          <CryptoTable
            displayedCoins={displayedCoins}
            searchResults={searchResults}
            currency={currency}
          />
        )}
        <div ref={faqsRef}>
          <FAQs />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
