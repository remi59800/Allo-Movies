import React from 'react';
import { Link } from 'react-router-dom';

const MoviesCards = ({ movie }) => {
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split('-');
    return [dd, mm, yy].join('/');
  };

  return (
    <div className='movies-cards'>
      <div className='poster-film'>
        <img
          src={
            movie.poster_path
              ? 'https://image.tmdb.org/t/p/original' + movie.poster_path
              : './image-movie.png'
          }
          alt={`Affiche ${movie.title}`}
        />
      </div>
      <div className='first-infos'>
        <h2>{movie ? movie.title : ''}</h2>

        <div className='date-and-note'>
          <h4>
            Sorti le {movie ? dateFormater(movie.release_date) + ' •' : ''}
          </h4>
          <h4>
            &nbsp;{movie ? movie.vote_average.toFixed(1) : ''}/10{' '}
            <span>⭐</span>
          </h4>
        </div>
        <div className='synopsis'>
          <p>{movie ? movie.overview : ''}</p>
        </div>
        <div className='btn-more-infos'>
          <Link to={`/film/${movie.id}`}>
            <input type='submit' value="Plus d'infos" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MoviesCards;
