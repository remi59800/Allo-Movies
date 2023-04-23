import React, { useRef } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../../../assets/img/Logo-AM.png";

const BurgerMenu = () => {
    const burgerInputRef = useRef(null);
    const handleMenuClick = () => {
        burgerInputRef.current.checked = false;
    };
    const handleWindowResize = () => {
        if (window.innerWidth > 720) {
            burgerInputRef.current.checked = false;
        }
    };
    window.addEventListener('resize', handleWindowResize);

    return (
        <div className='burger-menu'>
            <NavLink to='/accueil'>
                <img src={logo} alt='Logo Kult Film Club' />
            </NavLink>
            <input id="burger" type="checkbox" ref={burgerInputRef}/>
            <label htmlFor="burger">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <nav className='nav-mobile'>
                <ul>
                    <li onClick={handleMenuClick}>
                        <NavLink to='/accueil'>Accueil</NavLink>
                    </li>
                    <li onClick={handleMenuClick}>
                        <NavLink to='/coups-de-coeur'>Coups de coeur</NavLink>
                    </li>
                    <li onClick={handleMenuClick}>
                        <NavLink to='/a-propos'>À propos</NavLink>
                    </li>
                    <li onClick={handleMenuClick}>
                        <NavLink to='/contact'>Contact</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default BurgerMenu;