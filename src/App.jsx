import { useState } from 'react';
import { DataList, FilterForm, Pagination } from './components';
import './App.css';
import { useFetchApiEntries } from './hooks/useFetchApiEntries';
import { sort } from './utils/sort';

export const App = () => {
  const apiData = useFetchApiEntries();
  const [sortBy, setSortBy] = useState('');

  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [pageLimit, setPageLimit] = useState(20);

  // is this the correct way to sort, categorize, filter, and paginate data?
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

  const handlePage = num => {
    setCurrentPage(currentPage + num);
  };

  const handleSearch = searchText => {
    setCurrentPage(1);
    setSearchFilter(searchText);
  };

  const handleCategory = category => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  return (
    <div className='App'>
      <header>
        <h1>Hello from App</h1>
        <FilterForm
          {...{
            handleSearch,
            pageLimit,
            setPageLimit,
            setSortBy,
            handleCategory,
          }}
        />
      </header>
      <Pagination
        totalResults={filteredApiData.length}
        currentPage={currentPage}
        pageLimit={pageLimit}
        handlePage={handlePage}
      />
      <DataList apiData={paginatedApiData} />
    </div>
  );
};
