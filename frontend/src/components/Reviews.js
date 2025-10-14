import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState('');
  const [movie_id, setMovieId] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await api.get('/reviews');
      setReviews(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const addReview = async () => {
    try {
      await api.post('/reviews', { content, movie_id });
      setContent('');
      setMovieId('');
      fetchReviews();
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      <input placeholder="Movie ID" value={movie_id} onChange={e => setMovieId(e.target.value)} />
      <input placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={addReview}>Add Review</button>
      <ul>
        {reviews.map(r => <li key={r.id}>{r.content} (Movie: {r.movie_id})</li>)}
      </ul>
    </div>
  );
}
