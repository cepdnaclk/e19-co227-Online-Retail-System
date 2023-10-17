/*
import React from "react";
import './SignUp.component.css'
import {systemService} from "../../services/systemService";
import {RegisterUserDTO} from "../../dto/RegisterUserDTO"
import SignUpSvg from "../../assets/Sign up-amico.png";


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
                        window.location.href = '/SignIn';

                    }

                })
                .catch(error => {
                    console.error('Error registering user:', error);
                    alert("Error Occured In registration!")
                });

        }else{
            if(this.state.password ==='' || this.state.rep_password==='' || this.state.email==='' ||  this.state.firstName==='' || this.state.phoneNumber==='' || this.state.addL1==='') {

                this.setState({ submittedMsg: "fill_require_fields" }, () => {

                });
            }else {
                if(this.state.password !== this.state.rep_password){
                    this.setState({ submittedMsg: "pwd_not_match" }, () => {

                    });
                }
                if(this.state.password>7){
                    this.setState({ submittedMsg: "pwd_not_enough" }, () => {

                    });
                }
                if(!isemailValid){
                    console.log("Email is not valid")
                    this.setState({ submittedMsg: "enter_valid_email" }, () => {

                    });
                }
            }





        }


    }



    render() {


        return(
            <div className="background-container  p-5">
                <div className="main-wrap col-12 col-md-6 center-opacity" style={{backgroundColor:"rgba(255, 255, 255, 0.8)",width:'500px'}}>
                    <div  style={{margin: 0}}>

                        {/!*<div className="col-12 col-md-6">
                            <p style={{ textAlign: "center" }} className="image-wrap">
                                <img src={SignUpSvg} alt="" />
                            </p>
                            <div className="text-create-account">
                                <a href="/">If You Have account? Sign In</a>
                            </div>
                        </div>*!/}
                        <div>
                            <p className="login-text">
                                Register
                            </p>

                            <br></br>


                            <form className="row g-3 needs-validation" novalidate>

                                <div className="row">
                                    <div className="form-floating mb-3 col-6">
                                        <input required minLength="4" type="text" className="form-control"
                                               id="floatingInput" placeholder="name@example.com"
                                               onChange={e => this.setState({firstName: e.target.value})}/>
                                        <label className="mx-2" htmlFor="floatingInput">First Name*</label>
                                    </div>
                                    <div className="form-floating mb-3 col-6">
                                        <input minLength="4" type="text" className="form-control"
                                               id="floatingInput" placeholder="name@example.com"
                                               onChange={e => this.setState({lastName: e.target.value})}/>
                                        <label className="mx-2" htmlFor="floatingInput">Last Name</label>
                                    </div>

                                </div>

                                <div className="form-floating mb-3">
                                    <input minLength="4" type="email" className="form-control"
                                           id="floatingInput" placeholder="name@example.com"
                                           onChange={e => this.setState({email: e.target.value})}/>
                                    <label className="mx-2"  htmlFor="floatingInput">Email*</label>
                                </div>
                                <div className="row">
                                    <div className="form-floating mb-3 col-6">
                                        <input required minLength="4" type="text" className="form-control"
                                               id="floatingInput" placeholder="name@example.com"
                                               onChange={e => this.setState({addL1: e.target.value})}/>
                                        <label className="mx-2"  htmlFor="floatingInput">Address Line 1*</label>
                                    </div>
                                    <div className="form-floating mb-3 col-6">
                                        <input minLength="4" type="text" className="form-control"
                                               id="floatingInput" placeholder="name@example.com"
                                               onChange={e => this.setState({addL2: e.target.value})}/>
                                        <label className="mx-2" htmlFor="floatingInput">Address Line 2</label>
                                    </div>
                                    <div className="form-floating mb-3 col-6">
                                        <input minLength="4" type="text" className="form-control"
                                               id="floatingInput" placeholder="name@example.com"
                                               onChange={e => this.setState({addL3: e.target.value})}/>
                                        <label className="mx-2" htmlFor="floatingInput">Address Line 3</label>
                                    </div>
                                    <div className="form-floating mb-3 col-6">
                                        <input required minLength="4" type="text" className="form-control"
                                               id="floatingInput" placeholder="name@example.com"
                                               onChange={e => this.setState({phoneNumber: e.target.value})}/>
                                        <label className="mx-2" htmlFor="floatingInput">Phone Number*</label>
                                    </div>

                                </div>


                                <div className="form-floating mb-3">
                                    <input minLength="8" type="password" className="form-control"
                                           id="floatingPassword" placeholder="Password"
                                           onChange={e=>this.setState({password:e.target.value})}/>
                                    <label className="mx-2"  htmlFor="floatingPassword">Password*</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input minLength="8" type="password" className="form-control"
                                           id="floatingPassword" placeholder="Password"
                                           onChange={e => this.setState({rep_password: e.target.value})}/>
                                    <label className="mx-2"  htmlFor="floatingPassword">Repeat Password*</label>
                                </div>

                            <br></br>

                            {this.state.submittedMsg === "pwd_not_match" && <div className="alert alert-danger" role="alert">Password Does Not Match !</div>}
                            {this.state.submittedMsg === "fill_require_fields" && <div className="alert alert-danger" role="alert">Please Fill Required Fields !</div>}
                            {this.state.submittedMsg === "register_success" && <div className="alert alert-success" role="alert">Registration Successful!</div>}
                            {this.state.submittedMsg === "exist" && <div className="alert alert-warning" role="alert">You Already Have Account !</div>}
                            {this.state.submittedMsg === "enter_valid_email" && <div className="alert alert-warning" role="alert">Enter Valid Email !</div>}
                            {this.state.submittedMsg === "pwd_not_enough" && <div className="alert alert-warning" role="alert">Password must contain at least 8 characters !</div>}
                            <p style={{textAlign: "right",margin:'2px'}}>
                                <div className="text-create-account">
                                    <a href="/">If You Have account? Sign In</a>
                                </div>
                                {this.state.loading ? (
                                        <button className="btn btn-primary reg-but" type="button">
                                                <span className="spinner-border spinner-border-sm" role="status"
                                                      aria-hidden="true"></span>
                                            Loading...
                                        </button>


                                    ):
                                    <button className="btn btn-warning reg-but" type="submit" onClick={this.handleSubmit}>Register</button>
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
*/

import React, { useState } from "react";
import './SignUp.component.css'
import { systemService } from "../../services/systemService";
import { RegisterUserDTO } from "../../dto/RegisterUserDTO";
import SignUpSvg from "../../assets/Sign up-amico.png";
import {useNavigate} from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        addL1: '',
        addL2: '',
        addL3: '',
        image: '',
        password: '',
        rep_password: '',
        submittedMsg: '',
        role: 'customer',
        loading: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate email
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zAZ0-9-]+)*$/;
        const isEmailValid = regex.test(formData.email);

        if (
            formData.password === formData.rep_password &&
            formData.password.length > 7 &&
            formData.email !== '' &&
            isEmailValid &&
            formData.firstName !== '' &&
            formData.phoneNumber !== '' &&
            formData.addL1 !== ''
        ) {
            const dto = new RegisterUserDTO(
                formData.email,
                formData.password,
                formData.firstName,
                formData.lastName,
                formData.phoneNumber,
                formData.addL1,
                formData.addL2,
                formData.addL3,
                formData.role
            );

            setFormData({ ...formData, loading: true });

            systemService
                .registerUser(dto)
                .then((response) => {
                    if (response.message === "Already Exist") {
                        setFormData({ ...formData, submittedMsg: "exist", loading: false });
                    } else {
                        console.log('User registered:', response);
                        setFormData({ ...formData, submittedMsg: "register_success", loading: false });
                        navigate("/SignIn", { replace: true });
                    }
                })
                .catch((error) => {
                    console.error('Error registering user:', error);
                    alert("Error Occurred In registration!");
                });
        } else {
            if (
                formData.password === '' ||
                formData.rep_password === '' ||
                formData.email === '' ||
                formData.firstName === '' ||
                formData.phoneNumber === '' ||
                formData.addL1 === ''
            ) {
                setFormData({ ...formData, submittedMsg: "fill_require_fields" });
            } else {
                if (formData.password !== formData.rep_password) {
                    setFormData({ ...formData, submittedMsg: "pwd_not_match" });
                }
                if (formData.password.length <= 7) {
                    setFormData({ ...formData, submittedMsg: "pwd_not_enough" });
                }
                if (!isEmailValid) {
                    setFormData({ ...formData, submittedMsg: "enter_valid_email" });
                }
            }
        }
    };

    return (
        <div className="background-container p-5">
            <div className="main-wrap col-12 col-md-6 center-opacity" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", width: '500px' }}>
                <div style={{ margin: 0 }}>
                    <div>
                        <p className="login-text">
                            REGISTER
                        </p>

                        <br></br>

                        <form className="row g-3 needs-validation" noValidate>
                            <div className="row">
                                <div className="form-floating mb-3 col-6">
                                    <input required minLength="4" type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                                    <label className="mx-2" htmlFor="floatingInput">First Name*</label>
                                </div>
                                <div className="form-floating mb-3 col-6">
                                    <input minLength="4" type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                                    <label className="mx-2" htmlFor="floatingInput">Last Name</label>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input minLength="4" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                <label className="mx-2" htmlFor="floatingInput">Email*</label>
                            </div>
                            <div className="row">
                                <div className="form-floating mb-3 col-6">
                                    <input required minLength="4" type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setFormData({ ...formData, addL1: e.target.value })} />
                                    <label className="mx-2" htmlFor="floatingInput">Address Line 1*</label>
                                </div>
                                <div className="form-floating mb-3 col-6">
                                    <input minLength="4" type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setFormData({ ...formData, addL2: e.target.value })} />
                                    <label className="mx-2" htmlFor="floatingInput">Address Line 2</label>
                                </div>
                                <div className="form-floating mb-3 col-6">
                                    <input minLength="4" type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setFormData({ ...formData, addL3: e.target.value })} />
                                    <label className="mx-2" htmlFor="floatingInput">Address Line 3</label>
                                </div>
                                <div className="form-floating mb-3 col-6">
                                    <input required minLength="4" type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                                    <label className="mx-2" htmlFor="floatingInput">Phone Number*</label>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input minLength="8" type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                <label className="mx-2" htmlFor="floatingPassword">Password*</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input minLength="8" type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setFormData({ ...formData, rep_password: e.target.value })} />
                                <label className="mx-2" htmlFor="floatingPassword">Repeat Password*</label>
                            </div>

                            <br></br>

                            {formData.submittedMsg === "pwd_not_match" && <div className="alert alert-danger" role="alert">Password Does Not Match !</div>}
                            {formData.submittedMsg === "fill_require_fields" && <div className="alert alert-danger" role="alert">Please Fill Required Fields !</div>}
                            {formData.submittedMsg === "register_success" && <div className="alert alert-success" role="alert">Registration Successful!</div>}
                            {formData.submittedMsg === "exist" && <div className="alert alert-warning" role="alert">You Already Have an Account !</div>}
                            {formData.submittedMsg === "enter_valid_email" && <div className="alert alert-warning" role="alert">Enter a Valid Email !</div>}
                            {formData.submittedMsg === "pwd_not_enough" && <div className="alert alert-warning" role="alert">Password must contain at least 8 characters !</div>}
                            <p style={{ textAlign: "right", margin: '2px' }}>
                                <div className="text-create-account">
                                    <a href="/SignIn">If You Have an account? Sign In</a>
                                </div>
                                {formData.loading ? (
                                    <button className="btn btn-primary reg-but" type="button">
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                ) : (
                                    <button className="btn btn-warning reg-but" type="submit" onClick={handleSubmit}>Register</button>
                                )}
                            </p>
                        </form>
                    </div>
                    {formData.loading && (
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%" }}></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SignUp;

