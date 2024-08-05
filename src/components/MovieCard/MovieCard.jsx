import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

function MovieCard({ movie, prevLocation }) {
  return (
    <li className={styles.movieItem}>
      <Link
        to={`/movies/${movie.id}`}
        state={{ from: prevLocation }}
        className={styles.movieLink}
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
              : {}
          }
          alt={movie.title || movie.name}
          className={styles.movieImage}
        />
        <p className={styles.movieTitle}>{movie.title || movie.name}</p>
      </Link>
    </li>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    posterPath: PropTypes.string,
  }).isRequired,
  prevLocation: PropTypes.object.isRequired,
};

export default MovieCard;
