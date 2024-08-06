import React, { useState, useEffect } from 'react';
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

    const fetchData = async () => {
        setLoading(true);
        setError('');
        const options = {
            method: 'GET',
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/',
            headers: {
                'x-rapidapi-key':'6c30bf0414msh12e4e65445b4eadp16170cjsn0d17cd0bb64a',
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
        if(page){
            fetchData();
        }
    }, [page, limit, query]);

    return (
        <div className="app">
            <SearchBox onSearch={setQuery} query={query}/>
            <Table data={data} loading={loading} error={error} />
            {data.length > 0 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={setPage}
                    onLimitChange={(value) => setLimit(Math.min(Math.max(value, 1), 10))}
                />
            )}
        </div>
    );
};

export default App;
