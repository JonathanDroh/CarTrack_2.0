import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import DataTable from "../../components/DataTable";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import SearchBar from "../../components/SearchBar";
import ResetPasswordModal from "../../components/ResetPasswordModal";
import PasswordResetButton from "../../components/PasswordResetButton";
import "../../styles/Table.css"; 
import "../../styles/Components.css"; 

function AdminSettings() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5050/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("❌ Fel vid hämtning av användare:", err));
    }, []);

    const filteredUsers = users.filter((user) =>
        user.namn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.roll.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (email) => {
        fetch(`http://localhost:5050/api/users/${email}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    setUsers(users.filter(user => user.email !== email));
                } else {
                    console.error("❌ Fel vid radering av användare");
                }
            })
            .catch((err) => console.error("❌ Serverfel vid radering:", err));
    };

    const handleResetPassword = (email) => {
        setSelectedUser(email);
        setShowModal(true);
    };

    return (
        <div className="page-container">
            <Sidebar />

            <main className="page-content">
                <div className="component-header">
                    <h1>Admin</h1>
                    <div className="component-actions">
                        <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <AddButton onClick={() => console.log("Lägg till anställd")} />
                    </div>
                </div>

                <div className="table-container">
                    <DataTable 
                        columns={["Namn", "Email", "Lösenord", "Roll"]}
                        data={filteredUsers}
                        actions={[
                            ({ rowData }) => (
                                <DeleteButton onClick={() => handleDelete(rowData.email)} />
                            )
                        ]}
                        renderCell={(column, rowData) => {
                            if (column === "Lösenord") {
                                return (
                                    <PasswordResetButton 
                                        userEmail={rowData.email} 
                                        onReset={handleResetPassword} 
                                    />
                                );
                            }
                            return rowData[column.toLowerCase()];
                        }}
                    />
                </div>

                {/* 🔹 Modal för lösenordsåterställning */}
                {showModal && (
                    <ResetPasswordModal 
                        userEmail={selectedUser} 
                        onClose={() => setShowModal(false)} 
                    />
                )}
            </main>
        </div>
    );
}

export default AdminSettings;
