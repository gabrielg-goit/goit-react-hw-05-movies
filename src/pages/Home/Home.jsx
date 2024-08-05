import React, { useState, useEffect } from 'react';
import { fetchTrending } from 'services/api';
import Loader from 'components/Loader/Loader';
import styles from './Home.module.css';
import { useLocation } from 'react-router-dom';
import MovieList from 'components/MovieList/MovieList';

function Home() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const movies = await fetchTrending();
        setMovies(movies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      <div>
        <h2 className={styles.movieTitle}>Trending today</h2>
        <MovieList movies={movies} prevLocation={location} />
      </div>
    </>
  );
}

export default Home;
