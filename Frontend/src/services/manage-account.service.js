import Cookies from 'js-cookie';

export const manageAccount ={

    isLoggedIn : ()=>{
        const token = Cookies.get('jwt');
        const sellerID = Cookies.get('sellerID');

        if(token!==undefined && sellerID!==undefined){
            return true
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
