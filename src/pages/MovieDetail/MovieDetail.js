import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';
import Youtube from 'react-youtube';

const MovieDetail = () => {
  const [movieData, setMovieData] = useState('');
  const [movieCast, setMovieCast] = useState([]);
  const [trailer, setTrailer] = useState('');
  const [playing, setPlaying] = useState(false);
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

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`
      )
      .then((res) => setMovieCast(res.data.cast));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`
      )
      .then((res) => setTrailer(res.data.results[0]));
    // eslint-disable-next-line
  }, [playing]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR&page=1`
      )
      .then((res) => setRecommendMovie(res.data.results));
    // eslint-disable-next-line
  }, []);

  const imgBackground = {
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  };

  return (
    <div>
      <div
        className='movie-details-bg'
        style={{
          backgroundImage: `url(${imgBackground.originalImage(
            movieData.backdrop_path
          )})`,
          backgroundPosition: 'right top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='movie-details'>
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

            <div className='synopsis-text'>
              <h3>{movieData.overview ? `Synopsis` : null}</h3>
              <p>{movieData ? movieData.overview : null}</p>
            </div>
            {trailer ? (
              <div>
                {playing ? (
                  <div className='youtube-container'>
                    <Youtube
                      videoId={trailer.key}
                      className={'youtube'}
                      opts={{
                        width: '100%',
                        height: '550px',
                        playerVars: {
                          autoplay: 1,
                          controls: 0,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                    <button
                      onClick={() => setPlaying(false)}
                      className={'button-close-video'}
                    >
                      ✖
                    </button>
                  </div>
                ) : (
                  <div className='trailer'>
                    <button
                      className={'button-play-video'}
                      onClick={() => setPlaying(true)}
                      type='button'
                    >
                      Bande-annonce
                    </button>
                  </div>
                )}
              </div>
            ) : null}
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
