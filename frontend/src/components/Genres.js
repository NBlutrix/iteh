import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState('');

  const fetchGenres = async () => {
    try {
      const res = await api.get('/genres');
      setGenres(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const addGenre = async () => {
    try {
      await api.post('/genres', { name });
      setName('');
      fetchGenres();
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div>
      <h2>Genres</h2>
      <input placeholder="Genre Name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addGenre}>Add Genre</button>
      <ul>
        {genres.map(g => <li key={g.id}>{g.name}</li>)}
      </ul>
    </div>
  );
}
