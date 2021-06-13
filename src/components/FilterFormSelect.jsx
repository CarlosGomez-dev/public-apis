export const FilterFormSelect = ({
  className = '',
  label,
  optionsArray,
  defaultValue = null,
  onChange,
  hasNullOption = false,
}) => (
  <div className={'form-select ' + className}>
    <label htmlFor={label.replace(/\s/g, '-')} className='label'>
      {label}
    </label>
    <select
      id={label.replace(/\s/g, '-')}
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
