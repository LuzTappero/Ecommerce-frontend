import { createContext, useState, useContext } from "react";

const UserProfileContext = createContext();

export const UserProfileProvider =({ children })=>{
    const [profile, setProfile] = useState(null);
    return (
        <UserProfileContext.Provider
        value={{ profile, setProfile }}
        >
                {children}
            </UserProfileContext.Provider>
        );
    }

// eslint-disable-next-line react-refresh/only-export-components
export const useUserProfile = () => useContext(UserProfileContext);