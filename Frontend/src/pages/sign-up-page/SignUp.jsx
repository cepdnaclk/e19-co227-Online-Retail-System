import React from "react";
import './SignUp.component.css'
import {systemService} from "../../services/systemService";
import {RegisterUserDTO} from "../../dto/RegisterUserDTO"


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
            rep_password:'',
            submittedMsg:'',
            role:'customer',
            loading:false
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }


    handleSubmit(event){
        //validate email
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let isemailValid = regex.test(this.state.email);

        event.preventDefault();
        if(this.state.password === this.state.rep_password && this.state.password.length>7 && this.state.email!=='' && isemailValid && this.state.firstName!=='' && this.state.phoneNumber!=='' && this.state.addL1!=='') {
            const dto = new RegisterUserDTO(
                this.state.email,
                this.state.password,
                this.state.firstName,
                this.state.lastName,
                this.state.phoneNumber,
                this.state.addL1,
                this.state.addL2,
                this.state.addL3,
                this.state.role
            );
            this.setState({ loading: true }, () => {
                this.forceUpdate(); // Force a re-render
            });
            systemService.registerUser(dto)
                .then(response => {
                    if (response.message==="Already Exist"){
                        this.setState({ submittedMsg: "exist",loading:false }, () => {
                            this.forceUpdate(); // Force a re-render
                        });
                    }else {
                        console.log('User registered:', response);
                        this.setState({ submittedMsg: "register_success",loading:false }, () => {
                            this.forceUpdate(); // Force a re-render
                        });
                        window.location.href = '/';

                    }

                })
                .catch(error => {
                    console.error('Error registering user:', error);
                    alert("Error Occured In registration!")
                });

        }else{
            if(this.state.password !== this.state.rep_password){
                this.setState({ submittedMsg: "pwd_not_match" }, () => {
                    this.forceUpdate(); // Force a re-render
                });
            }else if(this.state.password>7){
                this.setState({ submittedMsg: "pwd_not_enough" }, () => {
                    this.forceUpdate(); // Force a re-render
                });
            }else if(!isemailValid){
                this.setState({ submittedMsg: "enter_valid_email" }, () => {
                    this.forceUpdate(); // Force a re-render
                });
            }
            else {
                this.setState({ submittedMsg: "fill_require_fields" }, () => {
                    this.forceUpdate(); // Force a re-render
                });
            }


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

                            <form className="row g-3 needs-validation" novalidate>
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
                                       class="text-input is-invalid" placeholder="First Name*" onChange={e=>this.setState({firstName:e.target.value})}/>

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
                                <input minLength="4" type="text"
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
                                       className="text-input is-invalid" placeholder="Email*"
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
                                       className="text-input is-invalid" placeholder="Phone Number*"
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
                                       className="text-input is-invalid" placeholder="Address Line 1*"
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
                                       class="text-input" placeholder="Password*" onChange={e=>this.setState({password:e.target.value})}/>
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
                                       className="text-input" placeholder="Repeat Password*"
                                       onChange={e => this.setState({rep_password: e.target.value})}/>
                            </div>

                            <br></br>
                            <div className="text-create-account">
                                <a href="/">If You Have account? Sign In</a>
                            </div>
                            {this.state.submittedMsg === "pwd_not_match" && <div className="alert alert-danger" role="alert">Password Does Not Match !</div>}
                            {this.state.submittedMsg === "fill_require_fields" && <div className="alert alert-danger" role="alert">Please Fill Required Fields !</div>}
                            {this.state.submittedMsg === "register_success" && <div className="alert alert-success" role="alert">Registration Successful!</div>}
                            {this.state.submittedMsg === "exist" && <div className="alert alert-warning" role="alert">You Already Have Account !</div>}
                            {this.state.submittedMsg === "enter_valid_email" && <div className="alert alert-warning" role="alert">Enter Valid Email !</div>}
                            {this.state.submittedMsg === "pwd_not_enough" && <div className="alert alert-warning" role="alert">Password must contain at least 8 characters !</div>}
                            <p style={{textAlign: "right",margin:'2px'}}>
                                {this.state.loading ? (
                                        <button className="btn btn-primary" type="button">
                                                <span className="spinner-border spinner-border-sm" role="status"
                                                      aria-hidden="true"></span>
                                            Loading...
                                        </button>


                                    ):
                                    <button className="btn btn-primary" type="submit" color="primary" onClick={this.handleSubmit}>Register</button>
                                }


                            </p>


                            </form>
                        </div>
                        {this.state.loading && (
                            <div className="progress">
                                <div
                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    aria-valuenow="100"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{ width: "100%" }}
                                ></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>


        );
    }

}

export default SignUp;
