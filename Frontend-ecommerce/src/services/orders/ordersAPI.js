import axios from '../../config/axiosConfig'

const API_URL_ORDERS = "http://localhost:8080/orders";

const getToken = () =>{
    return (sessionStorage.getItem("access_token"))
}

export const getUserPurchases = async () => {
    try {
        const token = getToken()
        const response = await axios.get(`${API_URL_ORDERS}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
    } catch (error) {
        if (error.response && error.response.status !== 404) {
            console.error(error);
        }
    }
};

export const saveCart = async (profileData) => {
    try {
        const token = getToken()
    const response = await axios.post(`${API_URL_ORDERS}/saveCart`, profileData, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    });
    return response;
    } catch (error) {
        console.error("Error saving the cart");
    throw error;
    }
};