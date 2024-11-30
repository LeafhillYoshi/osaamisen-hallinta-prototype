import React, {useState} from "react";

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
    technologies: ["React", "Node.js"],
    certifications: ["AWS Certified Developer"],
    yearsWorked: 5
}

const Login = ({onLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const loginHandler = (event) => {
        event.preventDefault();
        let account;
        
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
            setError("Login Unsuccesfull!")
        }

        setError("");
        onLogin(account);
    };

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