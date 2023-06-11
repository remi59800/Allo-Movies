import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import 'swiper/css/zoom';
import {SwiperMovies} from "../../components/Swiper/SwiperMovies";
import "../../components/Swiper/_swiper.scss"
import {MovieDetailContent} from "../../components/MovieDetailContent/MovieDetailContent";
import "../../components/MovieDetailContent/_movieDetailContent.scss";

export function MovieDetail () {
    const [recommendMovie, setRecommendMovie] = useState([]);

    const {id} = useParams();

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR&page=1`
            );
            setRecommendMovie(response.data.results);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, [id]);

    return (
        <div className='details'>
            <MovieDetailContent id={id}/>
            <div className='recommandations-container'>
                <div className='recommendation-title'>
                    <h2>Recommandations</h2>
                </div>
                <div className='movie-recommendation-list'>
                    {recommendMovie.length > 0 ? <SwiperMovies items={recommendMovie}></SwiperMovies> :
                        <p className="no-recommandations">Pas de recommandations trouvées</p>}
                </div>
            </div>
        </div>
    )
};