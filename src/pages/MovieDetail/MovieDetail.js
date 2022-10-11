import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

const MovieDetail = () => {
  const [movieData, setMovieData] = useState('');
  // const [movieCast, setMovieCast] = useState([]);
  const [recommendMovie, setRecommendMovie] = useState([]);
  const { id } = useParams();

  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split('-');
    return [dd, mm, yy].join('/');
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`
      )
      .then((res) => setMovieData(res.data));
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/${id}/credits?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`
  //     )
  //     .then((res) => setMovieCast(res.data));

  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR&page=1`
      )
      .then((res) => setRecommendMovie(res.data.results));
    // eslint-disable-next-line
  }, []);

  const imgBackground = {
    originalImage: (imgPath) =>
      `https://image.tmdb.org/t/p/original/${imgPath}`,
  };

  return (
    <div>
      <div
        className='movie-details-bg'
        style={{
          backgroundImage:
            imgBackground.originalImage(movieData.backdrop_path) !== null
              ? `url(${imgBackground.originalImage(movieData.backdrop_path)})`
              : '/movie-bg.png',
          backgroundPosition: 'top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
        }}
      >
        <div className='movie-details'>
          <div className='movie-text-infos'>
            <h2>{movieData ? movieData.title : ''}</h2>
            <div className='tagline'>
              <h4>{movieData ? movieData.tagline : ''}</h4>
            </div>
            <div className='date-duration-genre'>
              <div className='date'>
                <h4>
                  {movieData ? dateFormater(movieData.release_date) + ' •' : ''}
                </h4>
              </div>
              <div className='duration'>
                <h4>&nbsp;{movieData ? movieData.runtime + ' mins •' : ''}</h4>
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
                    : ''}
                </h4>
              </div>
            </div>
            <div className='notation'>
              <h4>
                <span>⭐ </span>
                {movieData ? movieData.vote_average.toFixed(1) : ''} /10{' '}
                <span className='movie-vote-count'>
                  {movieData ? '(' + movieData.vote_count + ') votes' : ''}
                </span>
              </h4>
            </div>

            <div className='synopsis-text'>
              <h3>{movieData.overview ? `Synopsis` : ''}</h3>
              <p>{movieData ? movieData.overview : ''}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='recommandations-container'>
        <h3>Recommandations</h3>

        <div className='movie-recommendation-list'>
          {recommendMovie.length > 0 ? (
            <Swiper
              grabCursor={true}
              spaceBetween={9}
              slidesPerView={'auto'}
              className='my-swiper'
            >
              {recommendMovie.map((reco) => (
                <SwiperSlide key={reco.id}>
                  <Link to={`/film/${reco.id}`} reloadDocument={true}>
                    <div className='reco-cards'>
                      <img
                        src={
                          reco.backdrop_path !== null
                            ? 'https://image.tmdb.org/t/p/original' +
                              reco.backdrop_path
                            : '/movie-bg.png'
                        }
                        alt={`Affiche ${reco.title}`}
                      />
                      <h4>{reco.title}</h4>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>Pas de recommandations trouvées</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
