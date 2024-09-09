/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/authContext";
import { getProfileByUserId } from "../../services/profile/profileAPI";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { ProfileButtons } from "./profileButtons/ProfileButtons";
import "./profile.css";
import { useUserProfile } from "../../Context/profileContext";

Modal.setAppElement("#root");

export const Profile = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { profile, setProfile } = useUserProfile()
    const [profileExists, setProfileExists] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user) {
        const checkProfile = async () => {
            if (!profile){
                const data = await getProfileByUserId(user.userId);
                if (data.exists) {
                    setProfile(data.profile);
                    setProfileExists(true);
                } else {
                    setProfileExists(false);
                }
            } else {
                setProfileExists(true);
            }
        };
        checkProfile();
        }
    }, [isAuthenticated, user,profile, setProfile]);

    const handleViewProducts = () => {
        navigate("/shop");
    };

    const handleButtonProfile = async () => {
        try {
            if (profileExists && profile) {
                navigate("/profile-details", { state: { profile } });
            } else {
                navigate("/profile-create");
            }
        } catch (error) {
            console.error("Error handling profile button click:", error);
        }
    };

    if (!isAuthenticated) {
        return <p>You need to be logged in to view this page.</p>;
    }

    return (
        <>
        <main className="profile">
            <div className="profile__container">
            <h2>
                <i className="fas fa-handshake"></i> Welcome to your Profile,{" "}
                {user?.username}!
            </h2>
            <div className="profile__container-message">
                <p>
                Here, you can view and adjust your profile information according
                to your preferences. Make sure your details are up to date for a
                better experience. You can add a social media account to stay
                connected, provide an address for seamless delivery in case you
                make a purchase, and add a contact number for better
                communication. Keeping your profile information updated helps us
                serve you better!
                </p>
            </div>
            <div className="profile__container-details">
                <ProfileButtons
                user={user}
                handleButtonProfile={handleButtonProfile}
                handleViewProducts={handleViewProducts}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                ></ProfileButtons>
            </div>
            </div>
        </main>
        </>
    );
    };
