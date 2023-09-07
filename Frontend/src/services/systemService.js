// services/systemService.js
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
    loginUser: async (email,password) =>{
        try {
            const userData = {
                email:email,
                password:password
            }
            const response = await axios.post(`${environment.baseUrl}/loginUser`, userData);
            return  response.data;

        } catch (error) {
            throw error;
        }

    },
    getSeller:async (customerID)=>{
        try {

            const response = await axios.get(`${environment.baseUrl}/getSeller`, { params: { customerID } });
            return  response.data;

        } catch (error) {
            throw error;
        }

    }
};
