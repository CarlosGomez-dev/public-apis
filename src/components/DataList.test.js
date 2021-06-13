import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataList } from './DataList';

const apiData = [
  {
    API: 'Cat Facts',
    Description: 'Daily cat facts',
    Auth: '',
    HTTPS: true,
    Cors: 'no',
    Link: 'https://alexwohlbruck.github.io/cat-facts/',
    Category: 'Animals',
  },
  {
    API: 'Cataas',
    Description: 'Cat as a service (cats pictures and gifs)',
    Auth: '',
    HTTPS: false,
    Cors: 'unknown',
    Link: 'https://cataas.com/',
    Category: 'Animals',
  },
  {
    API: 'catAPI',
    Description: 'Random pictures of cats',
    Auth: 'apiKey',
    HTTPS: true,
    Cors: 'yes',
    Link: 'https://github.com/ThatCopy/catAPI/wiki/Usage',
    Category: 'Animals',
  },
];

const handleSort = jest.fn();

describe('Data List', () => {
  it('matches snapshot', () => {
    const { container } = render(<DataList apiData={apiData} handleSort={handleSort} />);
    expect(container).toMatchSnapshot();
  });
  it.each(apiData)('contains information for API %#', api => {
    render(<DataList apiData={apiData} handleSort={handleSort} />);
    const apiName = screen.getByText(api.API);
    const parentLink = apiName.parentElement;
    expect(screen.getByText(api.Description)).toBeInTheDocument();
    expect(parentLink.getAttribute('href')).toBe(api.Link);
  });
  it('contains Auth and HTTP badges', () => {
    render(<DataList apiData={apiData} handleSort={handleSort} />);
    const noAuthCount = apiData.reduce((acc, api) => (api.Auth === '' ? acc + 1 : acc), 0);
    const httpsCount = apiData.reduce((acc, api) => (api.HTTPS ? acc + 1 : acc), 1);
    expect(screen.getAllByText('No Auth').length).toBe(noAuthCount);
    expect(screen.getAllByText('HTTPS').length).toBe(httpsCount);
  });
  it('contains clickable headings', () => {
    render(<DataList apiData={apiData} handleSort={handleSort} />);
    const headers = screen.getAllByRole('columnheader');
    userEvent.click(headers[0].firstElementChild);
    expect(handleSort).toBeCalledTimes(1);
  });
});
