import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Autocomplete,
  Chip,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import { 
  Search, 
  MapPin, 
  Target,
  RefreshCw
} from 'lucide-react';
import { Country, State } from 'country-state-city';
import axios from 'axios';

const EnhancedSearchBox = ({ onWeatherUpdate, loading: parentLoading }) => {
  const [searchType, setSearchType] = useState('city'); // 'city' or 'coordinates'
  const [cityName, setCityName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const countries = Country.getAllCountries();

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('weatherApp_recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveRecentSearch = (searchQuery) => {
    const updated = [searchQuery, ...recentSearches.filter(item => item !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('weatherApp_recentSearches', JSON.stringify(updated));
  };

  const fetchCitySuggestions = async (query) => {
    if (!query || query.length < 2) {
      setCitySuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || process.env.MAIN_API_KEY;
      const GEO_API_URL = import.meta.env.VITE_GEO_API_URL || 'https://api.openweathermap.org/geo/1.0/direct';
      
      let searchQuery = query;
      if (selectedCountry) {
        searchQuery += `,${selectedCountry.isoCode}`;
      }
      if (selectedState) {
        searchQuery += `,${selectedState.isoCode}`;
      }
      
      const response = await fetch(`${GEO_API_URL}?q=${searchQuery}&limit=5&appid=${API_KEY}`);
      const data = await response.json();
      
      const suggestions = data.map(item => ({
        name: item.name,
        country: item.country,
        state: item.state || '',
        lat: item.lat,
        lon: item.lon,
        display: `${item.name}${item.state ? `, ${item.state}` : ''}, ${item.country}`
      }));
      
      setCitySuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setCitySuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Debounce city suggestions
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (cityName.trim()) {
        fetchCitySuggestions(cityName);
      } else {
        setCitySuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [cityName, selectedCountry, selectedState]);

  const getCurrentLocation = () => {
    setGettingLocation(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          await getWeatherByCoordinates(latitude, longitude);
          setGettingLocation(false);
        } catch (err) {
          setError('Failed to get weather for current location');
          setGettingLocation(false);
        }
      },
      (err) => {
        let errorMessage = 'Unable to get location';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setError(errorMessage);
        setGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const getWeatherByCoordinates = async (lat, lon) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || process.env.MAIN_API_KEY;
    const API_URL = import.meta.env.VITE_WEATHER_API_URL || process.env.MAIN_API_URL;
    
    const response = await axios.get(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    
    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temp: response.data.main.temp,
      temMin: response.data.main.temp_min,
      temMax: response.data.main.temp_max,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      lon: response.data.coord.lon,
      lat: response.data.coord.lat,
      weather: response.data.weather[0].description,
      weatherMain: response.data.weather[0].main,
      windSpeed: response.data.wind?.speed || 0,
      windDeg: response.data.wind?.deg || 0,
      visibility: response.data.visibility ? response.data.visibility / 1000 : 0,
      cloudiness: response.data.clouds?.all || 0,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset,
      timezone: response.data.timezone
    };
    
    onWeatherUpdate(weatherData);
    saveRecentSearch(`${weatherData.city}, ${weatherData.country}`);
  };

  const getWeatherByCity = async () => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || process.env.MAIN_API_KEY;
    const API_URL = import.meta.env.VITE_WEATHER_API_URL || process.env.MAIN_API_URL;
    
    let query = cityName.trim();
    
    if (selectedCountry) {
      query += `,${selectedCountry.isoCode}`;
    }
    if (selectedState) {
      query += `,${selectedState.isoCode}`;
    }

    const response = await axios.get(`${API_URL}?q=${query}&appid=${API_KEY}&units=metric`);
    
    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temp: response.data.main.temp,
      temMin: response.data.main.temp_min,
      temMax: response.data.main.temp_max,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      lon: response.data.coord.lon,
      lat: response.data.coord.lat,
      weather: response.data.weather[0].description,
      weatherMain: response.data.weather[0].main,
      windSpeed: response.data.wind?.speed || 0,
      windDeg: response.data.wind?.deg || 0,
      visibility: response.data.visibility ? response.data.visibility / 1000 : 0,
      cloudiness: response.data.clouds?.all || 0,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset,
      timezone: response.data.timezone
    };
    
    onWeatherUpdate(weatherData);
    saveRecentSearch(query);
  };

  const handleCitySuggestionSelect = async (suggestion) => {
    setLoading(true);
    setError('');
    setCitySuggestions([]);
    setCityName('');
    
    try {
      await getWeatherByCoordinates(suggestion.lat, suggestion.lon);
    } catch (err) {
      setError('Failed to get weather data for selected city');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!selectedCountry) {
      setError('Please select a country');
      return false;
    }
    
    // Check if states are available for the selected country and require selection
    const availableStates = State.getStatesOfCountry(selectedCountry.isoCode);
    if (availableStates.length > 0 && !selectedState) {
      setError('Please select a state/province for the selected country');
      return false;
    }
    
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await getWeatherByCity();
      setCityName('');
      setCitySuggestions([]);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('City not found. Please check the spelling and try again.');
      } else if (err.response?.status === 401) {
        setError('Invalid API key. Please check your configuration.');
      } else {
        setError('Failed to get weather data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearch = async (searchQuery) => {
    setCityName(searchQuery);
    setLoading(true);
    setError('');
    
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || process.env.MAIN_API_KEY;
      const API_URL = import.meta.env.VITE_WEATHER_API_URL || process.env.MAIN_API_URL;
      
      const response = await axios.get(`${API_URL}?q=${searchQuery}&appid=${API_KEY}&units=metric`);
      
      const weatherData = {
        city: response.data.name,
        country: response.data.sys.country,
        temp: response.data.main.temp,
        temMin: response.data.main.temp_min,
        temMax: response.data.main.temp_max,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        lon: response.data.coord.lon,
        lat: response.data.coord.lat,
        weather: response.data.weather[0].description,
        weatherMain: response.data.weather[0].main,
        windSpeed: response.data.wind?.speed || 0,
        windDeg: response.data.wind?.deg || 0,
        visibility: response.data.visibility ? response.data.visibility / 1000 : 0,
        cloudiness: response.data.clouds?.all || 0,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        timezone: response.data.timezone
      };
      
      onWeatherUpdate(weatherData);
      setCityName('');
    } catch (err) {
      setError('Failed to get weather data for recent search');
    } finally {
      setLoading(false);
    }
  };

  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
          Weather Search
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={getCurrentLocation}
            disabled={gettingLocation}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
            }}
            startIcon={
              gettingLocation ? (
                <CircularProgress size={20} />
              ) : (
                <Target size={20} />
              )
            }
          >
            {gettingLocation ? 'Getting Location...' : 'Use Current Location'}
          </Button>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={countries}
                getOptionLabel={(option) => option.name}
                value={selectedCountry}
                onChange={(event, newValue) => {
                  setSelectedCountry(newValue);
                  setSelectedState(null);
                  setError('');
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Country *" required />
                )}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={states}
                getOptionLabel={(option) => option.name}
                value={selectedState}
                onChange={(event, newValue) => {
                  setSelectedState(newValue);
                  setError('');
                }}
                disabled={!selectedCountry || states.length === 0}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label={states.length > 0 ? "State/Province *" : "State/Province (N/A)"}
                    required={states.length > 0}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ position: 'relative' }}>
                <Autocomplete
                  freeSolo
                  options={citySuggestions}
                  getOptionLabel={(option) => typeof option === 'string' ? option : option.display}
                  value={cityName}
                  onInputChange={(event, newValue) => {
                    setCityName(newValue);
                    setError('');
                  }}
                  onChange={(event, newValue) => {
                    if (newValue && typeof newValue === 'object') {
                      handleCitySuggestionSelect(newValue);
                    }
                  }}
                  loading={loadingSuggestions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="City Name *"
                      placeholder="Type city name..."
                      required
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <MapPin size={20} style={{ marginRight: 8 }} />
                            {params.InputProps.startAdornment}
                          </>
                        ),
                        endAdornment: (
                          <>
                            {loadingSuggestions ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <MapPin size={16} style={{ marginRight: 8 }} />
                      <Box>
                        <Typography variant="body1">{option.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {option.state && `${option.state}, `}{option.country}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  noOptionsText={cityName.length < 2 ? "Type at least 2 characters" : "No cities found"}
                />
              </Box>
            </Grid>
          </Grid>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading || parentLoading || !selectedCountry || !cityName.trim() || (states.length > 0 && !selectedState)}
            sx={{
              py: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
              },
            }}
            startIcon={
              loading ? (
                <CircularProgress size={20} sx={{ color: 'white' }} />
              ) : (
                <Search size={20} />
              )
            }
          >
            {loading ? 'Searching...' : 'Search Weather'}
          </Button>
        </Box>

        {recentSearches.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
              Recent Searches:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {recentSearches.map((search, index) => (
                <Chip
                  key={index}
                  label={search}
                  onClick={() => handleRecentSearch(search)}
                  variant="outlined"
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedSearchBox;
