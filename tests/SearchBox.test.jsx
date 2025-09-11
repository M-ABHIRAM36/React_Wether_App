import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../src/SearchBox';

// Mock the updateInfo function
const mockUpdateInfo = jest.fn();

describe('SearchBox Component', () => {
  beforeEach(() => {
    mockUpdateInfo.mockClear();
  });

  test('renders search input and button', () => {
    render(<SearchBox updateInfo={mockUpdateInfo} />);
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('allows user to type in search input', async () => {
    const user = userEvent.setup();
    render(<SearchBox updateInfo={mockUpdateInfo} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'London');
    
    expect(input.value).toBe('London');
  });

  test('calls updateInfo when search button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBox updateInfo={mockUpdateInfo} />);
    
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    
    await user.type(input, 'London');
    await user.click(button);
    
    // The actual API call would be mocked in a real test
    expect(mockUpdateInfo).toHaveBeenCalled();
  });
});
