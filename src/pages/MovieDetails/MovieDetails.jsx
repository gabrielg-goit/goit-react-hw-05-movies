import Loader from 'components/Loader/Loader';

import React, { Suspense } from 'react';

import { useEffect } from 'react';
import { useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { fetchMovieDetails } from 'services/api';

import styles from './MovieDetails.module.css';

const MovieDetails = ({ id }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => navigate(location?.state?.from ?? '/');

  useEffect(() => {
    setIsLoading(true);
    const MovieDetails = async () => {
      try {
        setIsLoading(true);
        const movie = await fetchMovieDetails(movieId);

        setMovie(movie);
      } catch (error) {
        setError('Something went wrong...');
      } finally {
        setIsLoading(false);
      }
    };
    MovieDetails();
  }, [movieId]);

  return (
    <>
      {error && <div>{error}</div>}

      <div className={styles.movie}>
        <button type="text" onClick={handleClick} className={styles.backButton}>
          Go back
        </button>
      </div>
      {isLoading && <Loader />}
      {movie && (
        <div className={styles.details}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title ?? movie.name}
          />
          <div className={styles.description}>
            <h2 className={styles.title}>{movie.title ?? movie.name}</h2>
            <p className={styles.userScore}>
              User Score: {Math.round(movie.popularity)} %{' '}
            </p>
            <h3 className={styles.overviewTitle}>Overview</h3>
            <p className={styles.overview}>{movie.overview}</p>
            <h3 className={styles.genresTitle}>Genres</h3>
            {movie.genres.map(({ id, name }) => (
              <p key={id} className={styles.genre}>
                {name}
              </p>
            ))}
          </div>
        </div>
      )}
      <div className={styles.description}>
        <h2>Additional Information</h2>
        <div className={styles.nav}>
          <NavLink
            to={`cast`}
            end
            className={`${styles.link} ${
              location.pathname.includes('cast') ? styles.active : ''
            }`}
            state={location.state}
          >
            <p>Cast</p>
          </NavLink>
          <NavLink
            to={`reviews`}
            end
            className={`${styles.link} ${
              location.pathname.includes('reviews') ? styles.active : ''
            }`}
            state={location.state}
          >
            <p>Reviews</p>
          </NavLink>
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default MovieDetails;
