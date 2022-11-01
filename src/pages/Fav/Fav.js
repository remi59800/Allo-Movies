import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FavCards from '../../components/FavCards/FavCards';

const CoupsDeCoeur = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let movieArray = [];

    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(',')
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`
        )
        .then((res) => movieArray.push(res.data))
        .then(() => setListData(movieArray));
    }
  }, []);

  return (
    <div className='user-list-page'>
      <h2>
        Coups de coeur <span>💖</span>
      </h2>
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
