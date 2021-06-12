import { useState } from 'react';
import { useFetchApiCategories } from '../hooks/useFetchApiCategories';

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const FilterForm = ({
  handleSearch,
  pageLimit,
  setPageLimit,
  setSortBy,
  handleCategory,
}) => {
  const [inputText, setInputText] = useState('');
  const categories = useFetchApiCategories();

  const handleInput = event => {
    setInputText(event.target.value);
    handleSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleSearch(inputText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='filter'>Find API:</label>
      <input type='text' id='filter' value={inputText} onChange={handleInput} />
      <button type='submit'>Search</button>

      <label htmlFor='pageSize'>Results per page</label>
      <select id='pageSize' value={pageLimit} onChange={event => setPageLimit(event.target.value)}>
        {PAGE_SIZE_OPTIONS.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <label htmlFor='sortBy'>Sort by</label>
      <select id='sortBy' onChange={event => setSortBy(event.target.value)}>
        <option value=''>-</option>
        <option value='API'>Name</option>
        <option value='Description'>Description</option>
        <option value='Auth'>Auth</option>
        <option value='HTTPS'>HTTPS</option>
        <option value='Cors'>CORS</option>
        <option value='Link'>URL</option>
        <option value='Category'>Category</option>
      </select>

      <label htmlFor='categories'>Categories</label>
      <select id='categories' defaultValue='-' onChange={handleCategory}>
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
