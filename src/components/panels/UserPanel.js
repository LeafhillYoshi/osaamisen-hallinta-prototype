import React from 'react';
import { jsPDF } from 'jspdf';
import Card from '../UI/Card';
import './UserPanel.css';

// UserPanel component
const UserPanel = ({ user, updateUser, onLogout }) => {
    // Destructure user object
    const education = user.education || [];
    const educationDegree = user.educationDegree || [];
    const graduationYear = user.graduationYear || 0;
    const projectExperience = user.projectExperience || [];
    const technologies = user.technologies || [];
    const certifications = user.certifications || [];
    const yearsWorked = user.yearsWorked || 0;
    const startingYear = user.startingYear || 0;

    // Edit user profile
    const editUser = (user) => {
        // Prompt user to edit profile
        const name = prompt("Edit name:", user.name);
        const education = prompt("Edit education:", user.education);
        const educationDegree = prompt("Edit education degree:", user.educationDegree);
        const graduationYear = parseInt(prompt("Edit graduation year:", user.graduationYear), 10);
        const projectExperience = prompt("Edit project experience:", user.projectExperience);
        const technologies = prompt("Edit technologies:", user.technologies);
        const certifications = prompt("Edit certifications:", user.certifications);
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

    // Print CV
    const printCV = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Add user information to the document
        doc.text(`Name: ${user.name}`, 10, 10);
        doc.text(`Education: ${user.education}`, 10, 20);
        doc.text(`Education Degree: ${user.educationDegree}`, 10, 30);
        doc.text(`Graduation Year: ${user.graduationYear}`, 10, 40);
        doc.text(`Project Experience: ${user.projectExperience}`, 10, 50);
        doc.text(`Certifications: ${user.certifications}`, 10, 60);
        doc.text(`Technologies: ${user.technologies}`, 10, 70);
        doc.text(`Years Worked: ${user.yearsWorked}`, 10, 80);
        doc.text(`Starting Year: ${user.startingYear}`, 10, 90);
        doc.save(`${user.name}_CV.pdf`);
    };
    
    // Return the user panel
    // The user panel displays the user's profile information
    // The user panel also has buttons for printing the CV, logging off
    // and editing the user profile.
    // The user panel is displayed when the user is logged in.
    return (
        <div className="user-panel">
            <div className="sidebar">
                <h1>User Panel</h1>
                <p>Name: {user.name}</p>
                <button onClick={printCV}>Print CV</button>
                <button onClick={onLogout}>Log Off</button>
            </div>
            <div className="content">
                <Card className="user-card">
                    <h2>Your Profile</h2>
                    <p><strong>Education:</strong>{education || "No education listed"}</p>
                    <p><strong>Education Degree:</strong>{educationDegree || "No degree listed"}</p>
                    <p><strong>Graduation Year:</strong>{graduationYear}</p>
                    <p><strong>Project Experience:</strong> {projectExperience || "No experience listed"}</p>
                    <p><strong>Technologies:</strong> {technologies || "No technologies listed"}</p>
                    <p><strong>Certifications:</strong> {certifications || "No certifications listed"}</p>
                    <p><strong>Years Worked:</strong> {yearsWorked}</p>
                    <p><strong>Starting Year:</strong> {startingYear}</p>
                    <button onClick={() => editUser(user)}>Edit Profile</button>
                </Card>
            </div>
        </div>
    );
};

export default UserPanel;