import React from 'react';
import ButtonPlay from "../ButtonPlay/ButtonPlay";
import ButtonFav from "../ButtonFav/ButtonFav";
import "../../components/ButtonFav/_ButtonFav.scss";
import "../../components/ButtonPlay/_ButtonPlay.scss";
import {dateFormater} from "../../common/DateFormater";

function MovieDetailContent({movieData, movieDirector, movieCast, trailer, id}) {
    const formatedDate = dateFormater(movieData?.release_date ?? '');

    return (<div className='movie-details'>
            {movieData.poster_path && <img
                className="poster-film"
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt={`Affiche de ${movieData.title}`}
            />}
            <div className='movie-infos'>
                <h2>{movieData && movieData.title}</h2>
                <div className='tagline'>
                    <h4>{movieData && movieData.tagline}</h4>
                </div>

                <div className='date-duration-genre'>
                    <div className='date'>
                        <h4>
                            {movieData && formatedDate + ' •'}
                        </h4>
                    </div>
                    <div className='duration'>
                        <h4>
                            &nbsp;{movieData && movieData.runtime + ' mins •'}
                        </h4>
                    </div>
                    <div className='genres'>
                        <h4>
                            &nbsp;
                            {movieData && movieData.genres && movieData.genres
                                .slice(0, 3)
                                .map(function (genre) {
                                    return genre.name;
                                })
                                .join(', ')}
                        </h4>
                    </div>
                </div>
                <div className='director'>
                    <h4>Réalisé par {movieDirector && movieDirector.name}</h4>
                </div>
                <div className='actors'>
                    <h4>
                        Acteurs :&nbsp;
                        {movieCast
                            .slice(0, 3)
                            .map((cast) => {
                                return cast.name;
                            })
                            .join(', ')}
                    </h4>
                </div>
                <div className='notation'>
                    <h4>
                        <span>⭐ </span>
                        {movieData ? movieData.vote_average.toFixed(1) : ''} /10{' '}
                        <span className='movie-vote-count'>
              {movieData && '(' + movieData.vote_count + ') votes'}
                            </span>
                    </h4>
                </div>
                {movieData.overview && <div className='synopsis-text'>
                    <h3>{movieData.overview && `Synopsis`}</h3>
                    <p>{movieData && movieData.overview}</p>
                </div>}
                <div className='buttons-play-and-fav'>
                    <ButtonPlay trailer={trailer}/>
                    <ButtonFav id={id}/>
                </div>
            </div>
        </div>);
}

export default MovieDetailContent;