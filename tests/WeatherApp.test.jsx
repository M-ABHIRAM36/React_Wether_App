import { render, screen } from '@testing-library/react';
import WeatherApp from '../src/WeatherApp';

describe('WeatherApp Component', () => {
  test('renders weather app title', () => {
    render(<WeatherApp />);
    expect(screen.getByText('Weather App')).toBeInTheDocument();
  });

  test('displays default weather information', () => {
    render(<WeatherApp />);
    
    // Check if default weather data is displayed
    expect(screen.getByText('hyderabad')).toBeInTheDocument();
    expect(screen.getByText('27.33')).toBeInTheDocument();
    expect(screen.getByText('47')).toBeInTheDocument();
    expect(screen.getByText('few clouds')).toBeInTheDocument();
  });

  test('renders search box and info box components', () => {
    render(<WeatherApp />);
    
    // Check if search functionality is present
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
