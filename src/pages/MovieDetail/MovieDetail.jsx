import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Youtube from 'react-youtube';
import 'swiper/css/zoom';
import SwiperMovies from "../../components/Swiper/SwiperMovies";


const MovieDetail = () => {
    const [movieData, setMovieData] = useState('');
    const [movieCast, setMovieCast] = useState([]);
    const [movieDirector, setMovieDirector] = useState('');
    const [trailer, setTrailer] = useState('');
    const [playing, setPlaying] = useState(false);
    const [recommendMovie, setRecommendMovie] = useState([]);
    const [iconActive, setIconActive] = useState('♡');
    const [isStored, setIsStored] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        setPlaying(false);
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const [movieDataResponse, creditsResponse, videoResponse, recommendationsResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`),
                axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`),
                axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`),
                axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR&page=1`),
            ]);

            setMovieData(movieDataResponse.data);
            setMovieCast(creditsResponse.data.cast);
            setMovieDirector(creditsResponse.data.crew.find((dir) => dir.job === 'Director'));
            setTrailer(videoResponse.data.results[0]);
            setRecommendMovie(recommendationsResponse.data.results);
        };

        fetchData();
    }, [id]);

    const dateFormater = (date) => {
        let [yy, mm, dd] = date.split('-');
        return [dd, mm, yy].join('/');
    };

    const imgBackground = {
        originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    };

    const addStorage = () => {
        let storedData = window.localStorage.movies ? window.localStorage.movies.split(',') : [];
        if (!storedData.includes(id.toString())) {
            storedData.push(id.toString());
            window.localStorage.movies = storedData.join(',');
            setIsStored(true);
        } else {
            setIsStored(false);
            deleteStorage();
        }
    };

    const deleteStorage = () => {
        let storedData = window.localStorage.movies.split(',');
        let newData = storedData.filter((storedId) => storedId !== id.toString());
        window.localStorage.movies = newData.join(',');
        setIsStored(false);
    };

    const handleStorageChange = useCallback(() => {
        let storedData = window.localStorage.movies ? window.localStorage.movies.split(',') : [];
        setIsStored(storedData.includes(id.toString()));
    }, [id]);

    useEffect(() => {
        handleStorageChange();
        setIconActive(isStored ? '♥' : '♡');
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [handleStorageChange, isStored]);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='details'>
            <img
                className="backdrop-film-mobile"
                src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
                alt={`Affiche de ${movieData.title}`}
            />
            <div
                className='movie-details-bg'
                style={{
                    backgroundImage: screenWidth > 550 ? `url(${imgBackground.originalImage(movieData.backdrop_path)})` : null,
                    backgroundPosition: 'right top',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',

                }}
            >

                <div className='movie-details'>
                    <img
                        className="poster-film"
                        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                        alt={`Affiche de ${movieData.title}`}
                    />
                    <div className='movie-infos'>
                        <h2>{movieData ? movieData.title : null}</h2>
                        <div className='tagline'>
                            <h4>{movieData ? movieData.tagline : null}</h4>
                        </div>

                        <div className='date-duration-genre'>
                            <div className='date'>
                                <h4>
                                    {movieData
                                        ? dateFormater(movieData.release_date) + ' •'
                                        : null}
                                </h4>
                            </div>
                            <div className='duration'>
                                <h4>
                                    &nbsp;{movieData ? movieData.runtime + ' mins •' : null}
                                </h4>
                            </div>
                            <div className='genres'>
                                <h4>
                                    &nbsp;
                                    {movieData && movieData.genres
                                        ? movieData.genres
                                            .slice(0, 3)
                                            .map(function (genre) {
                                                return genre.name;
                                            })
                                            .join(', ')
                                        : null}
                                </h4>
                            </div>
                        </div>
                        <div className='director'>
                            <h4>Réalisé par {movieDirector ? movieDirector.name : null}</h4>
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
                  {movieData ? '(' + movieData.vote_count + ') votes' : null}
                </span>
                            </h4>
                        </div>
                        {movieData.overview ? (
                            <div className='synopsis-text'>
                                <h3>{movieData.overview ? `Synopsis` : null}</h3>
                                <p>{movieData ? movieData.overview : null}</p>
                            </div>
                        ) : null}
                        <div className='buttons-play-and-fav'>
                            {trailer ? (
                                <div>
                                    {playing ? (
                                        <div className='youtube-container'>
                                            <Youtube
                                                videoId={trailer.key}
                                                className={'youtube'}
                                                opts={{
                                                    width: '100%',
                                                    height: '540px',
                                                    playerVars: {
                                                        autoplay: 1,
                                                        controls: 1,
                                                    },
                                                }}
                                            />
                                            <div
                                                className='close-container'
                                                onClick={() => setPlaying(false)}
                                            >
                                                <div className='leftright'></div>
                                                <div className='rightleft'></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='trailer'>
                                            <button
                                                className={'button-play-video'}
                                                onClick={() => setPlaying(true)}
                                                type='button'
                                            >
                                                Trailer
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                            <div>
                                <button className='button-fav'
                                        onClick={() => iconActive === '♡' ? addStorage() : deleteStorage()}>
                                    {iconActive} &nbsp;&nbsp;&nbsp;Favoris
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='recommandations-container'>
                <div className='recommendation-title'>
                    <h2>Recommandations</h2>
                </div>
                <div className='movie-recommendation-list'>
                    {recommendMovie.length > 0 ? (
                        <SwiperMovies items={recommendMovie}></SwiperMovies>
                    ) : (
                        <p>Pas de recommandations trouvées</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
