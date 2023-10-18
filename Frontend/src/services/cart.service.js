import axios from 'axios';
import {environment} from "../environments/environment"


export const cartService = {


    checkInCart: async (cartID, productID) => {
        try {
            const response = await axios.post(`${environment.baseUrl}/checkcart`, {
                cartID: cartID,
                productID: productID
            });
            return response;
        } catch (error) {
            throw error;
        }

    },
    addToCart: async (cartDetails) => {
        try {
            const response = await axios.post(`${environment.baseUrl}/product`, cartDetails);
            return response;
        } catch (error) {
            throw error;
        }

    },
    getFromCart:async (id) =>{
        try {
            const response = await axios.get(`${environment.baseUrl}/cart/${id}`);
            return response;
        } catch (error) {
            throw error;
        }

    },
    updateCart:async (qty,cartID, productID) =>{
        try {
            const response = await axios.put(`${environment.baseUrl}/cart/${cartID}`,{ qty,cartID, productID});
            return response;
        } catch (error) {
            throw error;
        }

    }
}
