import Cookies from 'js-cookie';
import {systemService} from "./systemService";
//import jwt_decode from "jsonwebtoken";


export const manageAccount ={

    isLoggedIn : ()=>{
        const token = Cookies.get('jwt');
        const customerID = Cookies.get('customerID');

        if(token!==undefined && customerID!==undefined){
            systemService.verifyToken(token).then((response)=>{
                if(response.message==='Success'){
                    return true
                }else{
                    return false
                }

            }).catch(error=>{
                return false
            })


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

    logOut: ()=>{
        Cookies.remove('jwt');
        Cookies.remove('customerID')
        Cookies.remove('sellerID')
        Cookies.remove('shopName')

    }

}

/*
isLoggedIn : ()=>{
    const token = Cookies.get('jwt');


    if(token!==undefined){
        systemService.verifyToken(token).then((response)=>{
            if(response.message==='Success'){
                return true
            }else{
                return false
            }

        }).catch(error=>{
            return false
        })


    }else {
        return  false
    }

},
    getSellerID: ()=>{
    const token = Cookies.get('sellerToken');
    if(token!==undefined){
        return 'jwt_decode(token).id';
    }else {
        return  -1
    }
},
    getShopName: ()=>{
    const token = Cookies.get('sellerToken');
    if(token!==undefined){
        return jwt_decode(token).shopName;
    }else {
        return  -1
    }
},


    getCustomerID: ()=>{
    const token = Cookies.get('jwt');

    if(token!==undefined){
        return jwt_decode(token).id;

    }else {
        return  -1
    }
},

    logOut: ()=>{
    Cookies.remove('jwt');
    Cookies.remove('sellerToken')


}*/
