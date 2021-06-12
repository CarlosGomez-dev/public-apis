import { memo, useEffect, useState } from 'react';
import { useFetchApiCategories } from '../hooks/useFetchApiCategories';
import { FilterFormSelectMemo } from './FilterFormSelect';
import './FilterForm.scss';

const PAGE_SIZE_OPTIONS = [
  [10, '10 / page'],
  [20, '20 / page'],
  [50, '50 / page'],
  [100, '100 / page'],
];
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
  inputRef,
  handleSearch,
  pageLimit,
  handlePageLimit,
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
    <form onSubmit={e => e.preventDefault()} className='form'>
      <label htmlFor='filter' className='label'>
        Find
      </label>
      <input
        ref={inputRef}
        type='text'
        id='filter'
        placeholder='e.g.: Weather'
        value={inputText}
        onChange={handleInput}
        className='input'
      />
      <span>Press / to jump to the search box</span>

      <section className='form__filters'>
        <FilterFormSelectMemo
          label='Results per Page'
          optionsArray={PAGE_SIZE_OPTIONS}
          defaultValue={pageLimit}
          onChange={handlePageLimit}
        />
        <FilterFormSelectMemo
          label='Sort by'
          optionsArray={apiKeysAsOptions}
          onChange={setSortBy}
          hasNullOption
        />
        <FilterFormSelectMemo
          label='Categories'
          optionsArray={categories}
          onChange={handleCategory}
          hasNullOption
        />
      </section>
    </form>
  );
};

export const FilterFormMemo = memo(FilterForm);
