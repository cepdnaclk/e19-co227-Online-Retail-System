import React, {useState} from "react";
import './Home.component.css'
import Header from "../../components/layout/header/header";
import {systemService} from "../../services/systemService";
import {RegisterUserDTO} from "../../dto/RegisterUserDTO"
import axios from "axios";

class Home extends React.Component{


    render() {


        return(

           <div>
               <Header />
               Home Page
           </div>

        );
    }

}

export default Home;
