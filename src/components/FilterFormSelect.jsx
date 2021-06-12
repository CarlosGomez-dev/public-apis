export const FilterFormSelect = ({
  label,
  optionsArray,
  defaultValue = null,
  onChange,
  hasNullOption = false,
}) => (
  <>
    <label htmlFor={label.replace(' ', '-')}>{label}</label>
    <select
      id={label.replace(' ', '-')}
      defaultValue={hasNullOption ? '-' : defaultValue}
      onChange={event => onChange(event.target.value)}
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
  </>
);
