import React, {useState} from "react";
import './SignUp.component.css'
import {systemService} from "../../services/systemService";
import {RegisterUserDTO} from "../../dto/RegisterUserDTO"
import axios from "axios";

class SignUp extends React.Component{
    constructor() {
        super();
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            phoneNumber:'',
            addL1:'',
            addL2:'',
            addL3:'',
            image:'',
            password:'',
            rep_password:''
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }


    handleSubmit(event){
        event.preventDefault();
        if(this.state.password === this.state.rep_password) {
            const dto = new RegisterUserDTO(
                this.state.email,
                this.state.password,
                this.state.firstName,
                this.state.lastName,
                this.state.phoneNumber,
                this.state.addL1,
                this.state.addL2,
                this.state.addL3,
            );
            systemService.registerUser(dto)
                .then(response => {
                    if (response.message==="Already Exist"){
                        alert("You Already Have Account");
                    }else {
                        console.log('User registered:', response);
                        alert("Registration Successful!");
                    }

                })
                .catch(error => {
                    console.error('Error registering user:', error);
                    alert("Error Occured In registration!")
                });

        }else{
            alert("Password Does not match!");
        }


    }



    render() {


        return(
            <div className="container">
                <div className="main-wrap">
                    <div className="row" style={{margin: 0}}>

                        <div className="col-12 col-md-12">
                            <p className="login-text">
                                Register
                            </p>
                            <br></br>
                            <div className="item-wrap">
                                <div className="icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill-rule="evenodd"
                                              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                    </svg>
                                </div>
                                <input required minlength="4" type="text"
                                       class="text-input is-invalid" placeholder="First Name" onChange={e=>this.setState({firstName:e.target.value})}/>

                            </div>
                            <br></br>
                            <div className="item-wrap">
                                <div className="icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill-rule="evenodd"
                                              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                    </svg>
                                </div>
                                <input required minLength="4" type="text"
                                       className="text-input is-invalid" placeholder="Last Name"
                                       onChange={e => this.setState({lastName: e.target.value})}/>

                            </div>
                            <br></br>
                            <div className="item-wrap">
                                <div className="icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill-rule="evenodd"
                                              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                    </svg>
                                </div>
                                <input required minLength="4" type="text"
                                       className="text-input is-invalid" placeholder="Email"
                                       onChange={e => this.setState({email: e.target.value})}/>

                            </div>
                            <br></br>
                            <div className="item-wrap">
                                <div className="icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill-rule="evenodd"
                                              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                    </svg>
                                </div>
                                <input required minLength="4" type="text"
                                       className="text-input is-invalid" placeholder="Phone Number"
                                       onChange={e => this.setState({phoneNumber: e.target.value})}/>

                            </div>
                            <br></br>
                            <div className="item-wrap">
                                <div className="icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill-rule="evenodd"
                                              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                    </svg>
                                </div>
                                <input required minLength="4" type="text"
                                       className="text-input is-invalid" placeholder="Address Line 1"
                                       onChange={e => this.setState({addL1: e.target.value})}/>

                            </div>
                            <br></br>
                            <div className="item-wrap">
                                <div className="icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill-rule="evenodd"
                                              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                    </svg>
                                </div>
                                <input required minLength="4" type="text"
                                       className="text-input is-invalid" placeholder="Address Line 2"
                                       onChange={e => this.setState({addL2: e.target.value})}/>

                            </div>
                            <br></br>
                            <div className="item-wrap">
                                <div className="icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill-rule="evenodd"
                                              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                    </svg>
                                </div>
                                <input required minLength="4" type="text"
                                       className="text-input is-invalid" placeholder="Addrerss Line 3"
                                       onChange={e => this.setState({addL3: e.target.value})}/>

                            </div>
                            <br></br>

                            <div className="item-wrap">
                                <div className="icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-unlock-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
                                    </svg>
                                </div>
                                <input required minlength="4" type="password"
                                       class="text-input" placeholder="Password" onChange={e=>this.setState({password:e.target.value})}/>
                            </div>
                            <div className="item-wrap">
                                <div className="icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-unlock-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
                                    </svg>
                                </div>
                                <input required minLength="4" type="password"
                                       className="text-input" placeholder="Repeat Password"
                                       onChange={e => this.setState({rep_password: e.target.value})}/>
                            </div>

                            <br></br>
                            <div className="text-create-account">
                                <a href="/">If You Have account? Sign In</a>
                            </div>
                            <p style={{textAlign: "right"}}>
                                <button className="btn btn-primary" color="primary" onClick={this.handleSubmit}>Register</button>
                            </p>

                        </div>
                    </div>
                </div>
            </div>


        );
    }

}

export default SignUp;
