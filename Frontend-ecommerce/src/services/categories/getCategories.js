import axios from "axios";

const API_URL = "http://localhost:8080/categories";

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response;
    } catch (error) {
        console.error("Error getting products:", error);
        throw error;
    }
};
