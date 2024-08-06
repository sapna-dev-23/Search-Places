import React from 'react';
import '../styles/Pagination.css'

const Pagination = ({ totalPages, currentPage, onPageChange, onLimitChange }) => {
    const getPageNumbers = () => {
        const totalNumbers = 5; // Change this value to adjust the number of visible page numbers
        const totalBlocks = totalNumbers + 2; // Including the First and Last buttons

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            let pages = [...Array((endPage + 1) - startPage).keys()].map(num => startPage + num);

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = [...Array(spillOffset).keys()].map(num => startPage - spillOffset + num);
                    pages = ['LEFT', ...extraPages, ...pages];
                    break;
                }
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = [...Array(spillOffset).keys()].map(num => endPage + num + 1);
                    pages = [...pages, ...extraPages, 'RIGHT'];
                    break;
                }
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = ['LEFT', ...pages, 'RIGHT'];
                    break;
                }
            }

            return [1, ...pages, totalPages];
        }

        return [...Array(totalPages).keys()].map(num => num + 1);
    };

    const handlePageChange = (page) => {
        if (page === 'LEFT') onPageChange(currentPage - 1);
        else if (page === 'RIGHT') onPageChange(currentPage + 1);
        else onPageChange(page);
    };

    const pages = getPageNumbers();

    return (
        <div className="pagination-container">
            <div className="pagination">
                {currentPage > 1 && (
                    <button className="page-item" onClick={() => onPageChange(1)}>
                        First
                    </button>
                )}
                {pages.map((page, index) => (
                    <button
                        key={index}
                        className={`page-item ${page === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button className="page-item" onClick={() => onPageChange(totalPages)}>
                        Last
                    </button>
                )}
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
