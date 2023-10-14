import React, {useEffect, useState} from "react";
import './AllListing.component.css'
import ListningImg from "../../../../assets/Product presentation-rafiki.png";
import {Link, useNavigate} from "react-router-dom";
import OrderImg from "../../../../assets/Delivery-amico.png";
import SalesImg from "../../../../assets/Statistics-bro.png";
import {productService} from "../../../../services/product.service";
import {manageAccount} from "../../../../services/manage-account.service";
import EditProduct from "./edit-product-page/EditProduct";

function AllListing(){
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    //const [id,setID]=useState('')
    const [isDeleted,setIsDeleted] = useState(false)

    useEffect(() => {
        getProducts()
        return () => {
            console.log('Component unmounted');

        };
    }, [isDeleted]);

    const getProducts = () =>{
        productService.getAllProducts(manageAccount.getSellerID()).then((response)=>{
            setProducts(response)
            if(response.length===0){
                navigate('/empty')
            }
            console.log(response)

        }).catch((error)=>{
            console.error('Error fetching products:', error);
        })

    }


    const handleDeleteProduct=(event,id)=>{
        event.preventDefault();
        console.log(id)
        productService
            .deleteProduct(id)
            .then((resp) => {
                if (resp.message === 'Product Deleted') {
                        console.log('Product Deleted!');
                        setIsDeleted(true)
                        alert('Product Deleted Succesfully!');

                        //Update the database
                        getProducts()

                }
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
                alert('Product Can\'t be deleted There are Order Placed Related to this Product!');
            });

    }


    return (
        <div>

            <div className="main-wrap ">
                <div className="card-container row">


                    {   products ?

                        products.map((product,index)=>(
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
                                <a href="#" className="card-link">
                                    <Link to={`edit-product/${product.productID}`} state={{ product }}
                                    >Edit</Link>
                                </a>
                                <a href="#" className="card-link"
                                   onClick={(e)=>{

                                    if (window.confirm("Are You Sure You want to delete Item?")) {

                                        handleDeleteProduct(e,product.productID);

                                    }
                                }
                                } style={{color:'red'}}>Delete</a>
                            </div>
                        </div>

                    )):
                    <p>Not Active Listings</p>
                    }


                </div>
            </div>

        </div>
    );


}

export default AllListing;
