import {useState, useEffect} from 'react';
import axios from 'axios';
import {Footer} from '../../components/Footer/Footer';
import {SwiperMovies} from "../../components/Swiper/SwiperMovies";
import "../../components/Swiper/_swiper.scss"
import {SearchBar} from "../../components/SearchBar/SearchBar";
import "../../components/SearchBar/_searchBar.scss";

export function Home() {
    // fetch des données pour les trois catégories de films dans les swipers
    const [onTheater, setOnTheater] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);

    const fetchData = async () => {
        const [onTheaterRes, upcomingRes, topRatedRes] = await Promise.all([axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR&region=FR&page=1`), axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR&region=FR&page=1`), axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR&region=FR&page=1`),]);
        setOnTheater(onTheaterRes.data.results);
        setUpcoming(upcomingRes.data.results);
        setTopRated(topRatedRes.data.results);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Affichage des différentes sections des films dans les swipers
    const Section = ({title, items}) => (<div className='container'>
        <div className='section-title'>
            <h2>{title}</h2>
        </div>
        <div className='section-list'>
            <SwiperMovies items={items}/>
        </div>
    </div>);

    return (<>
        <div
            className='search-banner-bg'
            style={{
                backgroundImage: 'url(' + 'https://image.tmdb.org/t/p/original/3uM41OT0RfBkE6Gb6U89LEskJBr.jpg' + ')',
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className='search-banner'>
                <h1>
                    Bienvenue sur <span>AlloMovies</span> !
                </h1>
                <h2>Retrouvez des millions de films...</h2>
                <SearchBar/>
            </div>
        </div>
        <Section title="Films à l'affiche" items={onTheater}/>
        <Section title="Prochainement" items={upcoming}/>
        <Section title="Films les mieux notés" items={topRated}/>
        <Footer/>
    </>);
}

