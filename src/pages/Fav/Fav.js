import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FavCards from '../../components/FavCards/FavCards';

const CoupsDeCoeur = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(',')
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, []);

  return (
    <div className='fav-container'>
      <div className='fav-header'>
        <div className='heart'> ♥</div>
        <div className='fav-header-text'>
          <h1>
            Films <span>Coups de coeur</span>
          </h1>
          <p>
            Plus besoin de chercher 30 minutes quel film regarder avant une
            soirée ciné, grâce à l'ajout en favoris, retrouvez toute votre liste
            de films préférés ou à regarder prochainement !
          </p>
        </div>
      </div>
      <div className='result'>
        {listData.length > 0 ? (
          listData.map((fav) => <FavCards fav={fav} key={fav.id} />)
        ) : (
          <h2>Aucun coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default CoupsDeCoeur;
