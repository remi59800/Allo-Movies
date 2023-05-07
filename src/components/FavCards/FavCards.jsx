import React from 'react';
import {Link} from 'react-router-dom';

const FavCards = ({fav}) => {
    const dateFormater = (date) => {
        let [yy, mm, dd] = date.split('-');
        return [dd, mm, yy].join('/');
    };

    const genreFinder = () => {
        let genreArray = [];
        for (let i = 0; i < fav.genre_ids.length; i++) {
            switch (fav.genre_ids[i]) {
                case 28:
                    genreArray.push(`Action`);
                    break;
                case 12:
                    genreArray.push(`Aventure`);
                    break;
                case 16:
                    genreArray.push(`Animation`);
                    break;
                case 35:
                    genreArray.push(`Comédie`);
                    break;
                case 80:
                    genreArray.push(`Policier`);
                    break;
                case 99:
                    genreArray.push(`Documentaire`);
                    break;
                case 18:
                    genreArray.push(`Drame`);
                    break;
                case 10751:
                    genreArray.push(`Famille`);
                    break;
                case 14:
                    genreArray.push(`Fantasy`);
                    break;
                case 36:
                    genreArray.push(`Histoire`);
                    break;
                case 27:
                    genreArray.push(`Horreur`);
                    break;
                case 10402:
                    genreArray.push(`Musique`);
                    break;
                case 9648:
                    genreArray.push(`Mystère`);
                    break;
                case 10749:
                    genreArray.push(`Romance`);
                    break;
                case 878:
                    genreArray.push(`Science-fiction`);
                    break;
                case 10770:
                    genreArray.push(`Téléfilm`);
                    break;
                case 53:
                    genreArray.push(`Thriller`);
                    break;
                case 10752:
                    genreArray.push(`Guerre`);
                    break;
                case 37:
                    genreArray.push(`Western`);
                    break;
                default:
                    break;
            }
        }
        return genreArray.map((genre) => <h4 key={genre}>{genre}</h4>);
    };

    const deleteStorage = () => {
        let storedData = window.localStorage.movies.split(',');
        // eslint-disable-next-line
        let newData = storedData.filter((id) => id != fav.id);
        window.localStorage.movies = newData;
    };

    return (
        <div className='fav-cards'>
            <div className='poster-film'>
                <Link to={`/film/${fav.id}`}>
                    <img
                        src={
                            fav.poster_path
                                ? 'https://image.tmdb.org/t/p/original' + fav.backdrop_path
                                : '/movie-bg.png'
                        }
                        alt={`Affiche ${fav.title}`}
                    />
                </Link>
            </div>
            <div className='fav-infos'>
                <Link to={`/film/${fav.id}`}>
                    <div className='title-movie'>
                        <h2>{fav ? fav.title : ''}</h2>
                    </div>
                </Link>
                <div className='date'>
                    <h4>{fav ? dateFormater(fav.release_date) : ''}</h4>
                </div>
                <div className='runtime'>
                    <h4>&nbsp;{fav ? fav.runtime + ' min' : ''}</h4>
                </div>

                <div className='genre'>
                    <h4>
                        {fav.genre_ids
                            ? genreFinder()
                            : fav.genres
                                .slice(0, 2)
                                .map((genre) => genre.name)
                                .join(', ')}
                    </h4>
                </div>

                <div className='notation'>
                    <h4>⭐&nbsp;{fav ? fav.vote_average.toFixed(1) + '/10' : ''}</h4>
                </div>

                <div className='delete-fav'>
                    <button
                        className='delete-fav-button'
                        onClick={() => {
                            deleteStorage();
                            window.location.reload();
                        }}
                    >
                        ♥ <span className='delete-fav-text'>Supprimer des favoris</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FavCards;
