import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

const options = [
  ['results per page', '50', '50 / page'],
  ['sort by', 'API', 'Name'],
  ['categories', 'Music', 'Music'],
];

const categories = [
  'Data Validation',
  'Development',
  'Dictionaries',
  'Documents \u0026 Productivity',
  'Environment',
  'Events',
  'Finance',
  'Food \u0026 Drink',
  'Games \u0026 Comics',
  'Geocoding',
  'Government',
  'Health',
  'Jobs',
  'Machine Learning',
  'Music',
];

const entries = [
  {
    API: 'IUCN',
    Description: 'IUCN Red List of Threatened Species',
    Auth: 'apiKey',
    HTTPS: false,
    Cors: 'unknown',
    Link: 'http://apiv3.iucnredlist.org/api/v3/docs',
    Category: 'Animals',
  },
  {
    API: 'PageCDN',
    Description: 'Public API for javascript, css and font libraries on PageCDN',
    Auth: 'apiKey',
    HTTPS: true,
    Cors: 'yes',
    Link: 'https://pagecdn.com/docs/public-api',
    Category: 'Development',
  },
  {
    API: '7digital',
    Description: 'Api of Music store 7digital',
    Auth: 'OAuth',
    HTTPS: true,
    Cors: 'unknown',
    Link: 'https://docs.7digital.com/reference',
    Category: 'Music',
  },
];

let mockError = null;
jest.mock('./hooks', () => ({
  useFetchPublicApi: endpoint => {
    const data = endpoint === 'categories' ? categories : entries;
    const isLoading = false;
    return [data, isLoading, mockError];
  },
}));

describe('App', () => {
  it('matches snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
  it('renders results on page load', () => {
    render(<App />);
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
  });
  it('focuses search input on page load', () => {
    render(<App />);
    expect(screen.getByLabelText(/search/i)).toHaveFocus();
  });
  it('allows users to tab away and return to input', () => {
    const { container } = render(<App />);
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    expect(screen.getByLabelText(/search/i)).not.toHaveFocus();
    userEvent.type(container, '/');
    expect(screen.getByLabelText(/search/i)).toHaveFocus();
  });
  it.each(options)('contains filter option: %s', async (label, option, displayValue) => {
    render(<App />);
    userEvent.selectOptions(screen.getByLabelText(new RegExp(label, 'i')), option);
    screen.getByDisplayValue(displayValue);
  });
  it('contains search input to filter results', async () => {
    render(<App />);
    const header = 1;
    const inputText = 'this returns no results';
    const input = screen.getByLabelText(/search/i);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(entries.length + header);
    jest.useFakeTimers();
    userEvent.type(input, inputText);
    screen.getByDisplayValue(inputText);
    act(() => jest.runAllTimers());
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
  it('contains allows sorting with headers', () => {
    render(<App />);
    const headers = screen.getAllByRole('columnheader');
    const tableRows = screen.getAllByRole('row')[1];
    userEvent.click(headers[0].firstElementChild);
    expect(tableRows).not.toEqual(screen.getAllByRole('row')[1]);
    userEvent.click(headers[0].firstElementChild);
    expect(tableRows).not.toEqual(screen.getAllByRole('row')[1]);
    userEvent.click(headers[0].firstElementChild);
    expect(tableRows).toEqual(screen.getAllByRole('row')[1]);
  });
  it('displays an error message if data fetch failed', async () => {
    mockError = { error: 'Failed' };
    render(<App />);
    await screen.findByText(/error/i);
    mockError = null;
  });
});
