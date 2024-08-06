import React from 'react';
import '../styles/Table.css'

const Table = ({ data, loading, error }) => {
    if (loading) return <div className="spinner">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (data.length === 0) return <div className="no-result">No result found</div>;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Place Name</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                {data.map((place, index) => (
                    <tr key={place.id}>
                        <td>{index + 1}</td>
                        <td>{place.name}</td>
                        <td>
                            <img src={`https://flagsapi.com/${place.countryCode}/flat/32.png`} alt={place.country} />
                            {place.country}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
