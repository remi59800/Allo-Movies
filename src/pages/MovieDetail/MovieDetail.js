import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const [movieData, setMovieData] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`
      )
      .then((res) => setMovieData(res.data));
    // eslint-disable-next-line
  }, []);

  return (
    <div className='movie-details-container'>
      <div className='movie-details'>
        <div className='movie-poster'>
          <img
            src={`https://image.tmdb.org/t/p/original${
              movieData ? movieData.poster_path : ''
            }`}
            alt={`Affiche film`}
          />
        </div>
        <div className='movie-text-infos'>
          <h2>{movieData ? movieData.title : ''}</h2>

          <div className='date-duration-genre'>
            <div className='date'>
              <h4>{movieData ? movieData.release_date + ' •' : ''}</h4>
            </div>
            <div className='duration'>
              <h4>&nbsp;{movieData ? movieData.runtime + ' mins •' : ''}</h4>
            </div>
            <div className='genres'>
              <h4>
                &nbsp;
                {movieData && movieData.genres
                  ? movieData.genres
                      .map(function (genre) {
                        return genre.name;
                      })
                      .join(', ')
                  : ''}
              </h4>
            </div>
          </div>

          <h4>
            Note : {movieData ? movieData.vote_average.toFixed(1) : ''} /10{' '}
            <span>⭐ </span>
            <span className='movie-vote-count'>
              {movieData ? '(' + movieData.vote_count + ') votes' : ''}
            </span>
          </h4>
          <div className='tagline'>
            <h4>{movieData ? movieData.tagline : ''}</h4>
          </div>
          <div className='synopsis-text'>
            <h3>Synopsis</h3>
            <p>{movieData ? movieData.overview : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
