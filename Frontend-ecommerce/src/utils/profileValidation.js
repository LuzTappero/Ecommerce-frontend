export const validateProfileForm = (address, phone, social_media) => {

    let errors = {}
    let isValid = true;

    if (!address.trim() || /[^a-zA-Z0-9\s,.-]/.test(address)) {
        isValid = false;
        errors.address = 'Address must be alphanumeric';
    }

    const phoneString = phone.toString();
    if (!phoneString.trim() || !/^[0-9+\s()-]+$/.test(phone)) {
        isValid = false;
        errors.phone = 'Phone number must be numeric';
    }

    if (social_media && /[^a-zA-Z0-9\s@._/-]/.test(social_media)) {
        isValid = false;
        errors.social_media = 'Social media URL is not valid';
    }

    return { isValid,  errorMessages: Object.values(errors), };
};

export const handleProfileErrorMessages = (error) => {
    if (error && error.response && error.response.data && error.response.data.errors) {
        return error.response.data.errors.map((err) => err.msg);
    } else {
        return ["An unexpected error occurred"];
    }
};