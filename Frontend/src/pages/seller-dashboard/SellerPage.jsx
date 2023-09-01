import React, {useState} from "react";
import './SellerDashboard.component.css'
import ListningImg from '../../assets/Product presentation-rafiki.png'
import OrderImg from '../../assets/Delivery-amico.png'
import SalesImg from '../../assets/Statistics-bro.png'
import Header from "../../components/layout/header/header";
import {Link} from "react-router-dom";
import {Outlet} from "react-router";



class SellerDashboard extends React.Component{

    constructor() {
        super();

    }

    render() {
        return (
            <div>

            <div className="main-wrap ">
                <div className="card-container row">

                    <div className="card  mx-2 my-2 col-md-3 col-sm-6" >
                        <img src={ListningImg} className="card-img-top" alt=""/>

                        <div className="card-header">
                            <h5>Listings</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><Link to={'add_items'}>Create Listings</Link></li>
                            <li className="list-group-item"><Link to={'all_items'}>Active Listings</Link></li>

                        </ul>
                    </div>
                    <div className="card mx-2 my-2 col-md-3 col-sm-6" >
                        <img src={OrderImg} className="card-img-top" alt=""/>

                        <div className="card-header">
                            <h5>Orders</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><Link to={'all_orders'}>All Orders</Link></li>
                            <li className="list-group-item"><Link to={'awaiting_shipments'}>Avaiting Shipment</Link></li>

                        </ul>
                    </div>
                    <div className="card mx-2 my-2 col-md-3 col-sm-6" >
                        <img src={SalesImg} className="card-img-top" alt=""/>

                        <div className="card-header">
                            <h5>Sales</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Today</li>
                            <li className="list-group-item">Last 7 Days</li>
                            <li className="list-group-item">Last 30 Days</li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        );
    }

}

export default SellerDashboard;
