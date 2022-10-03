import React from 'react';

const RecoCards = ({ reco }) => {
  return (
    <div className='reco-cards'>
      <div className='poster-film'>
        <img
          src={'https://image.tmdb.org/t/p/original' + reco.backdrop_path}
          alt={`Affiche ${reco.title}`}
        />
      </div>
      <div className='movie-title'>
        <h4>{reco.title}</h4>
      </div>
    </div>
  );
};

export default RecoCards;
