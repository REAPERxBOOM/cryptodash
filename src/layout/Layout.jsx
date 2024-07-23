import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <div className='px-5 md:px-10 relative'>
     <Header/>
      {props.children}
     <Footer/> 
    </div>
  )
}

export default Layout
