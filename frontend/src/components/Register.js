import React, { useState } from 'react';
import api from '../api';

export default function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleRegister = async () => {
    try {
      await api.post('/register', { 
        name, email, password, password_confirmation: passwordConfirmation 
      });
      alert('Registered! Please login now.');
      onRegister(); // za reset parent state ako je potrebno
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="Confirm Password" type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
