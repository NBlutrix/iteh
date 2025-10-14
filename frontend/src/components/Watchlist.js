import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [movie_id, setMovieId] = useState('');

  const fetchWatchlist = async () => {
    try {
      const res = await api.get('/watchlists');
      setWatchlist(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const addToWatchlist = async () => {
    try {
      await api.post('/watchlists', { movie_id });
      setMovieId('');
      fetchWatchlist();
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div>
      <h2>Watchlist</h2>
      <input placeholder="Movie ID" value={movie_id} onChange={e => setMovieId(e.target.value)} />
      <button onClick={addToWatchlist}>Add to Watchlist</button>
      <ul>
        {watchlist.map(w => <li key={w.id}>Movie ID: {w.movie_id}</li>)}
      </ul>
    </div>
  );
}
