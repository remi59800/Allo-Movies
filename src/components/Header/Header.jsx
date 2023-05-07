import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/img/Logo-AM.png';
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const Header = () => {
    return (
        <>
            <div className='header'>
                <NavLink to='/accueil'>
                    <img src={logo} alt='Logo Kult Film Club'/>
                </NavLink>
                <nav className='nav-web'>
                    <ul>
                        <li>
                            <NavLink to='/accueil'>Accueil</NavLink>
                        </li>
                        <li>
                            <NavLink to='/coups-de-coeur'>Coups de coeur</NavLink>
                        </li>
                        <li>
                            <NavLink to='/contact'>Contact</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <BurgerMenu/>
        </>
    );
};

export default Header;
