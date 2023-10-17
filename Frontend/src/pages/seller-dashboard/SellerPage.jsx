import React, {useEffect, useState} from "react";
import './SellerDashboard.component.css';
import ListningImg from '../../assets/Product presentation-rafiki.png';
import OrderImg from '../../assets/Delivery-amico.png';
import SalesImg from '../../assets/Statistics-bro.png';
import { Link } from "react-router-dom";
import {manageAccount} from "../../services/manage-account.service";
import {orderService} from "../../services/order.service";


function SellerDashboard() {

    const [salesData, setSalesData] = useState([]);


    useEffect(() => {
        getSalesData()

    }, []);

    const getSalesData=()=>{
        orderService.getSalesTotal(manageAccount.getSellerID()).then((response)=>{
            const salesData = response
            setSalesData(salesData)
            console.log(salesData)


        }).catch((e)=>{
            console.log(e)
        })


    }


    return (
        <div>
            <div className="main-wrap p-4">
                <div className="card-container row">
                    <div className="card  mx-2 my-2 col-md-3 col-sm-6">
                        <img src={ListningImg} className="card-img-top" alt="" />
                        <div className="card-header">
                            <h5>Listings</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <Link to={'add_items'} style={{ textDecoration: 'none' }}>Create Listings</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to={'all_items'} style={{ textDecoration: 'none' }}>Active Listings</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="card mx-2 my-2 col-md-3 col-sm-6">
                        <img src={OrderImg} className="card-img-top" alt="" />
                        <div className="card-header">
                            <h5>Orders</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <Link to={'all_orders/all'} style={{ textDecoration: 'none' }}>All Orders</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to={'all_orders/pending'} style={{ textDecoration: 'none' }}>Awaiting Shipment</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to={'all_orders/closed'} style={{ textDecoration: 'none' }}>Closed Orders</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="card mx-2 my-2 col-md-3 col-sm-6">
                        <img src={SalesImg} className="card-img-top" alt="" />
                        <div className="card-header">
                            <h5>Sales</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Today <span > ${salesData.today}</span> </li>
                            <li className="list-group-item">Last 7 Days <span> ${salesData.past7Days}</span> </li>
                            <li className="list-group-item">Last 30 Days <span> ${salesData.past30Days}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerDashboard;
