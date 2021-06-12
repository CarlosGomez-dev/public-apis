import './Pagination.scss';

export const Pagination = ({ totalResults, currentPage, pageLimit, setCurrentPage }) => {
  const totalPages = Math.ceil(totalResults / pageLimit);
  return (
    <nav className='pagination'>
      <p>
        {totalResults} result{totalResults > 1 || totalResults === 0 ? 's' : ''}
      </p>
      <div className='button-container'>
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          &#60;&#60;
        </button>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          &#62;&#62;
        </button>
      </div>
      {totalPages ? (
        <p>
          Page {Math.min(currentPage, totalPages)} of {totalPages}
        </p>
      ) : (
        <p></p>
      )}
    </nav>
  );
};
