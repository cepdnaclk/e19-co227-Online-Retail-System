import Cookies from 'js-cookie';
import {systemService} from "./systemService";
import React from "react";
//import jwt_decode from "jsonwebtoken";


export const manageAccount ={

    isLoggedIn :async ()=>{
        const token = Cookies.get('jwt');
        const customerID = Cookies.get('customerID');


        if(token!==undefined && customerID!==undefined){
            try {
                const response = await systemService.verifyToken(token);

                if (response.message === 'Success') {
                    console.log('Verified!');
                    return true; // User is logged in
                } else {
                    console.log('Unauthorized Login!');
                    this.logOut()
                    return false; // User is not logged in
                }
            } catch (error) {
                console.error('Error during token verification:', error);
                return false; // Error occurred during verification
            }

        }else {
            return  false
        }

    },
    getSellerID: ()=>{
        const sellerID = Cookies.get('sellerID');
        if(sellerID!==undefined){

            return sellerID;
        }else {
            return  -1
        }
    },
    getShopName: ()=>{
        const shopName = Cookies.get('shopName');
        if(shopName!==undefined){
            return shopName;
        }else {
            return  -1
        }
    },


    getCustomerID: ()=>{
        const customerID = Cookies.get('customerID');
        if(customerID!==undefined){

            return customerID;
        }else {
            return  -1
        }
    },

    getCustomerName:()=>{
        const customerName = Cookies.get('name');
        if(customerName!==undefined){
            return customerName;
        }else {
            return  'User'
        }
    },

    logOut: ()=>{
        Cookies.remove('jwt');
        Cookies.remove('customerID')
        Cookies.remove('sellerID')
        Cookies.remove('shopName')
        Cookies.remove('name')

    }

}


