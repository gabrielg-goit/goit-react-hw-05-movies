import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'services/api';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const MovieReviews = async () => {
      try {
        setIsLoading(true);
        const movie = await fetchMovieReviews(movieId);
        setReviews(movie);
      } catch (error) {
        setError('Something went wrong...');
      } finally {
        setIsLoading(false);
      }
    };
    MovieReviews();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map(review => (
            <li key={review.id} className={styles.reviewItem}>
              <h3 className={styles.reviewAuthor}>Author: {review.author} </h3>
              <p className={styles.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h2>We don't have any reviews for this movie.</h2>
      )}
    </>
  );
};

export default Reviews;
