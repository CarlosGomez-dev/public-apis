import { useCallback, useEffect, useRef, useState } from 'react';
import { DataList, FilterFormMemo, Pagination } from './components';
import './App.scss';
import { useFetchApiEntries } from './hooks';
import { sort } from './utils/sort';

export const App = () => {
  const apiData = useFetchApiEntries();
  const [sortBy, setSortBy] = useState('');

  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(20);
  const inputRef = useRef(null);

  const sortedData = sort(apiData, sortBy);
  const categoryApiData = categoryFilter
    ? sortedData.filter(api => api.Category === categoryFilter)
    : sortedData;
  const filteredApiData = categoryApiData.filter(api =>
    (api.API + api.Description).toLowerCase().includes(searchFilter.toLowerCase()),
  );
  const paginatedApiData = filteredApiData.slice(
    pageLimit * (currentPage - 1),
    pageLimit * currentPage,
  );

  const handleSearch = useCallback(searchText => {
    setCurrentPage(1);
    setSearchFilter(searchText);
  }, []);

  const handleCategory = useCallback(category => {
    setCurrentPage(1);
    setCategoryFilter(category);
  }, []);

  const handlePageLimit = useCallback(newLimit => {
    setCurrentPage(1);
    setPageLimit(newLimit);
  }, []);

  const handleKeyUp = event => {
    if (event.key === '/') {
      event.preventDefault();
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener('keyup', handleKeyUp);
    return () => document.body.removeEventListener('keyup', handleKeyUp);
  }, []);

  return (
    <div className='App'>
      <h1>Public APIs</h1>
      <header>
        <FilterFormMemo
          {...{
            inputRef,
            handleSearch,
            pageLimit,
            handlePageLimit,
            setSortBy,
            handleCategory,
          }}
        />
      </header>
      <Pagination
        totalResults={filteredApiData.length}
        currentPage={currentPage}
        pageLimit={pageLimit}
        setCurrentPage={setCurrentPage}
      />
      {paginatedApiData.length ? (
        <DataList apiData={paginatedApiData} />
      ) : (
        <p className='no-results'>
          No results, try another search term or change the filters to see more results.
        </p>
      )}
    </div>
  );
};
