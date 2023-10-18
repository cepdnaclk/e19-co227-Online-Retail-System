import axios from 'axios';
import {environment} from "../environments/environment"


export const productService = {



    addProduct:  async(productData) => {
        try {
            const response = await axios.post(`${environment.baseUrl}/addProduct`, productData);
            return response.data;
        } catch (error) {
            throw error;
        }

    },

    updateProduct: async (updateData,id)=>{

        try {
            const response = await axios.put(`${environment.baseUrl}/updateProduct/${id}`, updateData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteProduct: async (id)=>{

        try {
            const response = await axios.delete(`${environment.baseUrl}/deleteProduct/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCategories: async ()=>{
        try {
            const response = await axios.get(`${environment.baseUrl}/getCategory`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllProducts:async (sellerID)=>{
        try {
            const response = await axios.get(`${environment.baseUrl}/getAllProductsFromSeller`,{ headers: { id:sellerID } });
            return response.data;
        } catch (error) {
            throw error;
        }

    },
    getProductByCategory : async (categoryId,subcategoryId)=>{
        try {
            const response = await axios.get(`${environment.baseUrl}/products/${categoryId}/${subcategoryId}`);
            return response.data;
        } catch (error) {
            throw error;
        }

    },
    getCategoriescount : async (categoryId)=>{
        try {
            const response = await axios.get(`${environment.baseUrl}/categoryCount/${categoryId}`);
            return response.data;
        } catch (error) {
            throw error;
        }

    },
    getProductByMainCategory : async (categoryID,categoryName,count)=>{
        try {
            const response = await axios.get(`${environment.baseUrl}/${categoryName}/${categoryID}/${count}`);
            return response.data;
        } catch (error) {
            throw error;
        }

    },
    getAllP: async ()=>{
        try {
            const response = await axios.get(`${environment.baseUrl}/top-selling-products`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getProductById: async ()=>{
        try {
            const response = await axios.get(`${environment.baseUrl}/top-selling-products`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
