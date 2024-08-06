import React from 'react';
import '../styles/Pagination.css'

const Pagination = ({ totalPages, currentPage, onPageChange, onLimitChange ,fetchData}) => {
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    return (
        <div className="pagination-container">
            <div className="pagination">
                {pages.map(page => (
                    <button
                        key={page}
                        className={`page-item ${page === currentPage ? 'active' : ''}`}
                        onClick={() => {onPageChange(page);
                            fetchData();
                        }}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <input
                type="number"
                min="1"
                max="10"
                defaultValue="5"
                onChange={(e) => onLimitChange(e.target.value)}
                className="limit-input"
            />
        </div>
    );
};

export default Pagination;
