import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Coin from "./pages/Coin"
import CoinContextProvider from "./context/CoinContext"
import '@fortawesome/fontawesome-free/css/all.min.css'
import { ScrollProvider } from "./context/ScrollContext"

function App() {

  return (
    <>
      <CoinContextProvider>
      <ScrollProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/coin/:coinId'} element={<Coin/>}/>
        </Routes>
      </BrowserRouter>
      </ScrollProvider>
      </CoinContextProvider>
    </>
  )
}

export default App
