import React, {useState} from "react";

const dummyAdminLogin = {
    username: 'admin',
    password: '1234'
}

const dummyUserLogin = {
    username: 'testuser',
    password: '12345'
}

const Login = ({onLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const loginHandler = (event) => {
        event.preventDefault();
        
        if (username === dummyAdminLogin.username && password === dummyAdminLogin.password) {
            onLogin(dummyAdminLogin.username);
        }
        else if (username === dummyUserLogin.username && password === dummyUserLogin.password) {
            onLogin(dummyUserLogin.username);
        }
        else {
            setError("Login Unsuccesfull!")
        }

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