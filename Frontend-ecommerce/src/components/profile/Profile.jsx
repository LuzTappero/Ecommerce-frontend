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
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user) {
            if (profile) {
                setProfileExists(true);
                setLoading(false);
            }else{
                const checkProfile = async () => {
                    try{
                        const data = await getProfileByUserId(user.userId);
                        if (data && data.exists) {
                            setProfile(data.profile);
                            setProfileExists(true);
                        } else {
                            setProfileExists(false);
                        }
                    } catch (err) {
                        if (err.response?.status !== 404) {
                            console.error("Profile not found:", err);
                        }
                    } finally {
                        setLoading(false);
                    }
                };
                checkProfile();
            }
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, user, profile, setProfile]);

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

    return (
        <>
        <main className="profile">
            <div className="profile__container">
            <h2>
                <i className="fas fa-handshake"></i> Welcome to your Profile,{" "}
                {user?.username}!
            </h2>
            <div className="profile__container-message">
            {isAuthenticated && user?.role === 'admin' ? (
                <p>
                    Here, you can manage and update your profile information to keep your account settings
                    aligned with your administrative role.
                    Ensure your details are accurate for a streamlined experience managing the platform.
                    You can add a social media account to stay connected with the community,
                    update your contact number for efficient communication with team members and customers,
                    and provide an address if necessary for administrative purposes.
                    Keeping your profile information up to date allows us to maintain effective
                    collaboration and support your administrative tasks more efficiently!
            </p>
                ):
                <p>
                    Here, you can view and adjust your profile information according
                    to your preferences. Make sure your details are up to date for a
                    better experience. You can add a social media account to stay
                    connected, provide an address for seamless delivery in case you
                    make a purchase, and add a contact number for better
                    communication. Keeping your profile information updated helps us
                    serve you better!
                </p>}
            </div>
                <div className="profile__container-details">
                    <ProfileButtons
                        user={user}
                        handleButtonProfile= {handleButtonProfile}
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
