import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/auth/register', {firstname,lastname, email, password });
      // Do something with the newly created user, e.g. store the user data in state or cookies
      console.log(response.data.user);
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastname} onChange={(event) => setLastname(event.target.value)} required />
        </label>
        <br />
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
        <button type="submit">Register</button>
        {error && <div>{error}</div>}
      </form>
      </div>
);
}

export default Register;