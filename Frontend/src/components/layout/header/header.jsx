import React from "react";
import {manageAccount} from "../../../services/manage-account.service";
import {Link, NavLink, Outlet} from "react-router-dom";

class Header extends React.Component{

    constructor() {
        super();
    }

    render() {

        
        return( 
            <>
              {/* Topbar Start */}
  <div className="container-fluid">
    <div className="row bg-secondary py-1 px-xl-5">
      <div className="col-lg-6 d-none d-lg-block">
        <div className="d-inline-flex align-items-center h-100">
          <a className="text-body mr-3" href="">
            About
          </a>
          <a className="text-body mr-3" href="">
            Contact
          </a>
          <a className="text-body mr-3" href="">
            Help
          </a>
          <a className="text-body mr-3" href="">
            FAQs
          </a>
        </div>
      </div>
      <div className="col-lg-6 text-center text-lg-right">
        <div className="d-inline-flex align-items-center">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm btn-light dropdown-toggle"
              data-toggle="dropdown"
            >
              My Account
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <button className="dropdown-item" type="button">
                Sign in
              </button>
              <button className="dropdown-item" type="button">
                Sign up
              </button>
            </div>
          </div>
          <div className="btn-group mx-2">
            <button
              type="button"
              className="btn btn-sm btn-light dropdown-toggle"
              data-toggle="dropdown"
            >
              USD
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <button className="dropdown-item" type="button">
                EUR
              </button>
              <button className="dropdown-item" type="button">
                GBP
              </button>
              <button className="dropdown-item" type="button">
                CAD
              </button>
            </div>
          </div>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm btn-light dropdown-toggle"
              data-toggle="dropdown"
            >
              EN
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <button className="dropdown-item" type="button">
                FR
              </button>
              <button className="dropdown-item" type="button">
                AR
              </button>
              <button className="dropdown-item" type="button">
                RU
              </button>
            </div>
          </div>
        </div>
        <div className="d-inline-flex align-items-center d-block d-lg-none">
          <a href="" className="btn px-0 ml-2">
            <i className="fas fa-heart text-dark" />
            <span
              className="badge text-dark border border-dark rounded-circle"
              style={{ paddingBottom: 2 }}
            >
              0
            </span>
          </a>
          <a href="" className="btn px-0 ml-2">
            <i className="fas fa-shopping-cart text-dark" />
            <span
              className="badge text-dark border border-dark rounded-circle"
              style={{ paddingBottom: 2 }}
            >
              0
            </span>
          </a>
        </div>
      </div>
    </div>
    <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
      <div className="col-lg-4">
        <a href="" className="text-decoration-none">
          <span className="h1 text-uppercase text-primary bg-dark px-2">
            Multi
          </span>
          <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
            Shop
          </span>
        </a>
      </div>
      <div className="col-lg-4 col-6 text-left">
        <form action="">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for products"
            />
            <div className="input-group-append">
              <span className="input-group-text bg-transparent text-primary">
                <i className="fa fa-search" />
              </span>
            </div>
          </div>
        </form>
      </div>
      <div className="col-lg-4 col-6 text-right">
        <p className="m-0">Customer Service</p>
        <h5 className="m-0">+012 345 6789</h5>
      </div>
    </div>
  </div>
  {/* Topbar End */}

              {/* Navbar Start */}
  <div className="container-fluid bg-dark mb-30">
    <div className="row px-xl-5">
      <div className="col-lg-3 d-none d-lg-block">
        <a
          className="btn d-flex align-items-center justify-content-between bg-primary w-100"
          data-bs-toggle="collapse"
          href="#navbar-vertical"
          style={{ height: 65, padding: "0 30px" }}
        >
          <h6 className="text-dark m-0">
            <i className="fa fa-bars mr-2" />
            Categories
          </h6>
          <i className="fa fa-angle-down text-dark" />
        </a>
        <nav
          className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
          id="navbar-vertical"
          style={{ width: "calc(100% - 30px)", zIndex: 999 }}
        >
          <div className="navbar-nav w-100">
            <div className="nav-item dropdown dropright ">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                role="button" data-bs-toggle="dropdown" aria-expanded="false"
               
                
                
              >
                Dresses <i className="fa fa-angle-right float-right mt-1" />
              </a>
              <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                <a href="" className="dropdown-item">
                  Men's Dresses
                </a>
                <a href="" className="dropdown-item">
                  Women's Dresses
                </a>
                <a href="" className="dropdown-item">
                  Baby's Dresses
                </a>
              </div>
            </div>
            <a href="" className="nav-item nav-link">
              Shirts
            </a>
            <a href="" className="nav-item nav-link">
              Jeans
            </a>
            <a href="" className="nav-item nav-link">
              Swimwear
            </a>
            <a href="" className="nav-item nav-link">
              Sleepwear
            </a>
            <a href="" className="nav-item nav-link">
              Sportswear
            </a>
            <a href="" className="nav-item nav-link">
              Jumpsuits
            </a>
            <a href="" className="nav-item nav-link">
              Blazers
            </a>
            <a href="" className="nav-item nav-link">
              Jackets
            </a>
            <a href="" className="nav-item nav-link">
              Shoes
            </a>
          </div>
        </nav>
      </div>
      <div className="col-lg-9">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
          <a href="" className="text-decoration-none d-block d-lg-none">
            <span className="h1 text-uppercase text-dark bg-light px-2">
              Multi
            </span>
            <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
              Shop
            </span>
          </a>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div className="navbar-nav mr-auto py-0">
              <a href="/" className="nav-item nav-link">
                Home
              </a>
              <a href="/products" className="nav-item nav-link">
                Shop
              </a>
              <a href="" className="nav-item nav-link active">
                Shop Detail
              </a>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Pages <i className="fa fa-angle-down mt-1" />
                </a>
                <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                  <a href="" className="dropdown-item">
                    Shopping Cart
                  </a>
                  <a href="" className="dropdown-item">
                    Checkout
                  </a>
                </div>
              </div>
              <a href="" className="nav-item nav-link">
                Contact
              </a>
            </div>
            <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
              <a href="" className="btn px-0">
                <i className="fas fa-heart text-primary" />
                <span
                  className="badge text-secondary border border-secondary rounded-circle"
                  style={{ paddingBottom: 2 }}
                >
                  0
                </span>
              </a>
              <a href="" className="btn px-0 ml-3">
                <i className="fas fa-shopping-cart text-primary" />
                <span
                  className="badge text-secondary border border-secondary rounded-circle"
                  style={{ paddingBottom: 2 }}
                >
                  0
                </span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
  {/* Navbar End */}

            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <a className="navbar-brand text-white" href="/#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex">
                        <li className="nav-item active ">
                            <NavLink to="/" className="nav-link text-white">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="products" className="nav-link text-white">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='dashboard' className="nav-link text-white" >Seller Dashboard</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="/#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item text-white" href="/#">Action</a>
                                <a className="dropdown-item text-white" href="/#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item text-white" href="/#">Something else here</a>
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
                        <a className="nav-link" onClick={manageAccount.logOut} href="SignIn">Log Out</a>
                    </div>

                </div>
            </nav>

            <Outlet />
            </>

        );
    }

}

export default Header;
