import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Login from './components/Login';
import AdminPanel from './components/panels/AdminPanel';
import UserPanel from './components/panels/UserPanel';
import Card from './components/UI/Card';
import './App.css';

// Dummy data
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

// App component
function App() {
  // State variables
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState(dummyPeople);
  const [error, setError] = useState("");

  // Event handlers
  // Handle login
  const handleLogin = (account) => {
    setLoggedInUser(account);
    setError("");
  };

  // Handle logout
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  // Edit user
  const userEditUser = (updatedUser) => {
    setLoggedInUser(updatedUser);
  };

  // Edit user as an admin
  const adminEditUser = (updatedUser) => {
    setUsers((users) => users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  }

  // Handle error
  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  // App code for rendering the UI
  // Uses react-router-dom for routing
  // to different panels based on the user's role
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
                    <Login onLogin={handleLogin} onError={handleError}/>
                    {error && <p className="error">{error}</p>}
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
              <AdminPanel users={users} updateUser={adminEditUser} addUser={addUser} onLogout={handleLogout} />
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