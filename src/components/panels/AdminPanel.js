import React, { useState } from "react";
import Card from "../UI/Card";
import jsPDF from "jspdf";
import "./AdminPanel.css";

const AdminPanel = ({ users, updateUser, onLogout }) => {
    const [search, setSearch] = useState("");
    const [filterCriteria, setFilterCriteria] = useState("All");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [visibleUserId, setVisibleUserId] = useState(null);

    const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

    const handleFilter = (user) => {
        if (filterCriteria === "all") return true;
        if (filterCriteria === "technologies") return user.technologies.some(tech => tech.toLowerCase().includes(search));
        if (filterCriteria === "certifications") return user.certifications.some(cert => cert.toLowerCase().includes(search));
        if (filterCriteria === "yearsWorked") return user.yearsWorked === parseInt(search, 10);
        return true;
    };

    const printCV = (user) => {
        const doc = new jsPDF();
        doc.text(`Name: ${user.name}`, 10, 10);
        doc.text(`Certifications: ${user.certifications.join(", ")}`, 10, 20);
        doc.text(`Technologies: ${user.technologies.join(", ")}`, 10, 30);
        doc.text(`Years Worked: ${user.yearsWorked}`, 10, 40);
        doc.save(`${user.name}_CV.pdf`);
    };

    const printAllCVs = () => {
        const doc = new jsPDF();
        selectedUsers.forEach((user, index) => {
            if (index > 0) {
                doc.addPage();
            }
            doc.text(`Name: ${user.name}`, 10, 10);
            doc.text(`Certifications: ${user.certifications.join(", ")}`, 10, 20);
            doc.text(`Technologies: ${user.technologies.join(", ")}`, 10, 30);
            doc.text(`Years Worked: ${user.yearsWorked}`, 10, 40);
        });
        doc.save("Selected-Users-CVs.pdf");
    };

    const editUser = (user) => {
        const name = prompt("Edit name:", user.name);
        const technologies = prompt("Edit technologies (comma-separated):", user.technologies.join(", ")).split(",");
        const certifications = prompt("Edit certifications (comma-separated):", user.certifications.join(", ")).split(",");
        const yearsWorked = parseInt(prompt("Edit years worked:", user.yearsWorked), 10);

        const updatedUser = {
            ...user,
            name,
            technologies,
            certifications,
            yearsWorked
        };

        return updatedUser;
    };

    const toggleUserInfo = (userId) => {
        setVisibleUserId(visibleUserId === userId ? null : userId);
    };

    return (
        <div className="admin-panel">
            <div className="sidebar">
                <h1>Admin Panel</h1>
                <input type="text" placeholder="Search..." value={search} onChange={handleSearch} />
                <select onChange={(e) => setFilterCriteria(e.target.value)}>
                    <option value="all">All</option>
                    <option value="technologies">Technologies</option>
                    <option value="certifications">Certifications</option>
                    <option value="yearsWorked">Years Worked</option>
                </select>
                <button onClick={() => setSelectedUsers(users)}>Select All Users</button>
                <button onClick={() => setSelectedUsers([])}>Clear Selected Users</button>
                <button onClick={printAllCVs}>Print Selected CVs</button>
                <button onClick={onLogout}>Log out</button>
            </div>
            <div className="content">
                <div className="card-container">
                    {users.filter(handleFilter).map((user) => (
                        <Card key={user.id} className="user-card">
                            <div className="card-content">
                                <li key={user.id}>
                                    {user.name}
                                    {visibleUserId === user.id && (
                                        <div className="user-info">
                                            <p><strong>Technologies:</strong> {user.technologies.join(", ")}</p>
                                            <p><strong>Certifications:</strong> {user.certifications.join(", ")}</p>
                                            <p><strong>Years Worked:</strong> {user.yearsWorked}</p>
                                        </div>
                                    )}
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user)}
                                        onChange={(e) => {
                                            if (e.target.checked) setSelectedUsers([...selectedUsers, user]);
                                            else setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser !== user));
                                        }}
                                    />
                                </li>
                            </div>
                            <div className="card-buttons">
                                <button onClick={() => toggleUserInfo(user.id)}>
                                    {visibleUserId === user.id ? "Hide User Information" : "Show User Information"}
                                </button>
                                <button onClick={() => editUser(user)}>Edit</button>
                                <button onClick={() => printCV(user)}>Print CV</button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default AdminPanel;