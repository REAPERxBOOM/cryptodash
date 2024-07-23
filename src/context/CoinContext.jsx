import { createContext, useEffect, useState } from "react";


export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-JkyXJkK6aHCQDxaE6H7GVwVA'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchAllCoin();
    }, [currency])

    const ContextValue = { allCoin, currency, setCurrency }

    return(
        <CoinContext.Provider value={ContextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;