import React from 'react';
import InputSearch from '../../components/InputSearch/InputSearch';
import SearchButton from '../../components/SearchButton/SearchButton';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import SearchMovie from '../../components/SearchMovie/SearchMovie';

const Home = () => {
  const searchInputRef = useRef();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const searchResult = searchInputRef.current.value;
    navigate('/recherche-films', { state: { searchResult: searchResult } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      {/* <SearchMovie /> */}
      <InputSearch ref={searchInputRef} onKeyDown={handleKeyDown} />
      <SearchButton onClick={handleSearch} />
    </div>
  );
};

export default Home;
