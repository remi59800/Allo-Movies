import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

const SearchMovie = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [searchMovie, setSearchMovie] = useState('code');

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=2f29d9bc9f76a597232a8a514e956b12&query=${searchMovie}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [searchMovie]);

  return (
    <div>
      <div className='form-container'>
        <form>
          <input
            type='text'
            placeholder="Entrez le titre d'un film"
            id='search-input'
            onChange={(e) => setSearchMovie(e.target.value)}
          />
          <input type='submit' value='Rechercher' />
        </form>
      </div>
      <div className='result'>
        {moviesData.slice(0, 12).map((movie) => {
          return <Card movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
};

export default SearchMovie;
