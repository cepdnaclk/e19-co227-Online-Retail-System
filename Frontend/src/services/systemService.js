import axios from 'axios';
import {RegisterUserDTO} from "../dto/RegisterUserDTO";
import {environment} from "../environments/environment"


export const systemService = {
    registerUser: async (userData) => {
        try {
            const response = await axios.post(`${environment.baseUrl}/registerUser`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    loginUser: async (email, password) => {
        try {
            const userData = {
                email: email,
                password: password
            }
            const response = await axios.post(`${environment.baseUrl}/loginUser`, userData);
            return response.data;

        } catch (error) {
            throw error;
        }

    },
    getSeller: async (customerID) => {
        try {

            const response = await axios.get(`${environment.baseUrl}/getSeller`, {params: {customerID}});
            return response.data;

        } catch (error) {
            throw error;
        }

    },
    verifyToken: async (token) => {
        try {

            const response = await axios.get(`${environment.baseUrl}/verifyToken`, {headers: {token: token}});
            return response.data;

        } catch (error) {
            throw error;
        }

    },

    getCustomerDetails: async (customerID) => {
        try {
            const response = await axios.post(`${environment.baseUrl}/customer`, {customerID})
            return response.data;


        } catch (err) {
            console.log(err)
        }
    },

    updateCustomerDetails: async (UpdateCustomerDTO, id) => {
        try {
            const response = await axios.put(`${environment.baseUrl}/updateCustomer/${id}`, UpdateCustomerDTO)
            return response.data;


        } catch (err) {
            console.log(err)
        }

    },

    setAsSeller: async (shopName, id) => {
        try {
            const response = await axios.post(`${environment.baseUrl}/setAsSeller/${id}`, {shopName})
            return response.data;


        } catch (err) {
            console.log(err)
        }


    }
}
