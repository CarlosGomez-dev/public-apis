import { useEffect, useState } from 'react';
import { useFetchApiCategories } from '../hooks/useFetchApiCategories';
import { FilterFormSelect } from './FilterFormSelect';

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
const apiKeysAsOptions = [
  ['API', 'Name'],
  'Description',
  'Auth',
  'HTTPS',
  'Cors',
  'Link',
  'Category',
];

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
  };

  useEffect(() => {
    const timer = setTimeout(() => handleSearch(inputText), 500);
    return () => clearTimeout(timer);
  }, [handleSearch, inputText]);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <label htmlFor='filter'>Find API:</label>
      <input type='text' id='filter' value={inputText} onChange={handleInput} />
      {/* <button type='submit'>Search</button> */}

      <FilterFormSelect
        label='Results per Page'
        optionsArray={PAGE_SIZE_OPTIONS}
        defaultValue={pageLimit}
        onChange={setPageLimit}
      />

      <FilterFormSelect
        label='Sort by'
        optionsArray={apiKeysAsOptions}
        onChange={setSortBy}
        hasNullOption
      />

      <FilterFormSelect
        label='Categories'
        optionsArray={categories}
        onChange={handleCategory}
        hasNullOption
      />
    </form>
  );
};
