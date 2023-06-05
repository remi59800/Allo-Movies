import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import 'swiper/css/zoom';
import SwiperMovies from "../../components/Swiper/SwiperMovies";
import "../../components/Swiper/_swiper.scss"
import MovieDetailContent from "../../components/MovieDetailContent/MovieDetailContent";
import "../../components/MovieDetailContent/_movieDetailContent.scss";

const MovieDetail = () => {
    const [movieData, setMovieData] = useState('');
    const [movieCast, setMovieCast] = useState([]);
    const [movieDirector, setMovieDirector] = useState('');
    const [trailer, setTrailer] = useState('');
    const [recommendMovie, setRecommendMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams();

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
            <MovieDetailContent movieData={movieData} movieDirector={movieDirector} movieCast={movieCast} id={id}
                                trailer={trailer}/>
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
