import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Fav from './pages/Fav/Fav';
import Header from './components/Header/Header';
import MovieSearch from './pages/MovieSearch/MovieSearch';
import MovieDetail from './pages/MovieDetail/MovieDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/accueil' element={<Home />} />
        <Route path='*' element={<Home />} />
        <Route
          path='films/langage=fr&recherche=:query'
          element={<MovieSearch />}
        ></Route>
        <Route path='film/:id' element={<MovieDetail />}></Route>
        <Route path='/coups-de-coeur' element={<Fav />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
