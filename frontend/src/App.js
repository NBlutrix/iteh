import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Movies from './components/Movies';
import Genres from './components/Genres';
import Reviews from './components/Reviews';
import Watchlist from './components/Watchlist';
import api from './api';

function App() {
  const [user, setUser] = useState(null);

  // Proveri da li je token validan pri startu
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user');
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div>
        <Register onRegister={() => {}} />
        <Login onLogin={setUser} />
      </div>
    );
  }

  return (
    <div>
      <Profile user={user} setUser={setUser} />
      <Movies />
      <Genres />
      <Reviews />
      <Watchlist />
    </div>
  );
}

export default App;
