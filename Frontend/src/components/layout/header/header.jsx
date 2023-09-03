import React from "react";
import {manageAccount} from "../../../services/manage-account.service";
import {Link} from "react-router-dom";

class Header extends React.Component{

    constructor() {
        super();
    }

    render() {
        return(

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex">
                        <li className="nav-item active">
                            <Link className="nav-link" to='/Home'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#">Products</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/dashboard'>Seller Dashboard</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/#">Action</a>
                                <a className="dropdown-item" href="/#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/#">Something else here</a>
                            </div>
                        </li>

                    <li>
                    <form className="form-inline my-2 my-lg-0 m-lg-auto">

                       <div className="d-flex">
                           <input className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search"/>
                           <button className="btn btn-outline-success my-2 mx-1 my-sm-0" type="submit">Search</button>
                       </div>
                    </form>
                    </li>
                    </ul>
                    <div className="nav-item ms-auto mx-5">
                        <a className="nav-link" onClick={manageAccount.logOut} href="/">Log Out</a>
                    </div>

                </div>
            </nav>

        );
    }

}

export default Header;
