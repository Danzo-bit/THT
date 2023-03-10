import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Wallet() {
  const [balance, setBalance] = useState(0);
  const [debitAmount, setDebitAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchBalance() {
      const response = await axios.get('/api/v1/wallet/balance');
      setBalance(response.data.balance);
    }
    async function fetchUsers() {
        const response = await axios.get('/api/v1/auth/users?page=1&q=');
        setUsers(response.data.users);
    }
    fetchUsers();
    fetchBalance();
  }, []);

  async function handleDebit() {
    const amount = parseInt(debitAmount)
    const response = await axios.post('/api/v1/wallet/debit', { amount: amount });
    setBalance(response.data.balance);
    setDebitAmount(0);
  }

  async function handleCredit() {
    const amount = parseInt(creditAmount)
    const response = await axios.post('/api/v1/wallet/credit', { amount: amount });
    setBalance(response.data.balance);
    setCreditAmount(0);
  }

  return (
    <div>
      <h1>Wallet Balance: {balance}</h1>
      <label>
        Debit Amount:
        <input type="number" value={debitAmount} onChange={(event) => setDebitAmount(event.target.value)} />
      </label>
      <button onClick={handleDebit}>Debit</button>
      <br />
      <label>
        Credit Amount:
        <input type="number" value={creditAmount} onChange={(event) => setCreditAmount(event.target.value)} />
      </label>
      <button onClick={handleCredit}>Credit</button>
      <br />
      <br />
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.firstname} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wallet;
