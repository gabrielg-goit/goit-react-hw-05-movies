import Loader from 'components/Loader/Loader';
import MovieList from 'components/MovieList/MovieList';
import SearchBar from 'components/SearchBar/SearchBar';
import React, { useState } from 'react';
import { useEffect } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchSearchMovieByWord } from 'services/api';

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const searchRequest = searchParams.get('query');

  useEffect(() => {
    if (!searchRequest) {
      return;
    }

    const getMovie = async () => {
      try {
        setIsLoading(true);
        const movies = await fetchSearchMovieByWord(searchRequest);
        setMovies(movies);
        if (!movies.length) {
          alert('Your movies were not found!');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [searchRequest]);

  function onSubmit(value) {
    setSearchParams({ query: `${value}` });
  }

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      <SearchBar onSearch={onSubmit} />
      {movies && <MovieList movies={movies} prevLocation={location} />}
    </>
  );
}

export default Movies;
