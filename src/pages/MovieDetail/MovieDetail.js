import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RecoCards from '../../components/RecoCards/RecoCards';

const MovieDetail = () => {
  const [movieData, setMovieData] = useState('');
  const [movieCast, setMovieCast] = useState();
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
      .then((res) => setMovieCast(res.data));
    // eslint-disable-next-line
  }, []);

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
    <div className='movie-details-container'>
      <div
        className='movie-details-bg'
        style={{
          backgroundImage: `url(${imgBackground.originalImage(
            movieData.backdrop_path
          )})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='movie-details'>
          <div className='movie-poster'>
            <img
              src={`https://image.tmdb.org/t/p/original${
                movieData ? movieData.poster_path : ''
              }`}
              alt={`Affiche film`}
            />
          </div>
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
              <h3>Synopsis</h3>
              <p>{movieData ? movieData.overview : ''}</p>
            </div>
            <div className='casting'>
              <div className='casting-role1'>
                <h5>
                  {movieCast && movieCast.crew ? movieCast.crew[0].name : ''}
                </h5>
                <p>
                  {movieCast && movieCast.crew ? movieCast.crew[0].job : ''}
                </p>
              </div>
              <div className='casting-role2'>
                <h5>
                  {movieCast && movieCast.crew ? movieCast.crew[1].name : ''}
                </h5>
                <p>
                  {movieCast && movieCast.crew ? movieCast.crew[1].job : ''}{' '}
                </p>
              </div>
              <div className='casting-role3'>
                <h5>
                  {movieCast && movieCast.crew ? movieCast.crew[2].name : ''}
                </h5>
                <p>
                  {movieCast && movieCast.crew ? movieCast.crew[2].job : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='recommandations-container'>
        <h3>
          Si vous avez aimé {movieData ? movieData.title : ''}, vous aimerez...
        </h3>
        <div className='cards-movies-recos'>
          {recommendMovie.slice(0, 6).map((reco) => {
            return <RecoCards reco={reco} key={reco.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
