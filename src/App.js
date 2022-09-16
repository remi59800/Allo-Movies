import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SearchMovie from './pages/SearchMovie';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/accueil' element={<Home />} />
        <Route path='*' element={<Home />} />
        <Route path='/recherche-film' element={<SearchMovie />} />
        <Route path='/a-propos' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
