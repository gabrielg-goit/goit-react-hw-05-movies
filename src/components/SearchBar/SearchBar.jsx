import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuerySearch = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Enter the film title');
    }

    onSearch(searchQuery);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const savedSearchQuery = queryParams.get('query');
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }
  }, [location.search]);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          name="searchQuery"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search..."
          onChange={handleQuerySearch}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </>
  );
};

SearchBar.protoType = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
