import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

const totalResults = 50;
const currentPage = 2;
const pageLimit = 20;
const setCurrentPage = jest.fn(value => value);
const paginationProps = { totalResults, currentPage, pageLimit, setCurrentPage };
const buttons = {
  first: '<<',
  previous: 'Prev',
  next: 'Next',
  last: '>>',
};
const paginationElements = [
  `${totalResults} results`,
  `Page ${currentPage}`,
  ...Object.values(buttons),
];

describe('Pagination', () => {
  it('matches snapshot', () => {
    const { container } = render(<Pagination {...paginationProps} />);
    expect(container).toMatchSnapshot();
  });
  it.each(paginationElements)('contains pagination information and buttons (%s)', element => {
    render(<Pagination {...paginationProps} />);
    screen.getByText(new RegExp(element, 'i'));
  });
  it('buttons allow changing pages', () => {
    render(<Pagination {...paginationProps} />);
    const firstButton = screen.getByText(buttons.first);
    const prevButton = screen.getByText(buttons.previous);
    const nextButton = screen.getByText(buttons.next);
    const lastButton = screen.getByText(buttons.last);
    userEvent.click(prevButton);
    userEvent.click(firstButton);
    expect(setCurrentPage).toHaveBeenCalledTimes(2);
    userEvent.click(nextButton);
    userEvent.click(lastButton);
    expect(setCurrentPage).toHaveBeenCalledTimes(4);
  });
});
