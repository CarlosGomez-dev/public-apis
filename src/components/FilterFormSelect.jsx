import { memo } from 'react';

export const FilterFormSelect = ({
  label,
  optionsArray,
  defaultValue = null,
  onChange,
  hasNullOption = false,
}) => (
  <div className='form-select'>
    <label htmlFor={label.replace(' ', '-')} className='label'>
      {label}
    </label>
    <select
      id={label.replace(' ', '-')}
      defaultValue={hasNullOption ? '-' : defaultValue}
      onChange={event => onChange(event.target.value)}
      className='select'
    >
      {hasNullOption ? <option value=''>-</option> : null}
      {optionsArray.map(option => {
        if (Array.isArray(option)) {
          return (
            <option key={option[0]} value={option[0]}>
              {option[1]}
            </option>
          );
        }
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  </div>
);

export const FilterFormSelectMemo = memo(FilterFormSelect);
