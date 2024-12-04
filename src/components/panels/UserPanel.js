import React from 'react';
import { jsPDF } from 'jspdf';
import Card from '../UI/Card';
import './UserPanel.css';

const UserPanel = ({ user, updateUser, onLogout }) => {
    const technologies = user.technologies || [];
    const certifications = user.certifications || [];
    const yearsWorked = user.yearsWorked || 0;

    const handleEdit = (field, value) => {
        updateUser({ ...user, [field]: value });
    };

    const printCV = () => {
        const doc = new jsPDF();
        doc.text(`Name: ${user.name}`, 10, 10);
        doc.text(`Certifications: ${user.certifications.join(", ")}`, 10, 20);
        doc.text(`Technologies: ${user.technologies.join(", ")}`, 10, 30);
        doc.text(`Years Worked: ${user.yearsWorked}`, 10, 40);
        doc.save(`${user.name}_CV.pdf`);
    };

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
                    <p><strong>Technologies:</strong> {technologies.join(", ") || "No technologies listed"}</p>
                    <p><strong>Certifications:</strong> {certifications.join(", ") || "No certifications listed"}</p>
                    <p><strong>Years Worked:</strong> {yearsWorked}</p>
                    <button onClick={() =>
                        handleEdit(
                            "name",
                            prompt("Edit name:", user.name)
                        )
                    }
                    >
                        Edit Name
                    </button>
                    <button
                        onClick={() =>
                            handleEdit(
                                "technologies",
                                prompt("Edit technologies (comma-separated):", user.technologies.join(", ")).split(",")
                            )
                        }
                    >
                        Edit Technologies
                    </button>
                    <button
                        onClick={() =>
                            handleEdit(
                                "certifications",
                                prompt("Edit certifications (comma-separated):", user.certifications.join(", ")).split(",")
                            )
                        }
                    >
                        Edit Certifications
                    </button>
                    <button
                        onClick={() =>
                            handleEdit(
                                "yearsWorked",
                                parseInt(prompt("Edit years worked:", user.yearsWorked), 10)
                            )
                        }
                    >
                        Edit Years Worked
                    </button>
                </Card>
            </div>
        </div>
    );
};

export default UserPanel;