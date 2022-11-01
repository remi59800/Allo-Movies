import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [trending, setTrending] = useState([]);

  const handleOnChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/films/langage=fr&recherche=${query}`, {
      state: { query: query },
    });
  };

  useEffect(() => {
    axios
      .get(
        `
        https://api.themoviedb.org/3/trending/all/week?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`
      )
      .then((res) =>
        setTrending(
          res.data.results.filter((movie) => movie.media_type === 'movie')
        )
      );

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div
        className='search-banner-bg'
        style={{
          backgroundImage:
            'url(' +
            'https://image.tmdb.org/t/p/original//3uM41OT0RfBkE6Gb6U89LEskJBr.jpg' +
            ')',
          backgroundPosition: 'top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='search-banner'>
          <h1>Bienvenue sur Kult Film Club,</h1>
          <h2>L'espace dédié au cinéma et ses films cultes !</h2>
          <div className='inputs-container'>
            <form onSubmit={handleSearch}>
              <input
                type='text'
                placeholder='Rechercher un film...'
                value={query}
                onChange={handleOnChange}
              />
              <input type='submit' value='Search' />
            </form>
          </div>
        </div>
      </div>
      <div className='trending-container'>
        <h3>Tendances de la semaine</h3>

        <div className='trending-list'>
          <Swiper
            grabCursor={true}
            spaceBetween={9}
            slidesPerView={'auto'}
            className='my-swiper'
          >
            {trending.map((trend) => (
              <SwiperSlide key={trend.id}>
                <Link to={`/film/${trend.id}`} reloadDocument={true}>
                  <div className='trend-cards'>
                    <img
                      src={
                        trend.poster_path !== null
                          ? 'https://image.tmdb.org/t/p/original' +
                            trend.poster_path
                          : '/movie-bg.png'
                      }
                      alt={`Affiche ${trend.title}`}
                    />
                    <h4>{trend.title}</h4>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
