import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import Table from './components/Table';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const debounceTimeoutRef = useRef(null);

    const fetchData = async (query, page, limit) => {
        setLoading(true);
        setError('');
        const options = {
            method: 'GET',
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/',
            headers: {
                'x-rapidapi-key': '6c30bf0414msh12e4e65445b4eadp16170cjsn0d17cd0bb64a',
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            },
            params: {
                namePrefix: query,
                offset: (page - 1) * limit,
                limit: limit
            }
        };

        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setTotalPages(Math.ceil(response.data.metadata.totalCount / limit));
        } catch (error) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        debounceTimeoutRef.current = setTimeout(() => {
            fetchData(query, page, limit);
        }, 500); 
        return () => clearTimeout(debounceTimeoutRef.current);
    }, [query, page, limit]);

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
        setPage(1); 
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (newLimit) => {
        setLimit(Math.min(Math.max(newLimit, 1), 10));
    };

    return (
        <div className="app">
            <SearchBox onSearch={handleSearch} query={query} />
            <Table data={data} loading={loading} error={error} />
            {data.length > 0 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
                />
            )}
        </div>
    );
};

export default App;
