import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

import {
  SearchbarHead,
  SearchbarForm,
  SearchbarInput,
  SearchbarButton,
} from './SearchbarStyles';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarHead>
      <SearchbarForm onSubmit={handleSubmit}>
        <SearchbarButton type="submit">
          <FaSearch className="search-icon" />
        </SearchbarButton>

        <SearchbarInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
      </SearchbarForm>
    </SearchbarHead>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
