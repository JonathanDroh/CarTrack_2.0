import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext"; 
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logoutUser = useCallback(() => {
        console.log("🔴 Loggar ut användaren och rensar session...");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
        navigate("/", { replace: true }); // 🔹 Skicka användaren till login-sidan
    }, [navigate]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const role = sessionStorage.getItem("role");
    
        if (!token || !role) {
            console.log("🔴 Ingen giltig token hittades. Loggar ut...");
            logoutUser();
            setLoading(false);
            return;
        }
    
        console.log("🔹 Token hittad i sessionStorage. Verifierar...");
    
        fetch("http://localhost:5050/api/auth/verify", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.valid) {
                console.log("✅ Token är giltig. Användaren är inloggad:", { role, token });
                setUser({ role, token });
            } else {
                console.log("🔴 Token är ogiltig eller har gått ut. Loggar ut...");
                logoutUser();
            }
        })
        .catch(() => {
            console.log("🔴 Kunde inte verifiera token. Loggar ut...");
            logoutUser();
        })
        .finally(() => {
            setLoading(false);
        });
    }, [logoutUser]);
    

    const login = (token, role) => {
        console.log("🔹 Loggar in användaren:", { role, token });
    
        // 🔹 Byt från localStorage till sessionStorage så att inloggning raderas vid webbläsarstängning
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
    
        setUser({ token, role });
        setLoading(false);
    
        // 🔹 Omdirigera ALLA användare till `/dashboard`
        navigate("/dashboard");
    };
    
    

    return (
        <AuthContext.Provider value={{ user, login, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
