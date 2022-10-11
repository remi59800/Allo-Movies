import React from 'react';
import InputSearch from '../../components/InputSearch/InputSearch';
import SearchButton from '../../components/SearchButton/SearchButton';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <div
        className='search-banner-bg'
        style={{
          backgroundImage:
            'url(' +
            'https://image.tmdb.org/t/p/original//3uM41OT0RfBkE6Gb6U89LEskJBr.jpg' +
            ')',
          backgroundPosition: 'top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='search-banner'>
          <h1>Bienvenue sur Kult Film Club,</h1>
          <h2>L'espace dédié au cinéma et ses films cultes !</h2>
          <div className='inputs-container'>
            <InputSearch ref={searchInputRef} onKeyDown={handleKeyDown} />
            <SearchButton onClick={handleSearch} />
          </div>
        </div>
      </div>
      <div className='chronikults-container'>
        <h2>Chroni'Kult</h2>
        <p>Section en consctruction</p>
      </div>
    </div>
  );
};

export default Home;
