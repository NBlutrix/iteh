import React, { useState } from 'react';
import api from '../api';

export default function Reviews() {
  const [movieId, setMovieId] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const addReview = async () => {
    try {
      await api.post(`/movies/${movieId}/reviews`, { rating, comment });
      setMovieId('');
      setRating('');
      setComment('');
      alert('Review added!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding review');
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      <input placeholder="Movie ID" value={movieId} onChange={e => setMovieId(e.target.value)} />
      <input placeholder="Rating 1-10" value={rating} onChange={e => setRating(e.target.value)} />
      <input placeholder="Comment" value={comment} onChange={e => setComment(e.target.value)} />
      <button onClick={addReview}>Add Review</button>
    </div>
  );
}
