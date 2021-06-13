import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { DataList, FilterForm, Pagination } from './components';
import { useFetchPublicApi } from './hooks';
import { sortObjectArray } from './utils';
import plugIn from './assets/plug-in.svg';
import './App.scss';

const FilterFormMemo = memo(FilterForm);

export const App = () => {
  const [apiData, isLoading, error] = useFetchPublicApi('entries');
  const [{ sortBy, ascending }, setSortBy] = useState({ sortBy: '', ascending: '' });

  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(20);
  const inputRef = useRef(null);

  const sortedData = sortObjectArray(apiData, sortBy, ascending);
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

  const handleSort = useCallback(
    sortColumn => {
      if (ascending === 'desc') {
        return setSortBy({ sortBy: '', ascending: '' });
      }
      if (sortColumn === sortBy) {
        return setSortBy({ sortBy: sortColumn, ascending: 'desc' });
      }
      setSortBy({ sortBy: sortColumn, ascending: 'asc' });
    },
    [ascending, sortBy],
  );

  const handleKeyUp = event => {
    if (event.key === '/') {
      event.preventDefault();
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener('keyup', handleKeyUp);
    return () => document.body.removeEventListener('keyup', handleKeyUp);
  }, []);

  return (
    <div className='main-page'>
      <header>
        <h1 className='page-title'>
          <img src={plugIn} alt='plug in' />
          <span>Public APIs</span>
        </h1>
        <FilterFormMemo
          inputRef={inputRef}
          pageLimit={pageLimit}
          handleSearch={handleSearch}
          handlePageLimit={handlePageLimit}
          handleSort={handleSort}
          handleCategory={handleCategory}
        />
      </header>
      <Pagination
        totalResults={filteredApiData.length}
        currentPage={currentPage}
        pageLimit={pageLimit}
        setCurrentPage={setCurrentPage}
      />
      {error && (
        <p className='page-error'>There was an error fetching the API. Please try again later.</p>
      )}
      {isLoading && <p className='page-loading'>Loading results...</p>}
      {!isLoading && paginatedApiData.length === 0 && (
        <p className='page-no-results'>
          No results, try another search term or change the filters to see more results.
        </p>
      )}
      {!isLoading && paginatedApiData.length > 0 && (
        <DataList apiData={paginatedApiData} handleSort={handleSort} />
      )}
    </div>
  );
};
