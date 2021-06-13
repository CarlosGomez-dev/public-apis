import './Pagination.scss';

export const Pagination = ({ totalResults, currentPage, pageLimit, setCurrentPage }) => {
  const totalPages = Math.ceil(totalResults / pageLimit);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  return (
    <nav className='pagination'>
      <p>{totalResults} results</p>
      <div className='button-container'>
        <button onClick={() => setCurrentPage(1)} disabled={isFirstPage}>
          &#60;&#60;
        </button>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={isFirstPage}>
          Prev
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={isLastPage}>
          Next
        </button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={isLastPage}>
          &#62;&#62;
        </button>
      </div>
      {!!totalPages && (
        <p>
          Page {Math.min(currentPage, totalPages)} of {totalPages}
        </p>
      )}
    </nav>
  );
};
