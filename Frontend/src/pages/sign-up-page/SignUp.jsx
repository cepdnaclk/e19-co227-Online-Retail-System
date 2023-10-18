
import React, { useState } from "react";
import './SignUp.component.css'
import { systemService } from "../../services/systemService";
import { RegisterUserDTO } from "../../dto/RegisterUserDTO";
import SignUpSvg from "../../assets/Sign up-amico.png";
import {useNavigate} from "react-router-dom";
import {manageAccount} from "../../services/manage-account.service";

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
                        manageAccount.logOut()
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
                if (!isEmailValid) {
                    setFormData({ ...formData, submittedMsg: "enter_valid_email" });
                }
                if (formData.password !== formData.rep_password) {
                    setFormData({ ...formData, submittedMsg: "pwd_not_match" });
                }
                if (formData.password.length <= 7) {
                    setFormData({ ...formData, submittedMsg: "pwd_not_enough" });
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

