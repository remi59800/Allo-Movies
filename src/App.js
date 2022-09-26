import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import MyCultMovies from './pages/MyCultMovies/MyCultMovies';
import Header from './components/Header/Header';
import MovieDetail from './pages/MovieDetail/MovieDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/accueil' element={<Home />} />
        <Route path='*' element={<Home />} />
        <Route path='movie/:id' element={<MovieDetail />}></Route>
        <Route path='/mes-films-cultes' element={<MyCultMovies />} />
        <Route path='/a-propos' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
