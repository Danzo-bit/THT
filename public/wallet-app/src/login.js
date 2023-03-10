import React, { useState } from 'react';
import axios from 'axios';

function Login({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/auth/login', { email, password });
      // Do something with the authenticated user, e.g. store the user data in state or cookies
      console.log(response.data.user);
      const user = response.data.user
      localStorage.setItem('user', JSON.stringify(user));
      onLogin();
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <br />
        <button type="submit" >Login</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default Login;
