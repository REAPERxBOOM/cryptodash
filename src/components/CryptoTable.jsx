import React, { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CryptoTable = ({ displayedCoins, searchResults, currency }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsToDisplay =
    searchResults.length > 0 ? searchResults : displayedCoins;
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemsToDisplay.slice(indexOfFirstItem, indexOfLastItem);
  const navigate = useNavigate();

  // HANDLE PAGE CHANGE
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // RENDER PAGINATION CONTROLS
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(itemsToDisplay.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // RENDER PAGE NUMBERS
  const renderPageNumbers = pageNumbers.map((number, index) => {
    // Display the current page and up to 2 pages before and after it
    if (
      index === 0 || // first page
      index === pageNumbers.length - 1 || // last page
      (index >= currentPage - 2 && index <= currentPage + 2) // around the current page
    ) {
      return (
        <li
          key={number}
          className={`page-item gap-3 me-2 ${
            number === currentPage
              ? "active border-2 border-sky-500 text-sky-500"
              : "border-slate-300"
          } hover:bg-zinc-800 transition-all active:scale-95 w-[35px] h-[35px] border rounded-lg grid place-items-center`}
        >
          <button
            onClick={() => handlePageChange(number)}
            className="page-link"
          >
            {number}
          </button>
        </li>
      );
    }

    // Show the ellipsis before the current page
    if (
      index === currentPage - 3 && // 4 pages before the current page
      currentPage > 4 // when the current page is greater than 4
    ) {
      return (
        <li key={number} className="page-item gap-3 me-2">
          ...
        </li>
      );
    }

    // Show the ellipsis after the current page
    if (
      index === currentPage + 3 && // 4 pages after the current page
      currentPage < pageNumbers.length - 5 // when the current page is less than total pages - 5
    ) {
      return (
        <li key={number} className="page-item gap-3 me-2">
          ...
        </li>
      );
    }

    return null; // null for pages not displayed
  });

  // HANDLE NEXT PAGE
  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // HANDLE PREV PAGE
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // NAVIGATE TO COIN PAGE WHEN ANY COIN IS CLICKED.
  const handleCoinPage = (id) => {
    navigate(`/coin/${id}`);
  };

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

  return (
    <>
      <motion.div
        className="relative overflow-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <table className="w-full max-w-[1600px] mx-auto sm:overflow-x-auto md:overflow-x-auto text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-slate-300 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b-[1px] border-slate-300">
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-right ">
                24h %
              </th>
              <th scope="col" className="px-6 py-3 ">
                Market Cap
              </th>
              <th scope="col" className="px-6 py-3">
                Total Volume
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Circulating Supply
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.slice(0, 10).map((item, idx) => {
              return (
                <motion.tr
                  variants={itemVariants}
                  key={idx}
                  className="text-slate-300 border-b border-zinc-800 cursor-pointer"
                  onClick={() => handleCoinPage(item.id)}
                >
                  <td scope="row" className="px-6 py-4">
                    {item.market_cap_rank}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <img src={item.image} alt="" className="max-w-[25px]" />
                    {item.name} - {item.symbol.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 ">
                    {currency.symbol}
                    {item.current_price.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 text-right ${
                      item.price_change_percentage_24h > 0
                        ? "text-green-300/75"
                        : "text-red-300/75"
                    }`}
                  >
                    {item.price_change_percentage_24h > 0 ? (
                      <span className="text-[0.7rem] me-1">&#9650;</span>
                    ) : (
                      <span className="text-[0.7rem] me-1">&#9660;</span>
                    )}
                    {Math.floor(item.price_change_percentage_24h * 100) / 100}%
                  </td>
                  <td className="px-6 py-4">{item.market_cap}</td>
                  <td className="px-6 py-4">{item.total_volume}</td>
                  <td className="px-6 py-4 text-right">
                    {Math.floor(item.circulating_supply * 100) / 100} -{" "}
                    {item.symbol.toUpperCase()}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        <ul className="pagination flex justify-center mt-4 text-white">
          <li
            className={`page-item me-2 w-[35px] h-[35px] border border-slate-300 rounded-lg ${
              currentPage !== 1
                ? "hover:bg-zinc-800 transition-all active:scale-95"
                : ""
            }  `}
          >
            <button
              onClick={handlePrevPage}
              className="page-link w-full h-full flex justify-center items-center"
              disabled={currentPage === 1}
            >
              <GrFormPrevious className="bg-transparent" />
            </button>
          </li>
          {renderPageNumbers}
          <li className="page-item w-[35px] h-[35px] border border-slate-300 rounded-lg hover:bg-zinc-800 transition-all active:scale-95">
            <button
              onClick={handleNextPage}
              className="page-link w-full h-full flex justify-center items-center"
              disabled={currentPage === pageNumbers.length}
            >
              <MdOutlineNavigateNext className="bg-transparent" />
            </button>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default CryptoTable;
