import React, { useState, useEffect } from "react";
import './SignIn.component.css'
import { systemService } from "../../services/systemService";
import Cookies from 'js-cookie';
import { manageAccount } from "../../services/manage-account.service";
import { useNavigate } from 'react-router-dom';
import LoginSvg from '../../assets/Login-amico.png';
import {useContext} from "react";
import {HeaderContext} from "../../contexts/HeaderContext";
import {useLocation} from "react-router";



function SignIn() {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const {trigger,setTrigger} = useContext(HeaderContext)
    const [submittedMsg, setSubmittedMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        isLoggedIn();
    }, []);

    const isLoggedIn = async () => {
        if (await manageAccount.isLoggedIn() === true) {
            navigate(-1);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.email !== '' && formData.password !== '') {
            systemService.loginUser(formData.email, formData.password)
                .then(response => {
                    if (response.message === 'success') {
                        if (response.isSeller === true) {
                            console.log('abjectness:', response.customerID);
                            systemService.getSeller(response.customerID).then((resp) => {
                                console.log('sellerID:', resp.sellerID);
                                Cookies.set('sellerID', resp.sellerID, { expires: 1 });
                                Cookies.set('shopName', resp.shopName, { expires: 1 });


                            }).catch((error) => {
                                console.error('Error getting seller Data:', error);
                            });
                        }
                        Cookies.set('name', response.customerName, { expires: 1 });
                        Cookies.set('customerID', response.customerID, { expires: 1 });
                        Cookies.set('jwt', response.token, { expires: 1 });
                        console.log("Logged In");
                        setTrigger(true)

                        setLoading(true);

                        navigate(-1);
                    } else {
                        setSubmittedMsg("Login Failed");
                    }
                })
                .catch(error => {
                    console.error('Error login:', error);
                    alert("Error Occurred In Login!");
                });
        } else {
            setSubmittedMsg("email_pwd_missing");
        }
    }

    const handleRememberMeChange = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            rememberMe: !prevFormData.rememberMe,
        }));
    };

    return (

        <div className="background-container  p-5">
            <div className="main-wrap col-12 col-md-6 center-opacity" style={{backgroundColor:"rgba(255, 255, 255, 0.8)",width:'500px'}}>
                <div  style={{ margin: 0 }}>
                    {/*<div className="col-12 col-md-6">
                        <p style={{ textAlign: "center" }} className="image-wrap">
                            <img src={LoginSvg} alt="" />
                        </p>

                    </div>*/}
                    <div>
                        <p className="login-text">
                            LOGIN
                        </p>
                        {submittedMsg === "Login Failed" && <div className="alert alert-danger" role="alert">Login Failed Please Try Again!</div>}
                        {submittedMsg === "email_pwd_missing" && <div className="alert alert-danger" role="alert">Email Or Password is Missing!</div>}
                        <br></br>

                        <form className="row g-3 needs-validation" noValidate>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <br></br>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleRememberMeChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Remember Me
                                </label>
                                <div className="text-create-account">
                                    <a href="/SignUp">Create an Account</a>
                                </div>
                            </div>
                            <br></br>
                            <div className='submit-bt'>
                                {loading ? (
                                    <button className="btn btn-primary" type="button">
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                ) : (
                                    <button className="btn btn-warning" type="submit" color="primary" onClick={handleSubmit}>Let's Go</button>
                                )}
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;



/*
import React, {useState} from "react";
import './SignIn.component.css'
import {systemService} from "../../services/systemService";
import Cookies from 'js-cookie';
import {manageAccount} from "../../services/manage-account.service";
import {useNavigate} from 'react-router-dom';
import LoginSvg from '../../assets/Login-amico.png'



class SignIn extends React.Component{
    navigate = useNavigate()

    constructor() {
        super();

        this.state = {
            email:'',
            password:'',
            rememberMe:false,
            submittedMsg:'',
            isSeller:false,
            loading:false
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        //If user is already logged in they direct to home page

    }

    componentDidMount() {
        this.isLoggedIn()
    }

    isLoggedIn= async () => {
        if (await manageAccount.isLoggedIn()===true) {
            this.navigate(-1)
            //window.location.href = '/'
        }
    }

    handleSubmit(event){
        

        if(this.state.email!=='' && this.state.password!==''){
            systemService.loginUser(this.state.email,this.state.password)
                .then(response => {
                    if(response.message==='success'){

                        if(response.isSeller===true){
                            console.log('abjectness:',response.customerID);
                            systemService.getSeller(response.customerID).then((resp)=>{
                                console.log('sellerID:',resp.sellerID);
                                Cookies.set('sellerID', resp.sellerID, { expires: 1 });
                                Cookies.set('shopName', resp.shopName, { expires: 1 });

                            }).catch((error)=>{
                                console.error('Error getting seller Data:', error);
                            })
                        }
                        Cookies.set('name', response.customerName, { expires: 1 });
                        Cookies.set('customerID',response.customerID,{expires:1});
                        Cookies.set('jwt', response.token, { expires: 1 });
                        console.log("Logged In");
                        this.setState({ loading: true }, () => {
                            this.forceUpdate(); // Force a re-render
                        });


                        this.navigate(-1)
                        //window.location.href = '/';
                    }else {

                        this.setState({ submittedMsg: "Login Failed" }, () => {
                            this.forceUpdate(); // Force a re-render
                        });
                    };

                })
                .catch(error => {
                    console.error('Error login:', error);
                    alert("Error Occured In Login!")
                });
        }else {
            this.setState({ submittedMsg: "email_pwd_missing" }, () => {
                this.forceUpdate(); // Force a re-render
            });
        }


    }

    handleRememberMeChange= ()=>{
        this.setState(prevState => ({
            rememberMe: !prevState.rememberMe

        }));
    };

    render() {


        return(
            <div className="container">
                <div className="main-wrap">
                    <div className="row" style={{margin: 0}}>
                        <div className="col-12 col-md-6">
                            <p style={{textAlign: "center"}} className="image-wrap">
                                <img src={LoginSvg}  alt=""/>

                            </p>
                            <div className="text-create-account">

                                    <a href="/SignUp">Create an Account</a>


                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <p className="login-text">
                                Login
                            </p>
                            {this.state.submittedMsg === "Login Failed" && <div className="alert alert-danger" role="alert">Login Failed Please Try Again!</div>}
                            {this.state.submittedMsg === "email_pwd_missing" && <div className="alert alert-danger" role="alert">Email Or Password is Missing!</div>}

                            <br></br>

                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput"
                                       placeholder="name@example.com" onChange={e=>this.setState({email:e.target.value})}/>
                                <label htmlFor="floatingInput">Email address</label>
                            </div>

                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword"
                                       placeholder="Password" onChange={e=>this.setState({password:e.target.value})}/>
                                    <label htmlFor="floatingPassword">Password</label>
                            </div>
                                {/!*<div className="item-wrap d-flex">
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
                                     class="text-input is-invalid" placeholder="User Name" onChange={e=>this.setState({email:e.target.value})}/>





                                </div>
                                <br></br>*!/}

                                   {/!* <div className="item-wrap">
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
                                    <br></br>*!/}
                                        <br></br>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={this.handleRememberMeChange}/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Remember Me
                                                </label>
                                        </div>


                                        <br></br>
                            <div className='submit-bt'>
                                            {this.state.loading ? (
                                                    <button className="btn btn-primary" type="button">
                                                <span className="spinner-border spinner-border-sm" role="status"
                                                      aria-hidden="true"></span>
                                                        Loading...
                                                    </button>


                                            ):
                                                <button className="btn btn-primary" color="primary" onClick={this.handleSubmit}>Let's Go</button>
                                            }

                            </div>
                                </div>

                            </div>
                        </div>
                    </div>


        );
    }

}

export default SignIn;
*/
