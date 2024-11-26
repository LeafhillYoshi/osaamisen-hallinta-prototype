import React from "react";

const LoggedIn = ({username, onLogout}) => {
    return (
        <div>
            <h1>User logged in: {username}</h1>
            <button onClick={onLogout}>Log Off</button>
        </div>
    );
};

export default LoggedIn;