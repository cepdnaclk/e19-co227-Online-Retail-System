import axios from "axios";
import {environment} from "../environments/environment";

export const homePageService = {


    getTopSellingProducts: async () => {
        try {
            const response = await axios.get(`${environment.baseUrl}/top-selling-products`);
            return response.data;
        } catch (error) {
            throw error;
        }

    },
    getNewlyAddedProducts: async () => {
        try {
            const response = await axios.get(`${environment.baseUrl}/newly-added-products`);
            return response.data;
        } catch (error) {
            throw error;
        }

    }

}
