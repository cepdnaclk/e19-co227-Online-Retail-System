import React, { useEffect, useState } from "react";
import "./UserDetails.component.css";
import { systemService } from "../../services/systemService";
import { manageAccount } from "../../services/manage-account.service";
import {UpdateUserDTO} from "../../dto/UpdateUserDTO";
import { useNavigate } from "react-router-dom";




function UserDetails() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        addressL1: "",
        addressL2: "",
        addressL3: "",
    });

    const [shopName, setShopName] = useState("");

    const [isEditing, setIsEditing] = useState(false); // State to control editing mode

    useEffect(() => {
        getCustomer(manageAccount.getCustomerID());
    }, []);

    const getCustomer = (id) => {
        systemService
            .getCustomerDetails(id)
            .then((response) => {
                // Populate the form data with the fetched user details
                setFormData(response[0]);
                console.log(response)
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleEditClick = () => {
        if(isEditing===true){
            const dto = new UpdateUserDTO(
                formData.firstName,
                formData.lastName,
                formData.phoneNumber,
                formData.addressL1,
                formData.addressL2,
                formData.addressL3
            )
            console.log(dto)
            systemService.updateCustomerDetails(dto,manageAccount.getCustomerID()).then(response=>{
                alert("Customer Updated!")
                console.log(response)
                setIsEditing(!isEditing);

            }).catch(e=>{
                alert("Error occured when Customer updating!")
                console.log(e)
            })

        }else {
            setIsEditing(!isEditing);
        }



    };

    const handleSetAsSeller=()=>{
        if(window.confirm("Are You Sure You want to be a seller!")){
            const customerId = manageAccount.getCustomerID()
            systemService.setAsSeller(shopName,customerId)
                .then((res) => {
                    if(res.message==='success'){

                        console.log("Successfully set as seller");
                        manageAccount.logOut()
                        navigate("/SignIn");

                    }else {
                        alert("Something went wrong!")
                    }


                })
                .catch((error) => {

                    console.error("Error setting as seller: " + error.message);
                });

        }
    }

    const renderFormFields = () => {
        return (
            <div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <label className="labels">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({ ...formData, firstName: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="labels">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({ ...formData, lastName: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <label className="labels">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="labels">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, phoneNumber: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <label className="labels">Address Line 1</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address Line 1"
                            value={formData.addressL1}
                            onChange={(e) =>
                                setFormData({ ...formData, addressL1: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="labels">Address Line 2</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address Line 2"
                            value={formData.addressL2}
                            onChange={(e) =>
                                setFormData({ ...formData, addressL2: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <label className="labels">Address Line 3</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address Line 3"
                            value={formData.addressL3}
                            onChange={(e) =>
                                setFormData({ ...formData, addressL3: e.target.value })
                            }
                        />
                    </div>
                    {/* Add more fields as needed */}
                </div>
            </div>
        );
    };

    return (
        <div className="container rounded bg-white mt-5 mb-5 " >
            <div className="row ml-5 pl-5 align-center" style={{ paddingTop: '200px' }} >
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img
                            className="rounded-circle mt-5"
                            width="150px"
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                            alt="User"
                        />
                        <span className="font-weight-bold">{formData.firstName}</span>
                        <span className="text-black-50">{formData.email}</span>
                        <span> </span>
                    </div>

                </div>
                <div className="col-md-5 ml-5">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        {isEditing ? renderFormFields() : (
                            <div>
                                <div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">First Name</label>
                                            <input disabled
                                                type="text"
                                                className="form-control"
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, firstName: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Last Name</label>
                                            <input disabled
                                                type="text"
                                                className="form-control"
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, lastName: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">Email</label>
                                            <input disabled
                                                type="text"
                                                className="form-control"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, email: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Phone Number</label>
                                            <input disabled
                                                type="text"
                                                className="form-control"
                                                placeholder="Phone Number"
                                                value={formData.phoneNumber}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, phoneNumber: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">Address Line 1</label>
                                            <input disabled
                                                type="text"
                                                className="form-control"
                                                placeholder="Address Line 1"
                                                value={formData.addressL1}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, addressL1: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Address Line 2</label>
                                            <input disabled
                                                type="text"
                                                className="form-control"
                                                placeholder="Address Line 2"
                                                value={formData.addressL2}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, addressL2: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">Address Line 3</label>
                                            <input disabled
                                                type="text"
                                                className="form-control"
                                                placeholder="Address Line 3"
                                                value={formData.addressL3}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, addressL3: e.target.value })
                                                }
                                            />
                                        </div>
                                        {/* Add more fields as needed */}
                                    </div>
                                </div>
                            </div>
                        )}
                        <button className="btn btn-warning" onClick={handleEditClick} style={{backgroundColor:'#eacd2c', color:'black', border:'none'}}>
                            {isEditing ? "Save" : "Edit"}
                        </button>

                        {manageAccount.getSellerID()===-1 ?
                            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{backgroundColor:'#ffa41c', color:'black', border:'none'}} >
                                Make Me a Seller
                            </button>
                            :
                            <button className="btn btn-warning" disabled onClick={handleSetAsSeller} style={{backgroundColor:'#eacd2c', color:'black', border:'none'}}>
                                You are a Seller
                            </button>
                        }
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">Add Shop Details</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div>
                                            <label className="labels">Shop Name</label>
                                            <input
                                                   type="text"
                                                   className="form-control"
                                                   placeholder="shop Name"
                                                   onChange={(e) =>
                                                       setShopName( e.target.value )
                                                   }
                                            />
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-warning" onClick={handleSetAsSeller} data-bs-dismiss="modal">Create Shop</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
