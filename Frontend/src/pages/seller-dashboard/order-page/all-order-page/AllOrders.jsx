import React, {useEffect, useState} from "react";
import './AllOrders.component.css'
import {orderService} from "../../../../services/order.service";
import {manageAccount} from "../../../../services/manage-account.service";
import {useNavigate, useParams} from "react-router-dom";
import {productService} from "../../../../services/product.service";


function AllOrders(){
    const { status } = useParams();
    const navigate= useNavigate();
    const [orderData,setOrderData] = useState([])
    const [orderItems,setOrderItems] = useState([])
    const [trackingID,settrackingID] = useState('')
    const [deliveryCompany,setdeliveryCompany] = useState('')
    const [currentOrderID,setCurrentOrderID] =useState(0)
    const [update,setUpdate] = useState('')


    useEffect(() => {
        getOrders()




    }, [update]);


    const getOrders=()=>{
        orderService.getOrders(manageAccount.getSellerID()).then((response)=>{

            const updateArr = response.data

            if(updateArr.length===0){
               navigate('/empty')
            }
            if(status==='pending'){
                const newArr = updateArr.filter((order) => order.orderStatus === 'Pending');

               setOrderData(prevState => {
                   return newArr
               })
           }else if(status==='closed'){
                const newArr = updateArr.filter((order) => order.orderStatus === 'Closed');

                setOrderData(prevState => {
                    return newArr
                })
            }else {
                setOrderData(prevState => {
                    return updateArr
                })
            }



            response.data.map((order,index)=>{
                getOrderItems(order.orderID)

            })
            console.log(orderItems[0])

        }).catch((e)=>{
            console.log(e)
        })

    }

    const getOrderItems=(orderID)=>{
        console.log(orderID)
        orderService.getOrderItems(orderID).then((response)=>{
            setOrderItems(prevState => {
                return [...prevState,response.data]
            })




        }).catch((e)=>{
            console.log(e)
        })

    }

    const handleAddTracking=(event)=>{
        orderService.updateTracking(currentOrderID,trackingID,deliveryCompany).then(respoonse=>{
            console.log(respoonse.message)
            updateStatus("Shipped",currentOrderID)

        }).catch((e)=>{
                console.log(e)
            }
        )

    }

    const updateStatus=(status,id)=>{
        orderService.updateOrderStatus(id,status).then(response=>{
            console.log(response.message)
            setUpdate('updated')
            getOrders()
        }).catch((e)=>{
            console.log(e)
        })
    }

    const handleDeleteOrder=(event,id)=>{
        event.preventDefault();
        console.log(id)
        orderService
            .deleteOrder(id)
            .then((resp) => {
                if (resp.message === 'Order Deleted') {
                    console.log('Order Deleted!');
                    setUpdate('deleted')
                    getOrders()
                    alert('Order Deleted Succesfully!');


                }
            })
            .catch((error) => {
                console.error('Error deleting Order:', error);
                alert('Error deleting Order!');
            });



    }


    return (
        <div>

            <div className="main-wrap ">


                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Action</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Order Items</th>
                        <th scope="col">Total</th>
                        <th scope="col">Date</th>
                        <th scope="col">Shipping Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderData.map((order,index)=>(
                        <tr>
                            <th scope="row">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-outline-secondary dropdown-toggle"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        Action
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" type='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={()=>{setCurrentOrderID(order.orderID)}}>Add Tracking</a></li>
                                        <li><a className="dropdown-item" type='button' onClick={()=>{ updateStatus("Closed",order.orderID); }}>Close Order</a></li>
                                        <li><a className="dropdown-item" type='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Shipping Details</a></li>
                                        <li><a className="dropdown-item" type='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop3" style={{color:'red'}}>Delete</a></li>
                                    </ul>

                                    {/*Model for Add tracking*/}
                                    <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Tracking</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div className="form-floating mb-3">
                                                        <input type="email" className="form-control" id="floatingInput"
                                                               placeholder="name@example.com"  onChange={(e)=>{settrackingID(e.target.value)}} />
                                                        <label htmlFor="floatingInput">Tracking Number</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input type="email" className="form-control" id="floatingInput"
                                                               placeholder="name@example.com"  onChange={(e)=>{setdeliveryCompany(e.target.value)}}/>
                                                        <label htmlFor="floatingInput">Delivery Company</label>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-warning" onClick={handleAddTracking} data-bs-dismiss="modal">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Shipping Address</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    {order.firstName} {order.lastName} <br/>
                                                    {order.address1} <br/>
                                                    {order.address2} <br/>
                                                    {order.address3} <br/>
                                                    {order.phoneNumber} <br/>
                                                    {order.email}

                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal fade" id="staticBackdrop3" tabIndex="-1"
                                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel" style={{color:'red'}}>Delete Order</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    Are you sure You want to delete this Order?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary"
                                                            data-bs-dismiss="modal">Close
                                                    </button>
                                                    <button type="button" className="btn btn-warning" style={{color:'red'}}
                                                            onClick={event => {
                                                                handleDeleteOrder(event,order.orderID)
                                                            }}
                                                            data-bs-dismiss="modal"
                                                    >Yes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </th>
                            <td>{order.firstName} {order.lastName}<br/>{order.email}</td>
                          {
                              orderItems[index]!==undefined &&
                              orderItems[index].map((item,index)=>(

                                  <tr>
                                      <td>
                                          <div className="card mb-3" style={{maxWidth: "300px"}}>
                                              <div className="row g-0">
                                                  <div className="col-md-4">
                                                      <img src={item.image} className="img-fluid rounded-start" alt="..."/>
                                                  </div>
                                                  <div className="col-md-8 items-detail" >
                                                      <div className="card-body" >
                                                          <h6 className="card-title">{item.productName}</h6>
                                                          <ul className="list-group list-group-flush">
                                                              <li className="list-group-item">ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{item.orderID}</li>
                                                              <li className="list-group-item">Qty&nbsp;&nbsp;&nbsp;:{item.itemQty}(left:{item.qty-item.itemQty})</li>
                                                              <li className="list-group-item">Sub Total&nbsp;:{(item.totalPrice/item.itemQty).toFixed(2)}x{item.itemQty}</li>
                                                          </ul>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>

                                      </td>

                                  </tr>

                                ))
                          }

                            <td><h5>${order.orderTotal}</h5>

                            </td>
                            <td>{order.orderDate}

                            </td>
                            <td>{order.orderStatus==='Shipped'

                                ?<p>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingInputDisabled"
                                               placeholder="name@example.com" value="Shipped" style={{color:'green'}} disabled/>
                                        <label htmlFor="floatingInputDisabled">Status</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingInputDisabled"
                                               placeholder="name@example.com" value={order.trackingID} disabled/>
                                        <label htmlFor="floatingInputDisabled">Tracking ID</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingInputDisabled"
                                               placeholder="name@example.com" value={order.deliveryCompany} disabled/>
                                        <label htmlFor="floatingInputDisabled">Delivery Company</label>
                                    </div>

                                </p>
                                :



                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInputDisabled"
                                           placeholder="name@example.com" value={order.orderStatus} style={{color:"red"}} disabled/>
                                    <label htmlFor="floatingInputDisabled">Status</label>
                                </div>




                            }</td>

                        </tr>

                    ))}

                    </tbody>
                </table>
            </div>

        </div>
    );


}

export default AllOrders;
