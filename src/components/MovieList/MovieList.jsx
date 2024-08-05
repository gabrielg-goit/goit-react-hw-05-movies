import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieList.module.css';
import MovieCard from 'components/MovieCard/MovieCard';

const MovieList = ({ movies, prevLocation }) => {
  return (
    <ul className={styles.movieList}>
      {movies?.map(movie => (
        <MovieCard key={movie.id} movie={movie} prevLocation={prevLocation} />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      posterPath: PropTypes.string,
    })
  ).isRequired,
  prevLocation: PropTypes.object.isRequired,
};

export default MovieList;
