import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');

  const fetchMovies = async () => {
    try {
      const res = await api.get('/movies');
      setMovies(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const addMovie = async () => {
    try {
      await api.post('/movies', { title });
      setTitle('');
      fetchMovies();
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addMovie}>Add Movie</button>
      <ul>
        {movies.map(m => <li key={m.id}>{m.title}</li>)}
      </ul>
    </div>
  );
}
