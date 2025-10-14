import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Watchlist() {
  const [movieId, setMovieId] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const res = await api.get('/watchlists');
      setWatchlist(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error fetching watchlist');
    }
  };

  const addToWatchlist = async () => {
    try {
      await api.post('/watchlists', { movie_id: movieId });
      setMovieId('');
      fetchWatchlist();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding to watchlist');
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div>
      <h2>Watchlist</h2>
      <input placeholder="Movie ID" value={movieId} onChange={e => setMovieId(e.target.value)} />
      <button onClick={addToWatchlist}>Add to Watchlist</button>
      <ul>
        {watchlist.map(w => <li key={w.id}>{w.movie.title}</li>)}
      </ul>
    </div>
  );
}
