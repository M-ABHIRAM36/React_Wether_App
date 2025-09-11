import { render, screen } from '@testing-library/react';
import InfoBox from '../src/InfoBox';

const mockWeatherInfo = {
  city: "London",
  temp: 15.5,
  temMin: 12.0,
  temMax: 18.0,
  humidity: 65,
  lon: -0.1276,
  lan: 51.5074,
  weather: "clear sky",
  windSpeed: 3.2,
  windDeg: 180
};

describe('InfoBox Component', () => {
  test('renders weather information correctly', () => {
    render(<InfoBox info={mockWeatherInfo} />);
    
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('15.5')).toBeInTheDocument();
    expect(screen.getByText('65')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
  });

  test('displays temperature range', () => {
    render(<InfoBox info={mockWeatherInfo} />);
    
    expect(screen.getByText('12.0')).toBeInTheDocument();
    expect(screen.getByText('18.0')).toBeInTheDocument();
  });

  test('shows wind information', () => {
    render(<InfoBox info={mockWeatherInfo} />);
    
    expect(screen.getByText('3.2')).toBeInTheDocument();
  });
});
