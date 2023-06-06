import React from 'react';
import {Link} from 'react-router-dom';
import {dateFormater} from "../../common/DateFormater";

const MoviesCards = ({movie}) => {

    const formatedDate = dateFormater(movie.release_date);

    return (
        <div className='movies-card'>
            <div className='poster-film'>
                <Link to={`/film/${movie.id}`}>
                    <img
                        src={movie.poster_path ? 'https://image.tmdb.org/t/p/original' + movie.poster_path : '/movie-bg.png'}
                        alt={`Affiche ${movie.title}`}
                    />
                </Link>
            </div>
            <Link to={`/film/${movie.id}`}>
                <div className='first-infos'>
                    <h2>{movie ? movie.title : ''}</h2>
                    <div className='date-and-note'>
                        <h4>
                            Sorti le{' '}
                            {movie.release_date ? formatedDate : ''}
                        </h4>
                        <h4 className='voteAverage'>
                            &nbsp;{movie ? '• ' + movie.vote_average.toFixed(1) : ''}/10{' '}
                            <span>⭐</span>
                        </h4>
                    </div>
                    <div className='synopsis'>
                        <p>{movie ? movie.overview : ''}</p>
                    </div>
                </div>
            </Link>
        </div>);
};

export default MoviesCards;
