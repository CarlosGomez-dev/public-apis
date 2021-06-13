import './DataList.scss';

const headers = ['Name', 'Description', 'Auth', 'HTTPS', 'Category'];

export const DataList = ({ apiData, handleSort }) => (
  <table className='api-table'>
    <thead>
      <tr>
        {headers.map(header => (
          <th key={header}>
            <button
              className='api-table-header'
              onClick={() => handleSort(header === 'Name' ? 'API' : header)}
            >
              {header}
            </button>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {apiData.map(api => (
        <tr key={`${api.API}${api.Link}`}>
          <td className='api-name'>
            <a href={api.Link} target='_blank' rel='noopener noreferrer'>
              <span>{api.API}</span>
            </a>
          </td>
          <td className='api-description'>
            <span>{api.Description}</span>
          </td>
          <td>
            <span className={'badge ' + (api.Auth ? 'auth' : 'no-auth')}>
              {api.Auth || 'No Auth'}
            </span>
          </td>
          <td>
            <span className={'badge ' + (api.HTTPS ? 'https' : 'no-https')}>
              HTTP{api.HTTPS ? 'S' : ''}
            </span>
          </td>
          <td>
            <span className='badge category'>{api.Category}</span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
