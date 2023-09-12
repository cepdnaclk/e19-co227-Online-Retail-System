import React, {useEffect, useState} from "react";
import './AllListing.component.css'
import ListningImg from "../../../../assets/Product presentation-rafiki.png";
import {Link} from "react-router-dom";
import OrderImg from "../../../../assets/Delivery-amico.png";
import SalesImg from "../../../../assets/Statistics-bro.png";
import {productService} from "../../../../services/product.service";
import {manageAccount} from "../../../../services/manage-account.service";

function AllListing(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        productService.getAllProducts(manageAccount.getSellerID()).then((response)=>{
             setProducts(response)
            console.log(response)

        }).catch((error)=>{
            console.error('Error fetching products:', error);
        })
        return () => {
            console.log('Component unmounted');

        };
    }, []);



    return (
        <div>

            <div className="main-wrap ">
                <div className="card-container row">
                    {products.map((product,index)=>(
                        <div className="card" style={{width: "18rem"}}>
                            <img src={product.productImage1} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{product.productName}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{product.productID}</li>
                                <li className="list-group-item">Qty&nbsp;&nbsp;&nbsp;:{product.productQty}</li>
                                <li className="list-group-item">Price&nbsp;:${product.productPrice}</li>
                            </ul>
                            <div className="card-body">
                                <a href="#" className="card-link">Edit</a>
                                <a href="#" className="card-link" style={{color:'red'}}>Delete</a>
                            </div>
                        </div>

                    ))}


                </div>
            </div>

        </div>
    );


}

export default AllListing;
