import React, {useEffect, useState} from "react";
import {manageAccount} from "../../../services/manage-account.service";
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import { useManageCart } from "../../../services/useManageCart";
import CartSize from "../../CartSize";
import {useContext} from "react";
import {HeaderContext} from "../../../contexts/HeaderContext";
import '../../../css/style.css'
import './header.component.css'
import '../themeColor.css'

const Header = () => {
  const navigate = useNavigate();
  const [isSeller,setIsSeller] = useState(false)
  const [isLogged,setIsLogged] = useState(false)
  const {trigger,setTrigger} = useContext(HeaderContext)

  useEffect(() => {
    checkisLogged();
    checkSeller();


    return () => {
      console.log('Component unmounted');

    };
  }, [trigger]);


  const checkSeller=()=>{
    console.log('sellerID header',manageAccount.getSellerID())
    if(manageAccount.getSellerID()!==-1){
      setIsSeller(true);

    }
  }

  const checkisLogged= async () => {

    try {
      const isLogged = await manageAccount.isLoggedIn();
      console.log(isLogged)
      if (isLogged) {
        setIsLogged(true)
        console.log("Logged In")
      } else {
        // User is not logged in
      }
    } catch (error) {
      // Handle errors here
    }


  }
        
        return( 
            <>
              {/* Topbar Start */}
  <div className="container-fluid contentfixed" >
    <div className="row bg-light py-1 px-xl-5">
      <div className="col-lg-6 d-none d-lg-block">
       
      </div>
      <div className="col-lg-6 text-right text-lg-right">

        <div className="d-inline-flex align-items-center d-block d-lg-none">
          <div className="dropdown ml-3">
            <a className="btn px-4 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-user text-dark" />
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {isLogged === false ? (
                  <li key="signin">

                    <Link to="/SignIn" className="text-decoration-none text-dark dropdown-item">Sign in</Link>

                  </li>
              ) : (
                  <>
                    <li key="greeting"><a className="dropdown-item" style={{borderBottom:"1px solid black"}}>Hi! {manageAccount.getCustomerName()}</a></li>
                    <li> <Link to={'/my-orders'} className="text-decoration-none dropdown-item">My Orders</Link></li>
                    {isSeller && (
                        <li key="mystore">
                          <Link to="dashboard" className="text-decoration-none dropdown-item">My Store</Link>
                        </li>
                    )}
                    <li key="myprofile"><Link to="user" className="text-decoration-none dropdown-item">My Profile</Link></li>
                    <li key="logout">
                      <button
                          className="dropdown-item"
                          type="button"
                          onClick={() => {
                            manageAccount.logOut();
                            setIsLogged(false);
                            setIsSeller(false);
                            setTrigger(true);
                            navigate("/");
                          }}
                      >
                        Log Out
                      </button>
                    </li>
                  </>
              )}
            </ul>
          </div>
          <Link to = { `cart/${manageAccount.getCustomerID()}` } className="btn px-0 ml-2">
            <i className="fas fa-shopping-cart text-dark" />
            <span
              className="badge text-dark border border-dark rounded-circle"
              style={{ paddingBottom: 2 }}
            >
              <CartSize />
            </span>
          </Link>
        </div>
      </div>
    </div>
    <div className="row align-items-center bg-light py-2 px-xl-5 d-none d-lg-flex">
      <div className="col-lg-4">
        <a href="/" className="text-decoration-none">
          <span className="h1 text-uppercase text-white bg-dark px-2 font-style">
            Gadget
          </span>
          <span className="h1 text-uppercase text-dark  px-2 ml-n1">
          𝓦𝓪𝓿𝓮
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
            <div className="input-group-append text-success">
              <span className="input-group-text bg-transparent ">
                <i className="fa fa-search custom-text-warning" />
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
  <div className="container-fluid background-color contentfixed-2 " >
    <div className="row px-xl-5">
      <div className="col-lg-3 d-none d-lg-block background-color2 pt-0 mb-1" >
        <a
          className="btn d-flex align-items-center m-0 justify-content-between w-100 "
          data-bs-toggle="collapse"
          href="#navbar-vertical"
          style={{ height: '70px', padding: "0 30px",outline: "none" }}
        >
          <h5 className="text-dark m-0">
            <i className="fa fa-bars mr-2" />
            Categories
          </h5>
          <i className="fa fa-angle-down text-dark" />
        </a>
        <nav
          className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light background-color2"
          id="navbar-vertical"
          style={{ width: "calc(100% - 30px)", zIndex: 999 ,top: '70px', left: '10px'}}
        >

          <div className="navbar-nav w-100 ">
            {/**/}
              <div className="nav-item dropdown dropright ">
                      <a
                        href="#"
                        className="nav-link "
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Electronics <i className="fa fa-angle-right float-right mt-1" />
                      </a>
                      <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top:'0px' }}>
                        <a href="/category/1/subcategory/1" className="dropdown-item">
                          Smartphones
                        </a>
                        <a href="/category/1/subcategory/2" className="dropdown-item">
                          Laptops and Computers
                        </a>
                        <a href="/category/1/subcategory/3" className="dropdown-item">
                          Audio and Headphones
                        </a>
                        <a href="/category/1/subcategory/4" className="dropdown-item">
                          Cameras and Photography
                        </a>
                        <a href="/category/1/subcategory/5" className="dropdown-item">
                          Home Appliances
                        </a>
                      </div>
              </div>
        {/**/}
              <div className="nav-item dropdown dropright">
                    <a
                      href="#"
                      className="nav-link"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Fashion <i className="fa fa-angle-right float-right mt-1" />
                    </a>
                    <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top: '0px' }}>
                      <a href="/category/2/subcategory/6" className="dropdown-item">
                        Men's Clothing
                      </a>
                      <a href="/category/2/subcategory/7" className="dropdown-item">
                        Women's Clothing
                      </a>
                      <a href="/category/2/subcategory/8" className="dropdown-item">
                        Shoes
                      </a>
                      <a href="/category/2/subcategory/9" className="dropdown-item">
                        Accessories
                      </a>
                    </div>
                  </div>
          {/* */}
          <div className="nav-item dropdown dropright">
                  <a
                    href="#"
                    className="nav-link"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Home and Furniture <i className="fa fa-angle-right float-right mt-1" />
                  </a>
                  <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top:'0px' }}>
                    <a href="/category/3/subcategory/15" className="dropdown-item">
                      Living Room Furniture
                    </a>
                    <a href="/category/3/subcategory/16" className="dropdown-item">
                      Bedroom Furniture
                    </a>
                    <a href="/category/3/subcategory/17" className="dropdown-item">
                      Kitchen and Dining
                    </a>
                    <a href="/category/3/subcategory/18" className="dropdown-item">
                      Home Decor
                    </a>
                    <a href="/category/3/subcategory/19" className="dropdown-item">
                      Bedding and Bath
                    </a>
                  </div>
                </div>
        {/* */}
        <div className="nav-item dropdown dropright">
                <a
                  href="#"
                  className="nav-link"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sports and Outdoors <i className="fa fa-angle-right float-right mt-1" />
                </a>
                <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top:'0px' }}>
                  <a href="/category/4/subcategory/20" className="dropdown-item">
                    Sports Equipment
                  </a>
                  <a href="/category/4/subcategory/21" className="dropdown-item">
                    Activewear
                  </a>
                  <a href="/category/4/subcategory/22" className="dropdown-item">
                    Outdoor Gear
                  </a>
                  <a href="/category/4/subcategory/23" className="dropdown-item">
                    Fitness Accessories
                  </a>
                  <a href="/category/4/subcategory/24" className="dropdown-item">
                    Team Sports
                  </a>
                </div>
              </div>

        <div className="nav-item dropdown dropright">
                  <a
                    href="#"
                    className="nav-link"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Beauty and Personal Care <i className="fa fa-angle-right float-right mt-1" />
                  </a>
                  <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top:'0px' }}>
                    <a href="/category/5/subcategory/25" className="dropdown-item">
                      Skincare
                    </a>
                    <a href="/category/5/subcategory/26" className="dropdown-item">
                      Makeup and Cosmetics
                    </a>
                    <a href="/category/5/subcategory/27" className="dropdown-item">
                      Haircare
                    </a>
                    <a href="/category/5/subcategory/28" className="dropdown-item">
                      Perfumes and Fragrances
                    </a>
                    <a href="/category/5/subcategory/29" className="dropdown-item">
                      Grooming
                    </a>
                  </div>
                </div>

        {/* */}
        <div className="nav-item dropdown dropright">
              <a
                href="#"
                className="nav-link"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Toys and Games <i className="fa fa-angle-right float-right mt-1" />
              </a>
              <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top:'0px' }}>
                <a href="/category/6/subcategory/30" className="dropdown-item">
                  Toys for Kids
                </a>
                <a href="/category/6/subcategory/31" className="dropdown-item">
                  Board Games and Puzzles
                </a>
                <a href="/category/6/subcategory/32" className="dropdown-item">
                  Outdoor Play
                </a>
                <a href="/category/6/subcategory/33" className="dropdown-item">
                  Collectibles
                </a>
                <a href="/category/6/subcategory/34" className="dropdown-item">
                  Video Games and Consoles
                </a>
              </div>
            </div>
      {/* */}
      <div className="nav-item dropdown dropright">
              <a
                href="#"
                className="nav-link"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Books and Media <i className="fa fa-angle-right float-right mt-1" />
              </a>
              <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top:'0px' }}>
                <a href="/category/7/subcategory/35" className="dropdown-item">
                  Fiction Books
                </a>
                <a href="/category/7/subcategory/36" className="dropdown-item">
                  Non-Fiction Books
                </a>
                <a href="/category/7/subcategory/37" className="dropdown-item">
                  Movies and TV Shows
                </a>
                <a href="/category/7/subcategory/38" className="dropdown-item">
                  Music (CDs, Vinyl, Digital)
                </a>
                <a href="/category/7/subcategory/39" className="dropdown-item">
                  E-books and Audiobooks
                </a>
              </div>
            </div>
      {/* */}
      <div className="nav-item dropdown dropright">
                <a
                  href="#"
                  className="nav-link"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Jewelry and Watches <i className="fa fa-angle-right float-right mt-1" />
                </a>
                <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top:'0px' }}>
                  <a href="/category/8/subcategory/40" className="dropdown-item">
                    Necklaces and Pendants
                  </a>
                  <a href="/category/8/subcategory/41" className="dropdown-item">
                    Rings
                  </a>
                  <a href="/category/8/subcategory/42" className="dropdown-item">
                    Watches (Men's and Women's)
                  </a>
                  <a href="/category/8/subcategory/43" className="dropdown-item">
                    Bracelets and Bangles
                  </a>
                  <a href="/category/8/subcategory/44" className="dropdown-item">
                    Earrings
                  </a>
                </div>
              </div>

      {/* */}
      <div className="nav-item dropdown dropright">
                <a
                  href="#"
                  className="nav-link"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Health and Wellness <i className="fa fa-angle-right float-right mt-1" />
                </a>
                <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top:'0px' }}>
                  <a href="/category/9/subcategory/45" className="dropdown-item">
                    Vitamins and Supplements
                  </a>
                  <a href="/category/9/subcategory/46" className="dropdown-item">
                    Fitness Equipment
                  </a>
                  <a href="/category/9/subcategory/47" className="dropdown-item">
                    Health Monitors
                  </a>
                  <a href="/category/9/subcategory/48" className="dropdown-item">
                    Alternative Medicine
                  </a>
                  <a href="/category/9/subcategory/49" className="dropdown-item">
                    Personal Care (Oral Care, Hygiene)
                  </a>
                </div>
              </div>

      {/* */}
      <div className="nav-item dropdown dropright">
                    <a
                      href="#"
                      className="nav-link"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Food and Beverages <i className="fa fa-angle-right float-right mt-1" />
                    </a>
                    <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top:'0px' }}>
                      <a href="/category/10/subcategory/50" className="dropdown-item">
                        Groceries
                      </a>
                      <a href="/category/10/subcategory/51" className="dropdown-item">
                        Snacks and Sweets
                      </a>
                      <a href="/category/10/subcategory/52" className="dropdown-item">
                        Beverages (Coffee, Tea, Soft Drinks)
                      </a>
                      <a href="/category/10/subcategory/53" className="dropdown-item">
                        Gourmet and Specialty Foods
                      </a>
                      <a href="/category/10/subcategory/54" className="dropdown-item">
                        Cooking and Baking Supplies
                      </a>
                    </div>
                  </div>
      {/* */}
      <div className="nav-item dropdown dropright">
                <a
                  href="#"
                  className="nav-link"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Automotive and Tools <i className="fa fa-angle-right float-right mt-1" />
                </a>
                <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top:'0px' }}>
                  <a href="/category/11/subcategory/55" className="dropdown-item">
                    Auto Parts and Accessories
                  </a>
                  <a href="/category/11/subcategory/56" className="dropdown-item">
                    Tools and Equipment
                  </a>
                  <a href="/category/11/subcategory/57" className="dropdown-item">
                    Car Care and Maintenance
                  </a>
                  <a href="/category/11/subcategory/58" className="dropdown-item">
                    Motorcycle Gear
                  </a>
                  <a href="/category/11/subcategory/59" className="dropdown-item">
                    Automotive Electronics
                  </a>
                </div>
              </div>

      {/* */}
      <div className="nav-item dropdown dropright">
                  <a
                    href="#"
                    className="nav-link"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Office Supplies <i className="fa fa-angle-right float-right mt-1" />
                  </a>
                  <div className="dropdown-menu position-absolute rounded-0 border-0 m-0" style={{ left: '285px', top:'0px' }}>
                    <a href="/category/12/subcategory/10" className="dropdown-item">
                      Art Supplies for Office
                    </a>
                    <a href="/category/12/subcategory/11" className="dropdown-item">
                      Office Supplies
                    </a>
                    <a href="/category/12/subcategory/12" className="dropdown-item">
                      Writing Instruments
                    </a>
                    <a href="/category/12/subcategory/13" className="dropdown-item">
                      Paper and Notebooks
                    </a>
                    <a href="/category/12/subcategory/14" className="dropdown-item">
                      Desk Accessories
                    </a>
                  </div>
                </div>

          </div>
        </nav>

      </div>
      <div className="col-lg-9">
        <nav className="navbar navbar-expand-lg background-color navbar-light py-3 py-lg-1 px-0">

          <a href="" className="text-decoration-none d-block d-lg-none">
            <span className="h1 text-uppercase text-white bg-dark px-2 font-style">
              Gadget
            </span>
            <span className="h1 text-uppercase text-dark bg-white px-2 ml-n1">
              𝓦𝓪𝓿𝓮
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
            className="collapse navbar-collapse background-color justify-content-between "
            id="navbarCollapse" style={{marginTop: '5px'}}
          >
            <div className="navbar-nav mr-auto py-1">

                <Link to="/" className="nav-item nav-link text-white font-weight-bold" style={{marginLeft:'10px'}}>Home</Link>


                <Link to="/products" className="nav-item nav-link text-white font-weight-bold"style={{marginLeft:'12px'}}>Shop</Link>


              {/*<a href="" className="nav-item nav-link active">
                Shop Detail
              </a>*/}

              { isSeller &&
                <Link to="dashboard" className="nav-item nav-link text-white font-weight-bold"style={{marginLeft:'12px'}}>Seller Dashboard</Link>

              }

            </div>
            <div className="navbar-nav ml-auto py-0 d-none d-lg-flex align-items-center">
              <div className="dropdown ml-3">
                <a className="btn px-4 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-user text-white" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {isLogged === false ? (
                      <li key="signin">

                          <Link to="/SignIn" className="text-decoration-none text-dark dropdown-item">Sign in</Link>

                      </li>
                  ) : (
                      <>
                        <li key="greeting"><a className="dropdown-item" style={{borderBottom:"1px solid black"}}>Hi! {manageAccount.getCustomerName()}</a></li>
                        <li> <Link to={'/my-orders'} className="text-decoration-none dropdown-item">My Orders</Link></li>
                        {isSeller && (
                            <li key="mystore">
                              <Link to="dashboard" className="text-decoration-none dropdown-item">My Store</Link>
                            </li>
                        )}
                        <li key="myprofile"><Link to="user" className="text-decoration-none dropdown-item">My Profile</Link></li>
                        <li key="logout">
                          <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => {
                                manageAccount.logOut();
                                setIsLogged(false);
                                setIsSeller(false);
                                setTrigger(true);
                                navigate("/");
                              }}
                          >
                            Log Out
                          </button>
                        </li>
                      </>
                  )}
                </ul>
              </div>

              <Link to={`cart/${manageAccount.getCustomerID()}`} className="btn px-0 ml-3">
                <i className="fas fa-shopping-cart textColor" />
                <span className="badge border border-white rounded-circle  " style={{ paddingBottom: 3, marginLeft:'2px' }}>
                  <span >
                  <CartSize />
                  </span>
      
    </span>
              </Link>
            </div>

          </div>
        </nav>
      </div>
    </div>
  </div>
  {/* Navbar End */}

          {/*  <nav className="navbar navbar-expand-lg navbar-light bg-dark">
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
            </nav>*/}

            <Outlet />
            </>

        );
    }

//}

export default Header;
