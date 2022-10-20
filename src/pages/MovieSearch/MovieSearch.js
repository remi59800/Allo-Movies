import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MoviesCards from '../../components/MoviesCards/MoviesCards';
import Pagination from '../../components/SearchPagination/Pagination';

const MovieSearch = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);

  const { state } = useLocation();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=2f29d9bc9f76a597232a8a514e956b12&query=${state.searchResult}&page=${currentPage}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));

    // eslint-disable-next-line
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = moviesData.slice(indexOfFirstMovie, indexOfLastMovie);
  const numberOfPages = Math.ceil(moviesData.length / moviesPerPage);

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
    <div className='search-result-page'>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <input type='submit' value='🔍' />
          <input
            type='text'
            placeholder={state.searchResult}
            id='search-input'
            value={searchMovie}
            onChange={handleOnChange}
          />
        </form>
      </div>
      <h2>Résultats de la recherche</h2>
      <div className='result'>
        {currentMovies.map((movie) => {
          return <MoviesCards movie={movie} key={movie.id} />;
        })}
      </div>
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MovieSearch;
