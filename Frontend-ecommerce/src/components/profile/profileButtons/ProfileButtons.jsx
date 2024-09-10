import { useState } from "react";
import UserPurchases from "../../Purchases/getOrders";
import "./profileButtons.css";
import ProfileDetails from "../profileCRUD/ProfileDetails";

export const ProfileButtons = ({
    user,
    handleViewProducts

    }) => {
    const [showUserData, setShowUserData] = useState(false);
    const [showPurchases, setShowPurchases] = useState(false);
    const [showProfileData, setShowProfileData] = useState(false);

    const handleUserDataToggle = () => {
        setShowUserData(!showUserData);
    };

    const handleProfileDataToggle = () => {
        setShowProfileData(!showProfileData);
    };

    return (
    <>
        <button
        className="profile-button"
        onClick={handleUserDataToggle}
        >
            <i className="fas fa-user"></i> MY USER DATA
        </button>
            <div className={`profile__user-data ${showUserData ? "show" : ""}`}>
            {user ? (
                <>
                    <div className="profile__user-data--info">
                        <span>
                            <strong>Username: </strong>
                            {user.username}
                        </span>
                    </div>
                    <div className="profile__user-data--info">
                        <span>
                            <strong>Email: </strong>
                            {user.email}
                        </span>
                    </div>
                </>
                ) : (
                    <p>No user data available</p>
                )}
            </div>
            <button
                className="profile-button"
                onClick={handleProfileDataToggle}
            >
                <i className="fas fa-user-circle"></i> MY PROFILE DATA
            </button>
                <div className={`profile__details-content ${showProfileData  ? "show" : ""}`}>
                    {showProfileData && <ProfileDetails />}
                </div>
        {user && user?.role === "admin" && (
            <button onClick={handleViewProducts} className="profile-button">
                <i className="fas fa-box"></i> VIEW & MANAGE ALL PRODUCTS
            </button>
            )}
            {user && user?.role === "client" && (
                <>
                    <button
                        className="profile-button"
                        onClick={() => setShowPurchases(!showPurchases)}
                    >
                        <i className="fas fa-shopping-cart"></i> MY PURCHASES
                    </button>
                    {<UserPurchases isVisible={showPurchases}/>}
                </>
            )}
    </>
    );
};