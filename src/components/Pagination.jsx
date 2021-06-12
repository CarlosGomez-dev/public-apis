export const Pagination = ({ totalResults, currentPage, pageLimit, handlePage }) => {
  const totalPages = Math.ceil(totalResults / pageLimit);
  return (
    <nav>
      <p>{totalResults} results</p>
      <button onClick={() => handlePage(-1)} disabled={currentPage === 1}>
        Prev
      </button>
      <button onClick={() => handlePage(1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <p>
        {Math.min(currentPage, totalPages)} - {totalPages}
      </p>
    </nav>
  );
};
