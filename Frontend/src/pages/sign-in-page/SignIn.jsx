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
import { useHistory } from 'react-router-dom';


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

        if (!manageAccount || !manageAccount.isLoggedIn) {

            return false;
        }


        const isLoggedIn = await manageAccount.isLoggedIn();


        if (isLoggedIn) {
            navigate('/');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.email !== '' && formData.password !== '') {
            systemService.loginUser(formData.email, formData.password)
                .then(response => {
                    if (response.message === 'success') {
                        if (response.isSeller === true) {

                            systemService.getSeller(response.customerID).then((resp) => {

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
                        if(location.state && location.state.from === '/SignUp'){
                            navigate('/');
                        }

                        navigate('/');
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


