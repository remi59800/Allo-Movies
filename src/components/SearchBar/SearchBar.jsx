import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

export function SearchBar() {
    //Gestion du bouton de recherche
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const handleOnChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setQuery(value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/films/langage=fr&recherche=${query}`, {
            state: {query: query},
        });
    };

    return (
        <div className='inputs-container'>
            <form onSubmit={handleSearch}>
                <input
                    type='text'
                    placeholder='Rechercher un film...'
                    value={query}
                    onChange={handleOnChange}
                />
                <input type='submit' value='Search'/>
            </form>
        </div>
    );
}