// Sida: AdminSettings
// Beskrivning: Adminpanel för att hantera användare. Visar användarlista med möjlighet att lägga till, återställa lösenord och ta bort användare.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import ResetPasswordModal from "../../components/modals/ResetPasswordModal";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
import PasswordResetButton from "../../components/buttons/PasswordResetButton";
import "../../styles/Table.css";
import "../../styles/Components.css";

function AdminSettings() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showResetModal, setShowResetModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    // Hämta alla användare vid sidladdning
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/users`)
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Fel vid hämtning av användare:", err));
    }, []);

    const filteredUsers = users.filter((user) =>
        user.namn.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleResetPassword = (user) => {
        setSelectedUser(user);
        setShowResetModal(true);
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (!selectedUser) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/users/${selectedUser.email}`, {
            method: "DELETE"
        })
            .then((res) => {
                if (res.ok) {
                    setUsers(users.filter(user => user.email !== selectedUser.email));
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                } else {
                    console.error("Fel vid radering av användare");
                }
            })
            .catch((err) => console.error("Serverfel vid radering:", err));
    };

    return (
        <div className="page-container">
            <Sidebar />

            <main className="page-content">
                <Header
                    title="Admin"
                    showAddButton={true}
                    onSearch={setSearchQuery}
                    searchValue={searchQuery}
                    onAdd={() => navigate("/add-employee")}
                />

                <div className="table-container">
                    <DataTable
                        columns={["Namn", "Email", "Lösenord", "Roll"]}
                        data={filteredUsers}
                        actions={[
                            ({ rowData }) => (
                                <DeleteButton onClick={() => handleDeleteClick(rowData)} />
                            )
                        ]}
                        renderCell={(column, rowData) => {
                            if (column === "Lösenord") {
                                return (
                                    <PasswordResetButton
                                        user={rowData}
                                        onReset={() => handleResetPassword(rowData)}
                                    />
                                );
                            }
                            return rowData[column.toLowerCase()];
                        }}
                    />
                </div>

                {showResetModal && selectedUser && (
                    <ResetPasswordModal
                        userEmail={selectedUser.email}
                        onClose={() => setShowResetModal(false)}
                        onSave={() => setShowResetModal(false)}
                    />
                )}

                {showDeleteModal && (
                    <ConfirmDeleteModal
                        userEmail={selectedUser?.email}
                        userName={selectedUser?.namn}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={handleConfirmDelete}
                    />
                )}
            </main>
        </div>
    );
}

export default AdminSettings;
