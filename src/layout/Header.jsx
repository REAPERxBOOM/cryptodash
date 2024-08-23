import React, { useContext, useState } from "react";
import { DiTerminal } from "react-icons/di";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import { useScroll } from "../context/ScrollContext";

const Header = () => {
  const { setCurrency } = useContext(CoinContext);
  const options = ["Home", "FAQs"];
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { faqsRef } = useScroll();

  // CURRENCY HANDLER
  const currencyHandler = (e) => {
    switch(e.target.value) {
      case 'usd': {
        setCurrency({name: "usd", symbol: "$"})
        break;
      }
      case 'eur': {
        setCurrency({name: "eur", symbol: "€"})
        break;
      }
      case 'inr': {
        setCurrency({name: "inr", symbol: "₹"})
        break;
      }
      default: {
        setCurrency({name: "usd", symbol: "$"})
        break;
      }
    }
  }

  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen); // Toggle modal state
  // };
 
  // const closeModal = (e) => {
  //   if (e.target.id === "authentication-modal") {
  //     setIsModalOpen(false);
  //   }
  // };

  const handleFaqClick = (e) => {
    e.preventDefault();
    navigate('/');
    if (faqsRef && faqsRef.current) {
      setTimeout(() => {
        faqsRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      console.log("faqsRef.current is undefined");
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-10 bg-[#131313]">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center h-[70px] px-4 text-white border-b border-zinc-700">
        <Link to={'/'} className="flex items-center">
          <DiTerminal fill="#fff" className="text-2xl md:text-5xl" />
          <p className="text-white text-md md:text-xl">cryptoDash</p>
        </Link>
        <ul className="sm:flex sm:justify-between sm:items-center hidden">
          {options.map((item, idx) => {
            return (
              <NavLink
                to={idx === 0 ? `/` : ``.toLowerCase()}
                className="text-white text-lg px-6 py-2 rounded-lg hover:bg-zinc-800 transition-all active:scale-95"
                key={idx}
                onClick={item === "FAQs" ? handleFaqClick : undefined}
              >
                {item}
              </NavLink>
            );
          })}
        </ul>
        <div className="flex gap-2 items-center">
          <select onChange={currencyHandler} className="p-2 border border-white rounded-lg text-white" defaultValue={"usd"}>
            <option className="text-white" value="usd">USD</option>
            <option className="text-white" value="eur">EUR</option>
            <option className="text-white" value="inr">INR</option>
          </select>
          {/* <button className="bg-slate-100 text-black px-2 py-1 md:px-4 md:py-2 rounded-lg text-center font-bold hover:brightness-75 transition-all active:scale-95">
            Login
          </button> */}
          {/* <button
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            className="bg-slate-100 text-black px-2 py-1 md:px-4 md:py-2 rounded-lg text-center font-bold hover:brightness-75 transition-all active:scale-95"
            type="button"
            onClick={toggleModal}
          >
            Sign up
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
