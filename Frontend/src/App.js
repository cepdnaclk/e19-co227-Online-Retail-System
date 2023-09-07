import logo from './logo.svg';
import './App.css';
import './components/layout/header/header'
import Header from "./components/layout/header/header";
import SignIn from "./pages/sign-in-page/SignIn"
import SignUp from "./pages/sign-up-page/SignUp";
import Home from "./pages/home-page/Home";
import MainLayout from './components/layout/MainLayout';
import Products from './pages/products/Products';

//Seller Dashboard Component
import SellerDashboard from "./pages/seller-dashboard/SellerPage";
import AddListing from "./pages/seller-dashboard/listing-page/add-listing-page/AddListing";
import AllListing from "./pages/seller-dashboard/listing-page/all-listing-page/AllListing";
import AllOrders from "./pages/seller-dashboard/order-page/all-order-page/AllOrders";
import AwaitingShipment from "./pages/seller-dashboard/order-page/awaiting-shipment-page/AwaitingShipment";


import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";
import {firstInputPolyfill} from "web-vitals/dist/modules/lib/polyfills/firstInputPolyfill";
import SellerDashBoardLayout from './pages/seller-dashboard/SellerDashBoardLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<MainLayout />}>
      
      <Route path="SignIn" element={<SignIn />} />
      <Route path="SignUp" element={<SignUp />} />

      <Route path='/' element={<Header />}>
         <Route index element={<Home />} />
         <Route path="products" element={<Products/>} />
         <Route path="dashboard" element={<SellerDashBoardLayout />}>
              <Route index element={<SellerDashboard />} />
              <Route path={"add_items"} element={<AddListing />} />
              <Route path={"all_items"} element={<AllListing />} />
              <Route path={"all_orders"} element={<AllOrders />} />
              <Route path={"awaiting_shipments"} element={<AwaitingShipment />} />
        </Route>
      </Route>
      
    </Route>
  )
)

function App() {
  return (
     <RouterProvider router={router} />
);
}

export default App;
