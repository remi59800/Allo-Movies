import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ movie }) => {
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split('-');
    return [dd, mm, yy].join('/');
  };

  return (
    <div className='movies-cards'>
      <div className='poster-film'>
        <img
          src={'https://image.tmdb.org/t/p/original' + movie.poster_path}
          alt={`Affiche ${movie.title}`}
        />
      </div>
      <div className='first-infos'>
        <h2>{movie.title}</h2>

        <div className='date-and-note'>
          <h4>Sorti le {dateFormater(movie.release_date)} - </h4>
          <h4>
            Note : {movie.vote_average.toFixed(1)}/10 <span>⭐</span>
          </h4>
        </div>
        <div className='synopsis'>
          <p>{movie.overview}</p>
        </div>
        <Link to={`/movie/${movie.id}`}>
          <div className='btn'>
            <input type='submit' value="Plus d'infos" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
