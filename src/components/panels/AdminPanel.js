import React, { useState } from "react";
import Card from "../UI/Card";
import jsPDF from "jspdf";
import "./AdminPanel.css";

// AdminPanel component
const AdminPanel = ({ users, updateUser, addUser, onLogout }) => {

    // State variables
    const [search, setSearch] = useState("");
    const [filterCriteria, setFilterCriteria] = useState("All");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [visibleUserId, setVisibleUserId] = useState(null);

    // Event handlers
    // Handle search input
    const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

    // Filter users based on search input and filter criteria
    const handleFilter = (user) => {
        if (filterCriteria === "all") return true;
        if (filterCriteria === "technologies") return user.technologies.toLowerCase().includes(search);
        if (filterCriteria === "certifications") return user.certifications.toLowerCase().includes(search);
        if (filterCriteria === "yearsWorked") return user.yearsWorked === parseInt(search, 10);
        return true;
    };

    // Print CV of a single user
    const printCV = (user) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Add text to the document
        doc.text(`Name: ${user.name}`, 10, 10);
        doc.text(`Education: ${user.education}`, 10, 20);
        doc.text(`Education Degree: ${user.educationDegree}`, 10, 30);
        doc.text(`Graduation Year: ${user.graduationYear}`, 10, 40);
        doc.text(`Project Experience: ${user.projectExperience}`, 10, 50);
        doc.text(`Certifications: ${user.certifications}`, 10, 60);
        doc.text(`Technologies: ${user.technologies}`, 10, 70);
        doc.text(`Years Worked: ${user.yearsWorked}`, 10, 80);
        doc.text(`Starting Year: ${user.startingYear}`, 10, 90);
        
        // Save the document
        doc.save(`${user.name}_CV.pdf`);

    };

    // Print CV of all selected users
    const printAllCVs = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Add CVs of all selected users to the document
        selectedUsers.forEach((user, index) => {
            if (index > 0) {
                doc.addPage();
            }
            doc.text(`Name: ${user.name}`, 10, 10);
            doc.text(`Education: ${user.education}`, 10, 20);
            doc.text(`Education Degree: ${user.educationDegree}`, 10, 30);
            doc.text(`Graduation Year: ${user.graduationYear}`, 10, 40);
            doc.text(`Project Experience: ${user.projectExperience}`, 10, 50);
            doc.text(`Certifications: ${user.certifications}`, 10, 60);
            doc.text(`Technologies: ${user.technologies}`, 10, 70);
            doc.text(`Years Worked: ${user.yearsWorked}`, 10, 80);
            doc.text(`Starting Year: ${user.startingYear}`, 10, 90);
        });
        // Save the document
        doc.save("Selected-Users-CVs.pdf");
    };

    // Edit user information
    const editUser = (user) => {
        // Prompt user to edit user information
        const name = prompt("Edit name:", user.name);
        const education = prompt("Edit education:", user.education);
        const educationDegree = prompt("Edit education degree:", user.educationDegree);
        const graduationYear = parseInt(prompt("Edit graduation year:", user.graduationYear), 10);
        const projectExperience = prompt("Edit project experience:", user.projectExperience);
        const technologies = prompt("Edit technologies (comma-separated):", user.technologies);
        const certifications = prompt("Edit certifications (comma-separated):", user.certifications);
        const yearsWorked = parseInt(prompt("Edit years worked:", user.yearsWorked), 10);
        const startingYear = parseInt(prompt("Edit starting year:", user.startingYear), 10);

        // Update user information
        const updatedUser = {
            ...user,
            name,
            education,
            educationDegree,
            graduationYear,
            projectExperience,
            technologies,
            certifications,
            yearsWorked,
            startingYear
        };
        // Update user information in the database
        updateUser(updatedUser);
    };

    // Add a user to the list of users
    const handleAddUser = () => {
        // Prompt user to enter user information
        const name = prompt("Enter name:");
        const education = prompt("Enter education:");
        const educationDegree = prompt("Enter education degree:");
        const graduationYear = parseInt(prompt("Enter graduation year:"), 10);
        const projectExperience = prompt("Enter project experience:");
        const technologies = prompt("Enter technologies (comma-separated):");
        const certifications = prompt("Enter certifications (comma-separated):");    
        const yearsWorked = parseInt(prompt("Enter years worked:"), 10);
        const startingYear = parseInt(prompt("Enter starting year:"), 10);
        
        // Create a new user object
        const newUser = {
            id: users.length + 1,
            name,
            education,
            educationDegree,
            graduationYear,
            projectExperience,
            technologies,
            certifications,
            yearsWorked,
            startingYear
        };
        // Add the new user to the list of users
        addUser(newUser);
        console.log(newUser);
    };

    // Toggle user information visibility
    const toggleUserInfo = (userId) => {
        setVisibleUserId(visibleUserId === userId ? null : userId);
    };

    // Render the AdminPanel component
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
                <button onClick={handleAddUser}>Add User</button>
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
                                            <p><strong>Education:</strong> {user.education}</p>
                                            <p><strong>Education Degree:</strong> {user.educationDegree}</p>
                                            <p><strong>Graduation Year:</strong> {user.graduationYear}</p>
                                            <p><strong>Project Experience:</strong> {user.projectExperience}</p>
                                            <p><strong>Technologies:</strong> {user.technologies}</p>
                                            <p><strong>Certifications:</strong> {user.certifications}</p>
                                            <p><strong>Years Worked:</strong> {user.yearsWorked}</p>
                                            <p><strong>Starting Year:</strong> {user.startingYear}</p>
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