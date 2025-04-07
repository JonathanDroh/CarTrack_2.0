// Hook-fil: authUtils
// Beskrivning: Innehåller anpassade hooks för autentisering – useAuth och useLogout.

import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

// Returnerar nuvarande användare från AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Funktion för att logga ut användaren och navigera till startsidan
export const useLogout = () => {
    const navigate = useNavigate();
    return () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("user");
        navigate("/");
    };
};
