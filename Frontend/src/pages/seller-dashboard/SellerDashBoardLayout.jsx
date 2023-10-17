import { Outlet } from "react-router"
import Footer from "../../components/layout/footer/footer";
import React from "react";

const SellerDashBoardLayout = () => {
  return (
    <div className="content"><Outlet /> <Footer /></div>
  )
}

export default SellerDashBoardLayout
