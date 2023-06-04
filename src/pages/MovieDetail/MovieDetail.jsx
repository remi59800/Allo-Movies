import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Youtube from 'react-youtube';
import 'swiper/css/zoom';
import SwiperMovies from "../../components/Swiper/SwiperMovies";
import "../../components/Swiper/_swiper.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import ButtonFav from "../../components/ButtonFav/ButtonFav";


const MovieDetail = () => {
    const [movieData, setMovieData] = useState('');
    const [movieCast, setMovieCast] = useState([]);
    const [movieDirector, setMovieDirector] = useState('');
    const [trailer, setTrailer] = useState('');
    const [playing, setPlaying] = useState(false);
    const [recommendMovie, setRecommendMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams();

    useEffect(() => {
        setPlaying(false);
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [movieDataResponse, creditsResponse, videoResponse, recommendationsResponse] = await Promise.all([axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`), axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`), axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`), axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR&page=1`),]);
            const filteredResults = videoResponse.data.results.filter(video => {
                const name = video.name.toLowerCase();
                return name.includes('bande') || name.includes('trailer') || name.includes('bande-annonce') || name.includes('annonce');
            });
            setMovieData(movieDataResponse.data);
            setMovieCast(creditsResponse.data.cast);
            setMovieDirector(creditsResponse.data.crew.find((dir) => dir.job === 'Director'));
            if (filteredResults.length > 0) {
                setTrailer(filteredResults[0]);
            } else {
                setTrailer(videoResponse.data.results[0]);
            }
            setRecommendMovie(recommendationsResponse.data.results);
        };
        setIsLoading(false);
        fetchData();
        setIsLoading(false);
    }, [id]);

    const dateFormater = (date) => {
        let [yy, mm, dd] = date.split('-');
        return [dd, mm, yy].join('/');
    };

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

    const imgMovie = {
        originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    };

    const backgroundImage = useMemo(() => {
        if (isLoading) {
            return 'none';
        }
        if (screenWidth > 550 && movieData.backdrop_path) {
            return `url(${imgMovie.originalImage(movieData.backdrop_path)})`;
        } else if (screenWidth > 550 && !movieData.backdrop_path) {
            return `url('/movie-bg.png')`;
        } else {
            return 'none'
        }
    }, [screenWidth, movieData.backdrop_path]);


    const backgroundImageMobile = useMemo(() => {
        if (isLoading) {
            return 'none';
        }
        if (movieData.backdrop_path) {
            return imgMovie.originalImage(movieData.backdrop_path);
        } else if (!movieData.backdrop_path) {
            return '/movie-bg.png';
        } else {
            return 'none'
        }
    }, [movieData.backdrop_path]);


    return <div className='details'>
        <img
            className="backdrop-film-mobile"
            src={backgroundImageMobile}
            alt={`Affiche de ${movieData.title}`}
        />
        <div
            className='movie-details-bg'
            style={{
                backgroundImage: backgroundImage,
                backgroundPosition: 'right top',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',

            }}
        >


            <div className='movie-details'>
                {movieData.poster_path && <img
                    className="poster-film"
                    src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                    alt={`Affiche de ${movieData.title}`}
                />}
                <div className='movie-infos'>
                    <h2>{movieData ? movieData.title : null}</h2>
                    <div className='tagline'>
                        <h4>{movieData ? movieData.tagline : null}</h4>
                    </div>

                    <div className='date-duration-genre'>
                        <div className='date'>
                            <h4>
                                {movieData ? dateFormater(movieData.release_date) + ' •' : null}
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
                                {movieData && movieData.genres ? movieData.genres
                                    .slice(0, 3)
                                    .map(function (genre) {
                                        return genre.name;
                                    })
                                    .join(', ') : null}
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
                    {movieData.overview ? <div className='synopsis-text'>
                        <h3>{movieData.overview ? `Synopsis` : null}</h3>
                        <p>{movieData ? movieData.overview : null}</p>
                    </div> : null}
                    <div className='buttons-play-and-fav'>
                        {trailer ? <div>
                            {playing ? (<div className='youtube-container'>
                                    <Youtube
                                        videoId={trailer.key}
                                        className={'youtube'}
                                        opts={{
                                            width: '100%', height: '540px', playerVars: {
                                                autoplay: 1, controls: 1,
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
                                </div>) : (<div className='trailer'>
                                    <button
                                        className={'button-play-video'}
                                        onClick={() => setPlaying(true)}
                                        type='button'
                                    >
                                        <FontAwesomeIcon icon={faPlay} className="play-icon"/>
                                        Trailer
                                    </button>
                                </div>)}
                        </div> : null}
                        <ButtonFav id={id}/>
                    </div>
                </div>
            </div>
        </div>
        <div className='recommandations-container'>
            <div className='recommendation-title'>
                <h2>Recommandations</h2>
            </div>
            <div className='movie-recommendation-list'>
                {recommendMovie.length > 0 ? <SwiperMovies items={recommendMovie}></SwiperMovies> :
                    <p className="no-recommandations">Pas de recommandations trouvées</p>}
            </div>
        </div>
    </div>;
};

export default MovieDetail;
