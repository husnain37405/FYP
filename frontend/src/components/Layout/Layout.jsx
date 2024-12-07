import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
   <>
    <div>
        <Navbar />
    </div>
    <Outlet/>
    <div>
           <Footer />
    </div>
   </>
  )
}

export default Layout