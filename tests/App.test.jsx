import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Weather App')).toBeInTheDocument();
  });

  test('renders WeatherApp component', () => {
    render(<App />);
    // Check if the main weather app elements are present
    expect(screen.getByText('Weather App')).toBeInTheDocument();
  });
});
