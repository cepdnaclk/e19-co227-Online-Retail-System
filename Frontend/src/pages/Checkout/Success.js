import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import successImg from '../../assets/successful1.png';

function successful(){

    return(

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <h2 style={{ textAlign: "center" }}>Thank You! Your Order has been Successfully placed.</h2>
        <img style={{ height: "250px", marginTop: "50px" }} src={successImg} />
        <h4 style={{ marginTop: "50px" }}>
            <NavLink to="/" style={{ textDecoration: 'none', backgroundColor: "#3CD2A2", padding: "10px 20px", borderRadius: "5px", color: "black" }}>Shop More</NavLink>
        </h4>
    </div>
    

        );

}

export default successful;
