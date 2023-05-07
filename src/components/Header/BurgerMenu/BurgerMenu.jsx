import React, {useRef, useState} from 'react';
import {NavLink} from "react-router-dom";
import logo from "../../../assets/img/Logo-AM.png";

const BurgerMenu = () => {
    const burgerInputRef = useRef(null);
    const [showBurgerMenu, setShowBurgerMenu] = useState(false)

    const handleMenuClick = () => {
        burgerInputRef.current.checked = false;
        handleOnClick();
    };

    const handleOnClick = () => {
        const burger = document.querySelector('.burger-menu');
        burger.classList.toggle('active');
        setShowBurgerMenu(!showBurgerMenu);
        if (showBurgerMenu === false) {
            document.querySelector("body").classList.add("overflowHidden");
            document.querySelector("html").classList.add("overflowHidden")
        } else if (showBurgerMenu === true) {
            document.querySelector("body").classList.remove("overflowHidden");
            document.querySelector("html").classList.remove("overflowHidden");
        }
    }

    const handleWindowResize = () => {
        if (window.innerWidth > 720) {
            burgerInputRef.current.checked = false;
        }
    };
    window.addEventListener('resize', handleWindowResize);

    return (
        <div className='burger-menu'>
            <NavLink to='/accueil'>
                <img src={logo} alt='Logo Kult Film Club'/>
            </NavLink>
            <input id="burger" type="checkbox" ref={burgerInputRef} onClick={handleOnClick}/>
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
                        <NavLink to='/contact'>Contact</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default BurgerMenu;