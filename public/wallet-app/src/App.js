import './App.css';
import Login from './login';
import Register from './register';
import React, { useState } from 'react';
import Wallet from './wallet';
import axios from 'axios';

function App() {
  var [user, setUser] = useState(null);

  function handleLogin() {
    console.log('OnLogin')
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }
  async function handleLogout() {
    try{
      const response = await axios.post('/api/v1/auth/logout');
      console.log(response.data.message);
    }catch(error){
      console.log(error)
    }
    setUser(null);
  }
  return (
    <div>
      {user  ? (
        <div>
          <h2>Welcome, {user.email}!</h2>
          <button onClick={handleLogout}>Logout</button>
          {/* Display wallet balance and transaction forms */}
          <Wallet/>
        </div>
      ) : (
        <div>
          <Login onLogin={handleLogin} />
          <br></br>
          <p>No account?</p>
          <br></br>
          <br></br>
          <Register />
        </div>
      )}
    </div>
  );
}

export default App;
