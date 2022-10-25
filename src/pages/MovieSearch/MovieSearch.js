import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MoviesCards from '../../components/MoviesCards/MoviesCards';

const MovieSearch = () => {
  const [moviesData, setMoviesData] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    if (state.query !== null) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=2f29d9bc9f76a597232a8a514e956b12&query=${state.query}&language=fr-FR`
        )
        .then((res) => setMoviesData(res.data.results));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='search-result-page'>
      <h2>Résultats de la recherche : {state.query}</h2>
      <div className='result'>
        {moviesData.map((movie) => {
          return <MoviesCards movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
};

export default MovieSearch;
