import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import "./SearchBox.css";
import { useState, useEffect } from 'react';
export default function SearchBox({updateInfo}){
    const API_URL = import.meta.env.VITE_MAIN_API_URL;
    const API_KEY = import.meta.env.VITE_MAIN_API_KEY;
    let [city,SetCity] = useState("");
    let [error,SetError] = useState(false);
    let [suggestions, setSuggestions] = useState([]);
    let [loading, setLoading] = useState(false);
    let [searchCache, setSearchCache] = useState({});
    let [searchCompleted, setSearchCompleted] = useState(false);

    // Function to get place suggestions from Geocoding API
    let getPlaceSuggestions = async (query) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            setSearchCompleted(false);
            return;
        }
        
        // Check cache first
        const cacheKey = query.toLowerCase();
        if (searchCache[cacheKey]) {
            setSuggestions(searchCache[cacheKey]);
            setSearchCompleted(true);
            return;
        }
        
        try {
            setLoading(true);
            console.log('Searching for:', query); // Debug log
            
            // Check if API key is available
            if (!API_KEY) {
                console.error('API Key not found');
                setSuggestions([]);
                setError(true);
                return;
            }
            
            // Direct search only
            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=50&appid=${API_KEY}`
            );
            
            if (!response.ok) {
                console.error('API Error:', response.status, response.statusText);
                setSuggestions([]);
                return;
            }
            
            const data = await response.json();
            console.log('API Response:', data); // Debug log
            
            if (!data || data.length === 0) {
                console.log('No results found for:', query);
                setSuggestions([]);
                setSearchCompleted(true);
                return;
            }
            
            // Format suggestions with country and state for disambiguation and remove duplicates
            const seen = new Set();
            const formattedSuggestions = data
                .filter(place => {
                    // Create unique key including state for better disambiguation
                    const stateInfo = place.state ? `, ${place.state}` : '';
                    const key = `${place.name}, ${place.country}${stateInfo}`;
                    if (seen.has(key)) {
                        return false;
                    }
                    seen.add(key);
                    return true;
                })
                .sort((a, b) => {
                    // Sort by relevance - exact matches first, then partial matches
                    const aName = a.name.toLowerCase();
                    const bName = b.name.toLowerCase();
                    const queryLower = query.toLowerCase();
                    
                    // Exact match gets highest priority
                    if (aName === queryLower && bName !== queryLower) return -1;
                    if (aName !== queryLower && bName === queryLower) return 1;
                    
                    // Starts with query gets second priority
                    if (aName.startsWith(queryLower) && !bName.startsWith(queryLower)) return -1;
                    if (!aName.startsWith(queryLower) && bName.startsWith(queryLower)) return 1;
                    
                    // Contains query gets third priority
                    if (aName.includes(queryLower) && !bName.includes(queryLower)) return -1;
                    if (!aName.includes(queryLower) && bName.includes(queryLower)) return 1;
                    
                    // If same city name, sort by country then state
                    if (aName === bName) {
                        if (a.country !== b.country) {
                            return a.country.localeCompare(b.country);
                        }
                        if (a.state && b.state) {
                            return a.state.localeCompare(b.state);
                        }
                        return 0;
                    }
                    
                    return aName.localeCompare(bName);
                })
                .slice(0, 20) // Show up to 20 unique suggestions
                .map(place => {
                    // Create label with state information for better disambiguation
                    const stateInfo = place.state ? `, ${place.state}` : '';
                    const label = `${place.name}, ${place.country}${stateInfo}`;
                    return {
                        label: label,
                        value: label,
                        lat: place.lat,
                        lon: place.lon,
                        country: place.country,
                        state: place.state
                    };
                });
            
            setSuggestions(formattedSuggestions);
            setSearchCompleted(true);
            // Cache the results
            setSearchCache(prev => ({
                ...prev,
                [cacheKey]: formattedSuggestions
            }));
        } catch (err) {
            console.error('Error fetching place suggestions:', err);
            setSuggestions([]);
            setSearchCompleted(true);
            // Show error message to user
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    let getWeatherInfo = async (selectedPlace = null)=>{
        try {
            if(!API_URL || !API_KEY) {
                throw new Error("Missing API configuration");
            }
            
            // Use coordinates if a specific place is selected, otherwise use city name
            let weatherUrl;
            if (selectedPlace && selectedPlace.lat && selectedPlace.lon) {
                weatherUrl = `${API_URL}?lat=${selectedPlace.lat}&lon=${selectedPlace.lon}&appid=${API_KEY}&units=metric`;
            } else {
                weatherUrl = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
            }
            
            // Get current weather data
            let currentResponse = await fetch(weatherUrl);
            let currentData = await currentResponse.json();
            
            // Check if the API returned an error (city not found)
            if (currentData.cod && currentData.cod !== 200) {
                throw new Error("City not found");
            }
            
            // Get 5-day forecast data for realistic daily min/max temperatures
            let forecastUrl;
            if (selectedPlace && selectedPlace.lat && selectedPlace.lon) {
                forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedPlace.lat}&lon=${selectedPlace.lon}&appid=${API_KEY}&units=metric`;
            } else {
                forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
            }
            let forecastResponse = await fetch(forecastUrl);
            let forecastData = await forecastResponse.json();
            
            // Check if forecast API returned an error
            if (forecastData.cod && forecastData.cod !== "200") {
                console.warn("Forecast API error, using current weather data only");
            }
            
            // Extract today's min/max from forecast data
            let todayMin = null;
            let todayMax = null;
            
            if (forecastData.list && forecastData.list.length > 0) {
                // Get today's date
                let today = new Date().toDateString();
                
                // Find all forecasts for today
                let todayForecasts = forecastData.list.filter(item => {
                    let forecastDate = new Date(item.dt * 1000).toDateString();
                    return forecastDate === today;
                });
                
                if (todayForecasts.length > 0) {
                    // Get min and max temperatures from today's forecasts
                    let temps = todayForecasts.map(item => item.main.temp);
                    todayMin = Math.min(...temps);
                    todayMax = Math.max(...temps);
                }
            }
            
            // Fallback to current weather data if forecast data is not available
            if (todayMin === null || todayMax === null) {
                todayMin = currentData.main.temp_min;
                todayMax = currentData.main.temp_max;
            }
            
            let result = {
                city: selectedPlace ? selectedPlace.label : currentData.name,
                temp:currentData.main.temp,
                temMin : Math.round(todayMin * 10) / 10,
                temMax : Math.round(todayMax * 10) / 10,
                humidity: currentData.main.humidity,
                lon:currentData.coord.lon,
                lan:currentData.coord.lat,
                weather:currentData.weather[0].description,
                weatherMain: currentData.weather[0].main,
                weatherIcon: currentData.weather[0].icon,
                windSpeed : currentData.wind.speed,
                windDeg : currentData.wind.deg,
            }
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }

    }
    


    // Debounced search for place suggestions
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (city.length >= 2) {
                setSearchCompleted(false); // Reset search completion status
                getPlaceSuggestions(city);
            } else {
                setSuggestions([]);
                setSearchCompleted(false);
                setError(false); // Clear error when input is too short
            }
        }, 150); // Even faster response

        return () => clearTimeout(timeoutId);
    }, [city]);

    let HandleChange = (evt) =>{
        SetCity(evt.target.value);
        // Clear error when user starts typing
        if (error) {
            SetError(false);
        }
    }

    let HandlePlaceSelect = (event, selectedOption) => {
        if (selectedOption) {
            SetCity(selectedOption.value);
            // Clear error when place is selected
            SetError(false);
            // Automatically get weather for selected place
            getWeatherForPlace(selectedOption);
        }
    };

    let getWeatherForPlace = async (selectedPlace) => {
        try {
            let newInfo = await getWeatherInfo(selectedPlace);
            updateInfo(newInfo);
            SetError(false);
        } catch (err) {
            SetError(true);
        }
    };

    let HandleSubmit = async (evt)=>{
        try {
            evt.preventDefault();
            console.log(city);
            
            // Check if city input is empty or too short
            if (!city || city.length < 2) {
                SetError(true);
                return;
            }
            
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            SetCity("");
            SetError(false); 
        } catch (err) {
            SetCity("");
            SetError(true);
        }
    }
    return(
        <div className='SearchBox'>
            <h2>Search for the Weather</h2>
            <form onSubmit={HandleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Autocomplete
                    freeSolo
                    options={suggestions}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
                    value={city}
                     onInputChange={(event, newInputValue) => {
                         SetCity(newInputValue);
                         // Clear error when user starts typing
                         if (error) {
                             SetError(false);
                         }
                     }}
                    onChange={HandlePlaceSelect}
                    loading={loading}
                    sx={{ width: 300 }} // Fixed width to match original
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="City Name"
                            variant="standard"
                            required
                            sx={{ width: 300 }} // Fixed width
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? 'Loading...' : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <li {...props}>
                            <div>
                                <strong>{option.label}</strong>
                                {option.state && <div style={{fontSize: '0.8em', color: '#666'}}>{option.state}</div>}
                            </div>
                        </li>
                    )}
                />
                <br /><br />
                <Button variant="contained" type='submit' >Search</Button>
                
                {error ? <p style={{color:"red"}} className='check-error'>No such Place Exists</p>:null}
                
                
            </form>
        </div>
    );
}