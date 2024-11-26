import React, {useState} from 'react';
import Login from './components/Login';
import LoggedIn from './components/LoggedIn';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);


  return (
      <div>
        {loggedInUser ? (
          <LoggedIn username={loggedInUser} onLogout={() => setLoggedInUser(null)} />
        ) : (
          <Login onLogin={(username) => setLoggedInUser(username)} />
        )}
    </div>
  );
}

export default App;