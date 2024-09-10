import './profileDetails.css'
import { useState, useEffect } from "react";
import { updateProfileById } from '../../../services/profile/profileAPI';
import { validateProfileForm } from '../../../utils/profileValidation';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../../Context/profileContext';
import { toast } from 'react-toastify';
import './profileDetails.css'

const ProfileDetails = () => {
    const { profile, setProfile } = useUserProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState(profile);
    const navigate= useNavigate()

    useEffect(() => {
        if (profile) {
            setUpdatedProfile({ ...profile });
        }
    }, [profile]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
        }));
    };

    const handleSaveClick = async (e) => {
        e.preventDefault()
        const { isValid, errorMessages } = validateProfileForm(updatedProfile.address, updatedProfile.phone, updatedProfile.social_media);
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
            const response = await updateProfileById(
            profile.profile_id,
            updatedProfile)
            if (response) {
                setProfile(updatedProfile)
                toast.success('Profile updated succesfully');
                setIsEditing(false);
            }
        }
        catch (error) {
            toast.error('Failed to update the profile', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUpdatedProfile({ ...profile });
    };

    if (!profile) {
        return (
            <>
                <p className='p_notprofile'>
                You don't have a profile! Do it here</p>
                <button className='button-create' onClick={() => {
                    navigate('/profile-create')}}>
                    Create Profile
                </button>
            </>
        );
    }

    return (
        <div className="userProfile">
        <h3><i className="fas fa-user-circle"></i> PROFILE DETAILS</h3>
        <div className="profile__details">
    <p>
        <strong>Address:</strong>
        {isEditing ? (
            <>
                <label htmlFor="address"><span className="required"> *</span>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={updatedProfile.address}
                        onChange={handleChange}
                        required
                    />
                </label>
            </>
        ) : (
            ` ${profile.address}`
        )}
    </p>
    <p>
        <strong>Phone:</strong>
        {isEditing ? (
            <>
                <label htmlFor="phone"><span className="required"> *</span>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={updatedProfile.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
            </>
        ) : (
            ` ${profile.phone}`
        )}
    </p>
    {profile.social_media && (
        <p>
            <strong>Social Media:</strong>
            {isEditing ? (
                <>
                    <label htmlFor="social_media">
                        <input
                            type="text"
                            id="social_media"
                            name="social_media"
                            value={updatedProfile.social_media || ""}
                            onChange={handleChange}
                        />
                    </label>
                </>
            ) : (
                ` ${profile.social_media}`
            )}
        </p>
    )}
    {!profile.social_media && isEditing && (
        <p>
            <strong>Social Media:</strong>
            <label htmlFor="social_media">
                <input
                    type="text"
                    id="social_media"
                    name="social_media"
                    value={updatedProfile.social_media || ""}
                    onChange={handleChange}
                />
            </label>
        </p>
    )}
</div>
        <div>
            {isEditing ? (
            <>
            <div className="button-container">
                <button className="button-save" onClick={handleSaveClick}>SAVE</button>
                <button  className="button-cancel" onClick={handleCancelClick}>CANCEL</button>
            </div>
            </>
            ) : (
            <div className="button-container">
                <button className="button-edit" onClick={handleEditClick}>UPDATE</button>
            </div>
            )}
        </div>
        </div>
    );
};

export default ProfileDetails;
