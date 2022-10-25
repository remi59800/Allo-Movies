import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleOnChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/films/langage=fr&recherche=${query}`, {
      state: { query: query },
    });
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
            <form onSubmit={handleSearch}>
              <input
                type='text'
                placeholder='Rechercher un film...'
                value={query}
                onChange={handleOnChange}
              />
              <input type='submit' value='Search' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
