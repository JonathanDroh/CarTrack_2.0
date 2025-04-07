// Komponent: AuthProvider
// Beskrivning: Context-provider för autentisering. Hanterar inloggning, utloggning och token-verifiering vid sidladdning.

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Loggar ut användaren, rensar sessionStorage och navigerar till startsidan
    const logoutUser = useCallback(() => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("user");
        setUser(null);
        navigate("/", { replace: true });
    }, [navigate]);

    // Vid sidladdning: verifiera JWT-token om den finns
    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            logoutUser();
            setLoading(false);
            return;
        }

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
                setUser({ role: data.user.role, token, anvandare_id: data.user.id });
                sessionStorage.setItem("user", JSON.stringify({ role: data.user.role, anvandare_id: data.user.id }));
            } else {
                logoutUser();
            }
        })
        .catch(() => {
            logoutUser();
        })
        .finally(() => {
            setLoading(false);
        });
    }, [logoutUser]);

    // Inloggningsfunktion: sparar token och användarinfo
    const login = (token, role, anvandare_id) => {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("user", JSON.stringify({ role, anvandare_id }));

        setUser({ token, role, anvandare_id });
        setLoading(false);

        if (role === "Admin") {
            navigate("/admin");
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
