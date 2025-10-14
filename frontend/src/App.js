import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Movies from './components/Movies';
import Genres from './components/Genres';
import Reviews from './components/Reviews';
import Watchlist from './components/Watchlist';

function App() {
  return (
    <div>
      <Register />
      <Login />
      <Profile />
      <Movies />
      <Genres />
      <Reviews />
      <Watchlist />
    </div>
  );
}

export default App;
