import React, { useEffect, useState } from 'react';
import './App.css';
import jsonData from './entries.json';

export const App = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(20);
  const [pageFilter, setPageFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categoryApiData = categoryFilter
    ? apiData.filter(api => api.Category === categoryFilter)
    : apiData;
  const filteredApiData = categoryApiData.filter(api =>
    (api.API + api.Description).toLowerCase().includes(pageFilter.toLowerCase()),
  );
  const paginatedApiData = filteredApiData.slice(
    pageLimit * (currentPage - 1),
    pageLimit * currentPage,
  );
  const totalResults = filteredApiData.length;
  const totalPages = Math.ceil(filteredApiData.length / pageLimit);

  const handlePage = num => setCurrentPage(currentPage + num);

  const handleSearch = (event, searchText) => {
    event.preventDefault();
    setCurrentPage(1);
    setPageFilter(searchText);
  };

  useEffect(() => {
    const fetchData = async () => {
      // const results = await fetch('https://api.publicapis.org/entries');
      // const data = await results.json();
      // return data;
      // setApiData(data.entries)
      const data = jsonData.entries; //.slice(0, 20);
      return data;
    };
    fetchData().then(data => {
      const sortedData = sortBy
        ? data.slice().sort((apiA, apiB) => {
            const elementA = apiA[sortBy].toLowerCase();
            const elementB = apiB[sortBy].toLowerCase();
            if (elementA > elementB) return 1;
            if (elementA < elementB) return -1;
            return 0;
          })
        : data;
      setApiData(sortedData);
    });
  }, [sortBy]);

  return (
    <div className='App'>
      <header>
        <h1>Hello from App</h1>
        <FilterForm
          {...{ handleSearch, pageLimit, setPageLimit, sortBy, setSortBy, setCategoryFilter }}
        />
      </header>
      <Pagination {...{ totalResults, currentPage, totalPages, handlePage }} />
      <DataList apiData={paginatedApiData} />
    </div>
  );
};

const FilterForm = ({
  handleSearch,
  pageLimit,
  setPageLimit,
  sortBy,
  setSortBy,
  setCategoryFilter,
}) => {
  const [inputText, setInputText] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetch('https://api.publicapis.org/categories');
      const data = await results.json();
      setCategories(data);
    };
    fetchData();
  }, []);

  const handleInput = event => setInputText(event.target.value);
  return (
    <form onSubmit={event => handleSearch(event, inputText)}>
      <label htmlFor='filter'>Find API:</label>
      <input type='text' id='filter' value={inputText} onChange={handleInput} />
      <button type='submit'>Search</button>
      <label htmlFor='pageSize'>Results per page</label>
      <select id='pageSize' value={pageLimit} onChange={event => setPageLimit(event.target.value)}>
        {[10, 20, 50, 100].map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <label htmlFor='sortBy'>Sort by</label>
      <select id='sortBy' value={sortBy} onChange={event => setSortBy(event.target.value)}>
        <option value=''>-</option>
        <option value='API'>Name</option>
        <option value='Description'>Description</option>
        <option value='Auth'>Auth</option>
        <option value='HTTPS'>HTTPS</option>
        <option value='Cors'>CORS</option>
        <option value='Link'>URL</option>
        <option value='Category'>Category</option>
      </select>
      <select
        id='categories'
        defaultValue='-'
        onChange={event => setCategoryFilter(event.target.value)}
      >
        <option value=''>-</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </form>
  );
};

const Pagination = ({ totalResults, currentPage, totalPages, handlePage }) => {
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

const DataList = ({ apiData }) => {
  return (
    <main>
      {apiData.map(api => (
        <article key={api.API + api.Link}>
          <h2>Name: {api.API}</h2>
          <p>{api.Description}</p>
          <p>Auth: {api.Auth || 'None'}</p>
          <p>HTTPS: {api.HTTPS ? 'Yes' : 'No'}</p>
          <p>CORS: {api.Cors}</p>
          <a href={api.Link} target='_blank' rel='noopener noreferrer'>
            {api.Link}
          </a>
          <p>Category: {api.Category}</p>
        </article>
      ))}
    </main>
  );
};
