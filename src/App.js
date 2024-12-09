import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Login from './components/Login';
import AdminPanel from './components/panels/AdminPanel';
import UserPanel from './components/panels/UserPanel';
import Card from './components/UI/Card';
import './App.css';

const dummyPeople = [
  {
    id: 1,
    name: "Alice Johnson",
    education: "Vaasa University of Applied Sciences",
    educationDegree: "Bachelor of Engineering",
    graduationYear: 2019,
    projectExperience: "Full-stack developer, Team lead",
    technologies: "React, Node.js",
    certifications: "AWS Certified Developer",
    yearsWorked: 5,
    startingYear: 2019,
  },
  {
    id: 2,
    name: "Bob Smith",
    education: "Vaasa University of Applied Sciences",
    educationDegree: "Bachelor of Engineering",
    graduationYear: 2020,
    projectExperience: "DevOps engineer",
    technologies: "Python, Django",
    certifications: "Certified Kubernetes Administrator",
    yearsWorked: 3,
    startingYear: 2021,
  },
  {
    id: 3,
    name: "Charlie Brown",
    education: "Vaasa University of Applied Sciences",
    educationDegree: "Bachelor of Engineering",
    graduationYear: 2021,
    projectExperience: "Backend developer",
    technologies: "Java, Spring",
    certifications: "Oracle Certified Professional",
    yearsWorked: 4,
    startingYear: 2020,
  },
];

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState(dummyPeople);

  const handleLogin = (account) => {
    setLoggedInUser(account);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const userEditUser = (updatedUser) => {
    setLoggedInUser(updatedUser);
  };

  const adminEditUser = (updatedUser) => {
    setUsers((users) => users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedInUser ? (
              <Navigate to={loggedInUser.isAdmin ? "/admin" : "/user"} />
            ) : (
              <div className="front-page">
                <div className="sidebar">
                  <h1>Welcome to the User Management System</h1>
                  <p>Please log in to continue</p>
                </div>
                <div className="content">
                  <Card className="login-card">
                    <Login onLogin={handleLogin} />
                  </Card>
                </div>
              </div>

            )
          }
        />
        <Route
          path="/admin"
          element={
            loggedInUser?.isAdmin ? (
              <AdminPanel users={users} updateUser={adminEditUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/user"
          element={
            loggedInUser && !loggedInUser?.isAdmin ? (
              <UserPanel user={loggedInUser} updateUser={userEditUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;