import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authUtils"; 
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";

function ProtectedRoute({ element }) {
    const { user, loading } = useAuth(); 

    if (loading) return <h1>Laddar...</h1>;

    if (!user) {
        console.log("🔴 Oinloggad användare försöker komma åt en skyddad sida, skickas till login.");
        return <Navigate to="/" replace />;
    }

    return element;
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        </Routes>
    );
}

export default App;
