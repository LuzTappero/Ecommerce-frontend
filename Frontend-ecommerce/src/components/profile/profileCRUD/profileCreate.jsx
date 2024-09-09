/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createProfile } from "../../../services/profile/profileAPI";
import { toast } from 'react-toastify';
import { useUserProfile } from "../../../Context/profileContext";
import {validateProfileForm} from '../../../utils/profileValidation'

const ProfileCreate = () => {
    const [profileData, setProfileData] = useState({
        address: "",
        phone: "",
        social_media: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {setProfile } = useUserProfile();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
        ...profileData,
        [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { isValid, errorMessages } = validateProfileForm(profileData.address, profileData.phone, profileData.social_media);
        if (!isValid) {
            errorMessages.forEach((message) => {
                toast.error(message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
            return;
        }

        try {
            const response = await createProfile(profileData);
            if (response.status === 201) {
                setSuccess(true);
                toast.success("Profile details saved successfully");
                setProfileData({ address: '', phone: '', social_media: '' });
                setProfile(response.data.profile);

                if (location.state?.fromCart) {
                    toast.success('Profile created successfully! Redirecting to your cart...', {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                    });

                    setTimeout(() => {
                        navigate('/shop');
                    }, 1500);
                } else {
                    navigate("/profile");
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setSuccess(false);
        }
    };
    return (
        <div className="profile">
        <form onSubmit={handleSubmit}>
        <h3>
        <i className="fas fa-plus-circle"></i>
            CREATE YOUR PROFILE</h3>
            <div className="profile__details">
            <label>
            Address:<span className="required"> *</span>
                <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                required
                />
            </label>
            <label>
                Phone:<span className="required"> *</span>
                <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                required
                />
            </label>
            <label>
                Social Media
                <input
                type="text"
                name="social_media"
                value={profileData.social_media}
                onChange={handleChange}
                />
            </label>
            </div>
            <div className="button-container">
            <button className="button-create" type="submit">
                Create Profile
            </button>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
            </div>
        </form>
        </div>
    );
};

export default ProfileCreate;
