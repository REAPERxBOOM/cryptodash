import React, { useState } from "react";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-[800px] mx-auto p-2 border-[1px] border-zinc-500 rounded-lg">
      <div className="relative mb-3">
        <h6 className="mb-0">
          <button
            className={`relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-zinc-500 text-slate-700 rounded-t-1 group text-dark-500 ${
              activeIndex === 0 ? "open" : ""
            }`}
            onClick={() => toggleAccordion(0)}
          >
            <span className="text-white">What is Crypto?</span>
            <i
              className={`text-white absolute right-0 pt-1 text-base transition-transform fa fa-chevron-down me-2 ${
                activeIndex === 0 ? "rotate-180" : ""
              }`}
            ></i>
          </button>
        </h6>
        <div
          data-collapse="animated-collapse-1"
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            activeIndex === 0 ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="p-4 text-sm leading-normal text-white">
            Crypto, or cryptocurrency, is a digital currency that uses
            encryption algorithms to allow people to make payments to each other
            online.
          </div>
        </div>
      </div>
      <div className="relative mb-3">
        <h6 className="mb-0">
          <button
            className={`relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-zinc-500 text-slate-700 rounded-t-1 group text-dark-500 ${
              activeIndex === 1 ? "open" : ""
            }`}
            onClick={() => toggleAccordion(1)}
          >
            <span className="text-white">What is CryptoMarket Place?</span>
            <i
              className={`text-white absolute right-0 pt-1 text-base transition-transform fas fa-chevron-down me-2 ${
                activeIndex === 1 ? "rotate-180" : ""
              } text-white`}
            ></i>
          </button>
        </h6>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            activeIndex === 1 ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="p-4 text-sm leading-normal text-white">
            A crypto marketplace is a place where buyers and sellers can
            exchange products and cryptocurrency. Crypto marketplaces can also
            act as exchanges, allowing users to buy and sell bitcoin and other
            cryptocurrencies.
          </div>
        </div>
      </div>
      <div className="relative mb-3">
        <h6 className="mb-0">
          <button
            className={`relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-zinc-500 text-slate-700 rounded-t-1 group text-dark-500 ${
              activeIndex === 2 ? "open" : ""
            }`}
            onClick={() => toggleAccordion(2)}
          >
            <span className="text-white">
              What is a Crypto Wallet?
            </span>
            <i
              className={`absolute right-0 pt-1 text-base transition-transform fas fa-chevron-down me-2 ${
                activeIndex === 2 ? "rotate-180" : ""
              } text-white`}
            ></i>
          </button>
        </h6>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            activeIndex === 2 ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="p-4 text-sm leading-normal text-white">
            A crypto wallet is a device or program that stores cryptocurrency
            keys and allows users to access their coins. Crypto wallets contain
            an address and private keys that are needed to sign cryptocurrency
            transactions. Anyone who knows the private key can control the coins
            associated with that address.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
