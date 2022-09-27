import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MoviesCards from '../../components/MoviesCards/MoviesCards';

const MovieSearch = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const { state } = useLocation();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=2f29d9bc9f76a597232a8a514e956b12&query=${state.searchResult}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  }, []);

  const handleOnChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchMovie(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    return await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=2f29d9bc9f76a597232a8a514e956b12&query=${searchMovie}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  };

  return (
    <div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder={state.searchResult}
            id='search-input'
            value={searchMovie}
            onChange={handleOnChange}
          />
          <input type='submit' value='Rechercher' />
        </form>
      </div>
      <div className='result'>
        {moviesData.slice(0, 12).map((movie) => {
          return <MoviesCards movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
};

export default MovieSearch;
