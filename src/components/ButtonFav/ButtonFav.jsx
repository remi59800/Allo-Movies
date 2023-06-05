import React, {useCallback, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons";

function ButtonFav({id}) {
    const [isStored, setIsStored] = useState(false);
    const [iconName, setIconName] = useState('regular-heart');

    const addStorage = () => {
        let storedData = window.localStorage.movies ? window.localStorage.movies.split(',') : [];
        if (!storedData.includes(id.toString())) {
            storedData.push(id.toString());
            window.localStorage.movies = storedData.join(',');
            setIsStored(true);
        } else {
            setIsStored(false);
            deleteStorage();
        }
    };

    const deleteStorage = () => {
        let storedData = window.localStorage.movies.split(',');
        let newData = storedData.filter((storedId) => storedId !== id.toString());
        window.localStorage.movies = newData.join(',');
        setIsStored(false);
    };

    const handleStorageChange = useCallback(() => {
        let storedData = window.localStorage.movies ? window.localStorage.movies.split(',') : [];
        setIsStored(storedData.includes(id.toString()));
    }, [id]);

    useEffect(() => {
        handleStorageChange();
        setIconName(isStored ? 'solid-heart' : 'regular-heart');
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [handleStorageChange, isStored]);

    const handleClick = () => {
        iconName === 'regular-heart' ? addStorage() : deleteStorage();
    };

    return (
        <button className='button-fav' onClick={handleClick}>
            <FontAwesomeIcon
                icon={iconName === 'regular-heart' ? regularHeart : solidHeart}/> &nbsp;&nbsp;Favoris
        </button>
    );
}

export default ButtonFav;