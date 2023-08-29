import Cookies from 'js-cookie';

export const manageAccount ={

    isLoggedIn : ()=>{
        const token = Cookies.get('jwt');
        if(token!==undefined){
            return true
        }else {
            return  false
        }

    },

    getCustomerID:()=>{
        const customerID = Cookies.get('customerID');
        if(customerID!==undefined){
            return customerID;
        }else {
            return  -1
        }
    },

    logOut:()=>{
        Cookies.remove('jwt');

    }
}
