import React from 'react';
import api, { removeToken } from '../api';

export default function Profile({ user, setUser }) {

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      removeToken();
      setUser(null);
    } catch (err) {
      console.error(err);
      alert('Error logging out');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
