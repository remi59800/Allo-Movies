import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MoviesCards from '../../components/MoviesCards/MoviesCards';

const MovieSearch = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [sortGoodBad, setSortGoodBad] = useState(null);
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

  let resultNumber = moviesData.length;

  return (
    <div className='search-result-page'>
      <div className='results-and-topflop'>
        <div className='results'>
          <h2>Résultats de votre recherche</h2>
        </div>
        <div className='top-flop-container'>
          <p>
            Parmi les {resultNumber} films trouvés, classez-les du plus au moins
            bien noté
          </p>
          <div className='btn-sort-container'>
            <div
              className='btn-sort'
              id='goodToBad'
              onClick={() => setSortGoodBad('goodToBad')}
            >
              Top&nbsp;
            </div>
            <div
              className='btn-sort'
              id='badToGood'
              onClick={() => setSortGoodBad('badToGood')}
            >
              Flop&nbsp;
            </div>
          </div>
        </div>
      </div>
      <div className='result'>
        {moviesData
          // eslint-disable-next-line
          .sort((a, b) => {
            if (sortGoodBad === 'goodToBad') {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === 'badToGood') {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => {
            return <MoviesCards movie={movie} key={movie.id} />;
          })}
      </div>
    </div>
  );
};

export default MovieSearch;
