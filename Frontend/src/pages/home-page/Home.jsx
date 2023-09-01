import React, {useState} from "react";
import './Home.component.css'
import Header from "../../components/layout/header/header";
import {systemService} from "../../services/systemService";
import {RegisterUserDTO} from "../../dto/RegisterUserDTO"
import axios from "axios";
import {Outlet} from "react-router";

class Home extends React.Component{

    constructor() {
        super();

    }

    render() {


        return(

           <div>
               This is Home
           </div>

        );
    }

}

export default Home;
