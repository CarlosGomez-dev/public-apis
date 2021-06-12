import { colorFromString } from '../utils';
import './DataList.scss';

export const DataList = ({ apiData }) => (
  <main className='card-list'>
    {apiData.map(api => (
      <article key={api.API + api.Link} className='card'>
        <h2>
          <span>{api.API}</span>
        </h2>
        <div className='card-badges'>
          <p className={'badge ' + (api.Auth ? 'auth' : 'no-auth')}>
            <span>{api.Auth || 'No Auth'}</span>
          </p>
          <p className={'badge ' + (api.HTTPS ? 'https' : 'no-https')}>
            <span>HTTP{api.HTTPS ? 'S' : ''}</span>
          </p>
          <p style={colorFromString(api.Category)} className='badge category'>
            {api.Category}
          </p>
        </div>
        <p className='card-description'>{api.Description}</p>
        <a className='card-link' href={api.Link} target='_blank' rel='noopener noreferrer'>
          {api.Link}
        </a>
      </article>
    ))}
  </main>
);
