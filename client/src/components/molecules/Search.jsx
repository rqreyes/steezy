import React, { useState } from 'react';
import Input from '../atoms/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledButton = styled.button`
  color: #fff;
  background: #222;
`;

const Search = ({ searchClassList }) => {
  const [search, setSearch] = useState('');

  const searchClass = async (evt) => {
    evt.preventDefault();
    searchClassList(search);
    setSearch('');
  };

  return (
    <form onSubmit={searchClass}>
      <Input
        type='text'
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        required
      />
      <StyledButton type='submit'>
        <FontAwesomeIcon icon={faSearch} />
      </StyledButton>
    </form>
  );
};

export default Search;
