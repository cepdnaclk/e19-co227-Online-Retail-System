// services/systemService.js
import axios from 'axios';
import {RegisterUserDTO} from "../dto/RegisterUserDTO";

const API_URL = 'http://localhost:8081/api/v1'; // Replace with your backend URL

export const systemService = {
    registerUser: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/registerUser`, userData);
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
            const response = await axios.post(`${API_URL}/loginUser`, userData);
            return  response.data;

        } catch (error) {
            this.setState({ error: 'An error occurred' });
            throw error;
        }

    }
};
