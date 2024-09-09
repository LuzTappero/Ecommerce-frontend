
export const validatePassword = (password) => {
    const passwordString = String(password);
    const hasMinLength = passwordString.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Ejemplo de caracteres especiales

    if (!hasMinLength) {
        return "The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    if (!hasUpperCase) {
        return "The password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
        return "The password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
        return "The password must contain at least one number.";
    }
    if (!hasSpecialChar) {
        return "The password must contain at least one special character.";
    }
    return null;
};

export const validateUsername = (username) => {
    const usernameString = String(username);
    const hasMinLength = usernameString.length >= 3;
    const hasMaxLength = usernameString.length <= 15; 
    const hasNoSpecialChars = /^[a-zA-Z0-9]+$/.test(username);
    if (!hasMinLength) {
        return "Username must be at least 3 characters long.";
    }
    if (!hasMaxLength) {
        return "Username must be a maximum of 15 characters long.";
    }
    if (!hasNoSpecialChars) {
        return "Username can only contain letters and numbers, with no spaces.";
    }
    return null;
};

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? null : "Please enter a valid email address.";
};
