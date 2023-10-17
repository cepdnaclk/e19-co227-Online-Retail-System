import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import successImg from '../../assets/successful1.png';
import Footer from '../../components/layout/footer/footer';

function successful(){

    return(
    <>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "65vh", marginTop:'200px' }}>
        <h2 style={{ textAlign: "center" }}>Thank You! <br/> Your Order has been Placed Successfully.</h2>
        <img style={{ height: "250px", marginTop: "50px" }} src={successImg} />
        <h4 style={{ marginTop: "50px" }}>
            <NavLink to="/" style={{ textDecoration: 'none', backgroundColor: "#3CD2A2", padding: "10px 20px", borderRadius: "5px", color: "black" }}>Shop More</NavLink>
        </h4>
        
    </div>

    <Footer />

    
    
    </>
        );


}

export default successful;