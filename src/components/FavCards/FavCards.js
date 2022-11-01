import React from 'react';
import { Link } from 'react-router-dom';

const FavCards = ({ fav }) => {
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split('-');
    return [dd, mm, yy].join('/');
  };

  const deleteStorage = () => {
    let storedData = window.localStorage.movies.split(',');
    // eslint-disable-next-line
    let newData = storedData.filter((id) => id != fav.id);
    window.localStorage.movies = newData;
  };

  return (
    <div className='movies-cards'>
      <div className='poster-film'>
        <Link to={`/film/${fav.id}`}>
          <img
            src={
              fav.poster_path
                ? 'https://image.tmdb.org/t/p/original' + fav.poster_path
                : '/movie-bg.png'
            }
            alt={`Affiche ${fav.title}`}
          />
        </Link>
      </div>
      <div className='first-infos'>
        <Link to={`/film/${fav.id}`}>
          <h2>{fav ? fav.title : ''}</h2>
        </Link>
        <Link to={`/film/${fav.id}`}>
          <div className='date-and-note'>
            <h4>Sorti le {fav ? dateFormater(fav.release_date) + ' •' : ''}</h4>
            <h4>
              &nbsp;{fav ? fav.vote_average.toFixed(1) : ''}/10 <span>⭐</span>
            </h4>
          </div>
        </Link>
        <Link to={`/film/${fav.id}`}>
          <div className='synopsis'>
            <p>{fav ? fav.overview : ''}</p>
          </div>
        </Link>
        <button
          onClick={() => {
            deleteStorage();
            window.location.reload();
          }}
        >
          Supprimer de la liste
        </button>
      </div>
    </div>
  );
};

export default FavCards;
