import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterFormSelect } from './FilterFormSelect';

const filterFormSelectProps = {
  label: 'Select label',
  optionsArray: ['2', '4', '6', '8', '10'],
  defaultValue: '4',
  onChange: jest.fn(),
  hasNullOption: false,
};

describe('Filter Form Select', () => {
  it('matches snapshot', () => {
    const { container } = render(<FilterFormSelect {...filterFormSelectProps} />);
    expect(container).toMatchSnapshot();
  });
  it('renders label and default value', () => {
    render(<FilterFormSelect {...filterFormSelectProps} />);
    screen.getByLabelText(filterFormSelectProps.label);
    screen.getByDisplayValue(filterFormSelectProps.defaultValue);
  });
  it('triggers action on option change', () => {
    const { optionsArray } = filterFormSelectProps;
    render(<FilterFormSelect {...filterFormSelectProps} />);
    const select = screen.getByDisplayValue(filterFormSelectProps.defaultValue);
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(optionsArray.length);
    userEvent.selectOptions(select, optionsArray[2]);
    expect(options[2].selected).toBe(true);
  });
});
