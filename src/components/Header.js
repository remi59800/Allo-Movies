import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <nav>
        <ul>
          <li>
            <NavLink to='/accueil'>Accueil</NavLink>
          </li>
          <li>
            <NavLink to='/recherche-film'>Rechercher un film</NavLink>
          </li>
          <li>
            <NavLink to='/a-propos'>À propos</NavLink>
          </li>
          <li>
            <NavLink to='/contact'>Contact</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
