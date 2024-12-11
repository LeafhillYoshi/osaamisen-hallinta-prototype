import React, {useState} from "react";

// Dummy data for admin and user accounts
const dummyAdminLogin = {
    username: 'admin',
    password: '1234',
    isAdmin: true
}

const dummyUserLogin = {
    username: 'testuser',
    password: '12345',
    isAdmin: false,
    name: "John Doe",
    education: "Vaasa University of Applied Sciences",
    educationDegree: "Bachelor of Engineering",
    graduationYear: 2020,
    projectExperience: "Backend, Frontend",
    technologies: "React, Node.js",
    certifications: "AWS Certified Developer",
    yearsWorked: 5,
    startingYear: 2019
}

// Login component
const Login = ({onLogin, onError}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Login handler
    const loginHandler = (event) => {
        event.preventDefault();
        let account;
        
        // Check if the entered username and password match the dummy data
        if (username === dummyAdminLogin.username && password === dummyAdminLogin.password) {
            account = dummyAdminLogin;
            setError("");
            onLogin(account);
        }
        else if (username === dummyUserLogin.username && password === dummyUserLogin.password) {
            account = dummyUserLogin;
            setError("");
            onLogin(account);
        }
        else {
            const errorMessage = "Login Unsuccesfull!";
            setError(errorMessage);
            onError(errorMessage);
        }

        setError("");
        onLogin(account);
    };

    // Return the login form
    // The form has two input fields for username and password
    // The form also has a submit button for logging in
    // The form also displays an error message if the login is unsuccessful
    // The form calls the loginHandler function when submitted
    // The loginHandler function checks if the entered username and password match the dummy data
    // If the entered username and password match the dummy data, the onLogin function is called
    // The onLogin function is passed the account object as an argument
    // The account object contains the username, password, and isAdmin properties
    return (
        <div>
          <h1>Login</h1>
          <form onSubmit={loginHandler}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">
              Login
            </button>
          </form>
          {error && <p style={{ color: "red"}}>{error}</p>}
        </div>
      );
}

export default Login;