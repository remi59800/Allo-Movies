import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();

  const getData = async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=2f29d9bc9f76a597232a8a514e956b12&language=fr-FR`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='movie'>
      {/* <div className='movie-intro'>
        <img
          className='movie-backdrop'
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ''
          }`}
          alt={`Affiche film`}
        />
      </div> */}
      <div className='movie-detail'>
        <div className='movie-detail-left'>
          <div className='movie-posterBox'>
            <img
              className='movie-poster'
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ''
              }`}
              alt={`Affiche film`}
            />
          </div>
        </div>
        <div className='movie-detailRight'>
          <div className='movie-detailRightTop'>
            <div className='movie-name'>
              {currentMovieDetail ? currentMovieDetail.original_title : ''}
            </div>
            <div className='movie-tagline'>
              {currentMovieDetail ? currentMovieDetail.tagline : ''}
            </div>
            <div className='movie-rating'>
              {currentMovieDetail ? currentMovieDetail.vote_average : ''}{' '}
              <span className='movie-voteCount'>
                {currentMovieDetail
                  ? '(' + currentMovieDetail.vote_count + ') votes'
                  : ''}
              </span>
            </div>
            <div className='movie-runtime'>
              {currentMovieDetail ? currentMovieDetail.runtime + ' mins' : ''}
            </div>
            <div className='movie-releaseDate'>
              {currentMovieDetail
                ? 'Release date: ' + currentMovieDetail.release_date
                : ''}
            </div>
            <div className='movie-genres'>
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span className='movie__genre' id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ''}
            </div>
          </div>
          <div className='movie-detailRightBottom'>
            <div className='synopsis-text'>Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
