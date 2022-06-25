import { memo, useEffect, useState } from 'react';
import { useFetchPublicApi } from '../hooks';
import { FilterFormSelect } from './FilterFormSelect';
import './FilterForm.scss';

const FilterFormSelectMemo = memo(FilterFormSelect);

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
  'Category',
];

export const FilterForm = ({
  inputRef,
  handleSearch,
  pageLimit,
  handlePageLimit,
  handleSort,
  handleCategory,
}) => {
  const [inputText, setInputText] = useState('');
  const [categories] = useFetchPublicApi('categories');

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
        Search
      </label>
      <input
        ref={inputRef}
        type='search'
        id='filter'
        placeholder='e.g.: Weather'
        value={inputText}
        onChange={handleInput}
        className='input search'
      />
      <span>Press / to jump to the search box</span>

      <section className='form-filters'>
        <FilterFormSelectMemo
          label='Results per Page'
          optionsArray={PAGE_SIZE_OPTIONS}
          defaultValue={pageLimit}
          onChange={handlePageLimit}
        />
        <FilterFormSelectMemo
          className='sort-by-select'
          label='Sort by'
          optionsArray={apiKeysAsOptions}
          onChange={handleSort}
          hasNullOption
        />
        <FilterFormSelectMemo
          label='Categories'
          optionsArray={categories || []}
          onChange={handleCategory}
          hasNullOption
        />
      </section>
    </form>
  );
};
