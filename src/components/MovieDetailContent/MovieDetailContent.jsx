import {useEffect, useMemo, useState} from 'react';
import ButtonPlay from "../ButtonPlay/ButtonPlay";
import ButtonFav from "../ButtonFav/ButtonFav";
import "../../components/ButtonFav/_ButtonFav.scss";
import "../../components/ButtonPlay/_ButtonPlay.scss";
import {dateFormater} from "../../common/DateFormater";
import axios from "axios";

function MovieDetailContent({id}) {

    const [movieData, setMovieData] = useState('');
    const [movieCast, setMovieCast] = useState([]);
    const [movieDirector, setMovieDirector] = useState('');
    const [trailer, setTrailer] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        const [movieDataResponse, creditsResponse, videoResponse] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`),
            axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`),
            axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`),
        ]);
        const filteredResults = videoResponse.data.results.filter((video) => {
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
    };

    useEffect(() => {
        setIsLoading(false);
        fetchData();
        setIsLoading(false);
    }, [id]);

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


    const formatedDate = dateFormater(movieData?.release_date ?? '');

    return (
    <>
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

            }}>
            <div className='movie-details'>
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
                        {trailer && <ButtonPlay trailer={trailer}/>}
                        <ButtonFav id={id}/>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default MovieDetailContent;