import React from 'react';

const RecoCards = ({ reco }) => {
  return (
    <div className='reco-card'>
      <img
        src={
          reco
            ? 'https://image.tmdb.org/t/p/original' + reco.backdrop_path
            : './image-movie.png'
        }
        alt={`Affiche ${reco.title}`}
      />

      <h4>{reco.title}</h4>
    </div>
  );
};

export default RecoCards;
