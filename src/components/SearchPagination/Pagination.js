import React from 'react';

const Pagination = ({ numberOfPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className='pagination-buttons'>
      <button onClick={prevPage}>Précédent</button>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      <button onClick={nextPage}>Suivant</button>
    </div>
  );
};

export default Pagination;
