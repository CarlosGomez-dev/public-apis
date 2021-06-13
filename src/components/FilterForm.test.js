import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterForm } from './FilterForm';

const handleSearch = jest.fn();
const filterFormProps = { handleSearch };

describe('FilterForm', () => {
  it('matches snapshot', () => {
    const { container } = render(<FilterForm {...filterFormProps} />);
    expect(container).toMatchSnapshot();
  });
  it('accepts user input', () => {
    render(<FilterForm {...filterFormProps} />);
    const inputText = 'weather';
    const input = screen.getByLabelText(/search/i);
    jest.useFakeTimers();
    userEvent.type(input, inputText + '{enter}');
    expect(setTimeout).toHaveBeenCalled();
    act(() => jest.runAllTimers());
    expect(handleSearch).toHaveBeenCalled();
  });
});
