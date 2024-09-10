import axios from "../../config/axiosConfig";

const API_URL = "http://localhost:8080/profile";

export const getProfileByUserId = async (userId) => {
    try {
    const token = sessionStorage.getItem("access_token");
    const response = await axios.get(`${API_URL}/byUser/${userId}`, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
    } catch (error) {
        if (error.response && error.response.status !== 404) {
            console.info('Profile not existing');
        } else {
            throw error;
        }
    }
};

export const updateProfileById = async (profile_id, updatedProfile) => {
    const token = sessionStorage.getItem("access_token");
    const response = await axios.put(
        `${API_URL}/${profile_id}`,
        updatedProfile,
        {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        }
    );
    return response.data;
};

export const createProfile = async (profileData) => {
    try {
    const token = sessionStorage.getItem("access_token");
    const response = await axios.post(`${API_URL}/create`, profileData, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    });
    return response;
    } catch (error) {
    throw error;
    }
};
