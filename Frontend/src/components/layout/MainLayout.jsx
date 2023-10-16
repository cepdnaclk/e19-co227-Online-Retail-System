import React from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../ScrollToTop'


const MainLayout = () => {
  return (
    <>
      <ScrollToTop/>
      <Outlet />
    </>

    
  )
}

export default MainLayout