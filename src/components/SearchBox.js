import React, { useRef, useEffect } from 'react';
import '../styles/SearchBox.css'
const SearchBox = ({ onSearch,query }) => {
    const inputRef = useRef(null);

    const handleSearch = (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === '/') {
                e.preventDefault(); 
                inputRef.current.focus();
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleSearch);
        return () => {
            window.removeEventListener('keydown', handleSearch);
        };
    }, []);

    return (
        <input
            type="text"
            placeholder="Search for places"
            value={query}
            onChange={(e) => {onSearch(e.target.value);
            }}
            ref={inputRef}
            className="search-box"
        />
    );
};

export default SearchBox;
