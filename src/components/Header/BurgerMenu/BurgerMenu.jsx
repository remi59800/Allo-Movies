import React from 'react';
import { NavLink } from "react-router-dom";
import logo from "../../../assets/img/Logo-AM.png";

const BurgerMenu = () => {
    return (
        <div className='burger-menu'>
            <NavLink to='/accueil'>
                <img src={logo} alt='Logo Kult Film Club' />
            </NavLink>
            <input id="burger" type="checkbox"/>
            <label htmlFor="burger">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <nav className='nav-mobile'>
                <ul>
                    <li>
                        <NavLink to='/accueil'>Accueil</NavLink>
                    </li>
                    <li>
                        <NavLink to='/coups-de-coeur'>Coups de coeur</NavLink>
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

export default BurgerMenu;