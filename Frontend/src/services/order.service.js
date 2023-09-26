import axios from 'axios';
import {environment} from "../environments/environment"


export const orderService = {

    //For seller they can see all the orders related to their items
    getOrders: async (sellerID) => {
        try {
            const response = await axios.get(`${environment.baseUrl}/getOrders`,{headers:{id:sellerID}});
            return response.data;
        } catch (error) {
            throw error;
        }

    },
    //For Customer they can see all the orders thy places
    getCustomerOrders: async (customerID) => {
        try {
            const response = await axios.get(`${environment.baseUrl}/getCustomerOrders`,{headers:{id:customerID}});
            return response.data;
        } catch (error) {
            throw error;
        }

    },
    getOrderItems: async (orderID) => {
        try {
            const response = await axios.get(`${environment.baseUrl}/getOrderItems`,{headers:{id:orderID}});
            return response.data;
        } catch (error) {
            throw error;
        }

    },
    updateTracking:async (orderID,trackingNum,deliveryCompany)=>{
        try {
            const trackingDetails = {orderID:orderID,trackingNumber:trackingNum,deliveryCompany:deliveryCompany}
            const response = await axios.put(`${environment.baseUrl}/updateTracking`,trackingDetails);
            return response.data;
        } catch (error) {
            throw error;
        }

    },

    updateOrderStatus:async (orderID,status)=>{
        try {
            const statusDetails = {id:orderID,status:status}
            const response = await axios.put(`${environment.baseUrl}/updateOrderStatus`,statusDetails);
            return response.data;
        } catch (error) {
            throw error;
        }

    },

    deleteOrder:async (id)=>{
        try {

            const response = await axios.delete(`${environment.baseUrl}/deleteOrder/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }

    }

}
