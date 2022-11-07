import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';
import SwiperCore, { Keyboard, Mousewheel } from 'swiper/core';
SwiperCore.use([Keyboard, Mousewheel]);

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [onTheater, setOnTheater] = useState([]);

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
        `https://api.themoviedb.org/3/movie/now_playing?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR&region=FR&page=1`
      )
      .then((res) => setOnTheater(res.data.results));

    // eslint-disable-next-line
  }, []);

  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split('-');
    return [dd, mm, yy].join('/');
  };

  let date = new Date();
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };

  return (
    <div>
      <div
        className='search-banner-bg'
        style={{
          backgroundImage:
            'url(' +
            'https://image.tmdb.org/t/p/original/3uM41OT0RfBkE6Gb6U89LEskJBr.jpg' +
            ')',
          backgroundPosition: 'top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='search-banner'>
          <h1>Bienvenue sur AlloMovies,</h1>
          <h2>Des millions de films à retrouver...</h2>
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
      <div className='on-theater-container'>
        <h2>Actuellement en salle</h2>
        <h3>
          Films à l'affiche au {date.toLocaleDateString('fr-FR', options)}
        </h3>

        <div className='on-theater-list'>
          <Swiper
            grabCursor={true}
            spaceBetween={9}
            slidesPerView={'auto'}
            mousewheel={true}
            keyboard={true}
            className='my-swiper'
          >
            {onTheater.map((nowplaying) => (
              <SwiperSlide key={nowplaying.id}>
                <Link to={`/film/${nowplaying.id}`}>
                  <div className='on-theater-cards'>
                    <img
                      src={
                        nowplaying.backdrop_path !== null
                          ? 'https://image.tmdb.org/t/p/original' +
                            nowplaying.backdrop_path
                          : '/movie-bg.png'
                      }
                      alt={`Affiche ${nowplaying.title}`}
                    />
                    <h4>{nowplaying.title}</h4>
                    <h5>{dateFormater(nowplaying.release_date)}</h5>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* <div className='credits-container'>
        <p>
          Conçu et construit par Rémi Ménart
          <br></br>
          ©Copyright 2022 - Rémi Ménart
        </p>
      </div> */}
    </div>
  );
};

export default Home;
