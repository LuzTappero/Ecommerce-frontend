/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { api } from "../services/user/userAPI";
import { jwtDecode } from "jwt-decode";
import { useUserProfile } from "./profileContext";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const { setProfile } = useUserProfile()

  useEffect(()=>{
      const token= sessionStorage.getItem('access_token')
      if (token){
        try{
          const decoded= jwtDecode(token)
            if (decoded){
              setUser(decoded)
              setIsAuthenticated(true)
            }
            else{
              setUser(null)
              setIsAuthenticated(false)
            }
          }catch(error){
            console.error('Error decoding token', error);
            logout()
          }
        }else{
          setIsAuthenticated(false)
          setUser(null)
      }
  }, [isAuthenticated]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', {
        email, password});
        setIsAuthenticated(true);
        setUser(response.data.user);
        sessionStorage.setItem('access_token', response.data.token)
        return response.data;
    } catch (error) {
        setIsAuthenticated(false);
        setUser(null)
        const errorMessage = error.response?.data?.message || "Login failed";
        return { message: errorMessage };
    }
  };
  const register = async (username, email, password) => {
    try {
      const response = await api.post(`/register`, {
        username,
        email,
        password
      });
      setErrors([]);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ msg: "An unexpected error occurred. Please try again." }]);
      }
    }
  };
  const logout = async () => {
    try {
      await api.post('/logout', {});
      setIsAuthenticated(false);
      setUser(null);
      sessionStorage.removeItem('access_token')
      localStorage.removeItem('cart')
      setProfile(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        setUser,
        errors,
        setErrors,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };

