export const DataList = ({ apiData }) => (
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
