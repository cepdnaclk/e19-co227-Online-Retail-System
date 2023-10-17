import './App.css';
import './components/layout/header/header'
import Header from "./components/layout/header/header";
import SignIn from "./pages/sign-in-page/SignIn"
import SignUp from "./pages/sign-up-page/SignUp";
import Home from "./pages/home-page/Home";
import MainLayout from './components/layout/MainLayout';
import Products from './pages/products/Products';
import Checkout from './pages/Checkout/OrderDetail';
import Successful from './pages/Checkout/Success';




//Seller Dashboard Component
import SellerDashboard from "./pages/seller-dashboard/SellerPage";
import AddListing from "./pages/seller-dashboard/listing-page/add-listing-page/AddListing";
import AllListing from "./pages/seller-dashboard/listing-page/all-listing-page/AllListing";
import AllOrders from "./pages/seller-dashboard/order-page/all-order-page/AllOrders";
import AwaitingShipment from "./pages/seller-dashboard/order-page/awaiting-shipment-page/AwaitingShipment";


import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";
import {firstInputPolyfill} from "web-vitals/dist/modules/lib/polyfills/firstInputPolyfill";
import SellerDashBoardLayout from './pages/seller-dashboard/SellerDashBoardLayout';
import ProductDetails from './pages/productDetails/ProductDetails';
import EditProduct from "./pages/seller-dashboard/listing-page/all-listing-page/edit-product-page/EditProduct";
import CartDetail from './pages/cartDetails/CartDetail';
import CategorizedItems from './pages/CategorizedItems/CategorizedItems'
import ProductTypes from './pages/CategorizedItems/ProductType';
import { HeaderContext } from './contexts/HeaderContext';
import { useState } from 'react';
import {manageAccount} from "./services/manage-account.service";
import UserDetails from "./pages/userDetails/UserDetails";
import CustomerOrders from "./pages/customer-orders/CustomerOrders";
import EmptyPage from "./pages/empty-page/EmptyPage";


const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element={<MainLayout />}>
z
            <Route path="SignIn" element={<SignIn />} />
            <Route path="SignUp" element={<SignUp />} />

            <Route path='/' element={<Header />}>
                <Route index element={<Home />} />
                <Route path="checkout" element={<Checkout/>} />
                <Route path="successful" element={<Successful/>} />
                <Route path="products" element={<Products/>} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="cart/:id" element={<CartDetail />} />
                <Route path="user" element={<UserDetails />} />
                <Route path="my-orders" element={<CustomerOrders />} />
                <Route path="/empty" element={<EmptyPage />} />
                <Route path="/:categoryName/:categoryID/:count" element={<ProductTypes/>}/>
                <Route path="/category/:categoryId/subcategory/:subcategoryId" element={<CategorizedItems/>}/>
                <Route path="dashboard" element={<SellerDashBoardLayout />}>
                    <Route index element={<SellerDashboard />} />
                    <Route path={"add_items"} element={<AddListing />} />
                    <Route path={"all_items"} element={<AllListing />} />
                    <Route path={"all_items/edit-product/:productId"} element={<EditProduct />} />

                    <Route path={"all_orders/:status"} element={<AllOrders />} />
                    {/*<Route path={"all_orders/:status"} element={<AwaitingShipment />} />*/}
                </Route>

            </Route>


        </Route>
    )
)


function App() {
  const [trigger,setTrigger] = useState(false)
  const [rec, setRec] = useState(true)


  return (
    <HeaderContext.Provider value={{trigger,setTrigger,rec,setRec}}>
      <RouterProvider router={router} />
    </HeaderContext.Provider>

);
}

export default App;
