import logo from './logo.svg';
import './App.css';
import './components/layout/header/header'
import Header from "./components/layout/header/header";
import SignIn from "./pages/sign-in-page/SignIn"
import SignUp from "./pages/sign-up-page/SignUp";
import Home from "./pages/home-page/Home";

//Seller Dashboard Component
import SellerDashboard from "./pages/seller-dashboard/SellerPage";
import AddListing from "./pages/seller-dashboard/listing-page/add-listing-page/AddListing";
import AllListing from "./pages/seller-dashboard/listing-page/all-listing-page/AllListing";
import AllOrders from "./pages/seller-dashboard/order-page/all-order-page/AllOrders";
import AwaitingShipment from "./pages/seller-dashboard/order-page/awaiting-shipment-page/AwaitingShipment";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {firstInputPolyfill} from "web-vitals/dist/modules/lib/polyfills/firstInputPolyfill";
import {Main} from "./pages/main-page/Main";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />

          <Route path={"/"} element={<Main />} >
              <Route path="/Home" element={<Home />} />


              <Route path="/dashboard" element={<SellerDashboard />}/>
              <Route path={"/dashboard/add_items"} element={<AddListing />} />
              <Route path={"/dashboard/all_items"} element={<AllListing />} />
              <Route path={"/dashboard/all_orders"} element={<AllOrders />} />
              <Route path={"/dashboard/awaiting_shipments"} element={<AwaitingShipment />} />

          </Route>




        </Routes>
      </Router>
);
}

export default App;
