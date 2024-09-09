import { validateEmail,validatePassword,validateUsername } from "./userValidation";

export const validateRegistration = (username, email, password) => {
    let errors = [];
    
    const usernameError = validateUsername(username);
    if (usernameError) errors.push(usernameError);
    
    const emailError = validateEmail(email);
    if (emailError) errors.push(emailError);
    
    const passwordError = validatePassword(password);
    if (passwordError) errors.push(passwordError);
    
    return errors;
};