import React, { useState } from 'react';
import Input from '../atoms/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 512px;
`;

const StyledInput = styled(Input)`
  background: #ebefee;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 0;
  border-radius: 4px 0 0 4px;
  margin-bottom: 0;
`;

const StyledButton = styled.button`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 31px;
  color: #fff;
  background: #222;
  border: 0;
  border-radius: 0 4px 4px 0;

  &:hover {
    background: #0a78fb;
  }

  svg {
    font-size: 18px !important;
  }
`;

const Search = ({ searchClassList }) => {
  const [search, setSearch] = useState('');

  // send search input to ClassList component
  const searchClass = (evt) => {
    evt.preventDefault();
    searchClassList(search);
    setSearch('');
  };

  return (
    <StyledForm onSubmit={searchClass}>
      <StyledInput
        type='text'
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        required
      />
      <StyledButton type='submit'>
        <FontAwesomeIcon icon={faSearch} />
      </StyledButton>
    </StyledForm>
  );
};

export default Search;
