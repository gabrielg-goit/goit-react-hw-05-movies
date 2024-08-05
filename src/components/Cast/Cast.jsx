import Loader from 'components/Loader/Loader';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from 'services/api';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const MovieCast = async () => {
      try {
        setIsLoading(true);
        const movie = await fetchMovieCast(movieId);
        setCast(movie);
      } catch (error) {
        setError('Something went wrong...');
      } finally {
        setIsLoading(false);
      }
    };
    MovieCast();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      <ul className={styles.castList}>
        {Array.isArray(cast) &&
          cast?.map(castEl => {
            return (
              <li key={castEl.id} className={styles.castItem}>
                <img
                  src={
                    castEl.profile_path
                      ? `https://image.tmdb.org/t/p/w300${castEl.profile_path}`
                      : { error }
                  }
                  alt={`${castEl.name} portrait`}
                />
                <p className={styles.name}>{castEl.name}</p>
                <p className={styles.character}>{castEl.character} </p>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Cast;
