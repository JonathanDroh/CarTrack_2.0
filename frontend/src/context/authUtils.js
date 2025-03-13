import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

// 🔹 Hook för att använda AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// 🔹 Utloggningsfunktion
export const useLogout = () => {
    const navigate = useNavigate();
    return () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };
};
