import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { LogOut, User, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import EnhancedSearchBox from './EnhancedSearchBox';
import EnhancedInfoBox from './EnhancedInfoBox';
import SplashScreen from './SplashScreen';
import Settings from './Settings';

const EnhancedWeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    // Try to get weather for current location on app start
    const initializeWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              setLoading(true);
              const { latitude, longitude } = position.coords;
              
              const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || process.env.MAIN_API_KEY;
              const API_URL = import.meta.env.VITE_WEATHER_API_URL || process.env.MAIN_API_URL;
              
              const response = await fetch(`${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
              const data = await response.json();
              
              if (response.ok) {
                const initialWeatherData = {
                  city: data.name,
                  country: data.sys.country,
                  temp: data.main.temp,
                  temMin: data.main.temp_min,
                  temMax: data.main.temp_max,
                  humidity: data.main.humidity,
                  pressure: data.main.pressure,
                  lon: data.coord.lon,
                  lat: data.coord.lat,
                  weather: data.weather[0].description,
                  weatherMain: data.weather[0].main,
                  windSpeed: data.wind?.speed || 0,
                  windDeg: data.wind?.deg || 0,
                  visibility: data.visibility ? data.visibility / 1000 : 0,
                  cloudiness: data.clouds?.all || 0,
                  sunrise: data.sys.sunrise,
                  sunset: data.sys.sunset,
                  timezone: data.timezone
                };
                
                setWeatherData(initialWeatherData);
              }
            } catch (error) {
              console.log('Failed to get initial weather data');
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.log('Geolocation not available');
            setLoading(false);
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000
          }
        );
      }
    };

    // Don't auto-fetch location immediately, wait for splash to finish
    setTimeout(initializeWeather, 3000);
  }, []);

  const handleWeatherUpdate = (newWeatherData) => {
    setWeatherData(newWeatherData);
  };

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: weatherData 
          ? 'linear-gradient(to bottom, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* App Bar */}
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          color: '#333'
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            WeatherScope
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Welcome, {user?.name || 'User'}!
            </Typography>
            
            <IconButton onClick={handleUserMenuClick}>
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: '#667eea'
                }}
              >
                <User size={20} />
              </Avatar>
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleUserMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 180,
                },
              }}
            >
              <MenuItem onClick={() => {
                setShowSettings(true);
                handleUserMenuClose();
              }}>
                <SettingsIcon size={16} style={{ marginRight: 12 }} />
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <LogOut size={16} style={{ marginRight: 12 }} />
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 'bold', 
                color: weatherData ? '#333' : 'white',
                mb: 1 
              }}
            >
              Your Personal Weather Assistant
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: weatherData ? '#666' : 'rgba(255,255,255,0.9)',
                fontWeight: 400 
              }}
            >
              Get accurate weather information for any location worldwide
            </Typography>
          </Box>

          {/* Search Component */}
          <EnhancedSearchBox 
            onWeatherUpdate={handleWeatherUpdate}
            loading={loading}
          />

          {/* Weather Info Component */}
          <EnhancedInfoBox 
            weatherData={weatherData}
            loading={loading}
          />

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 4, py: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: weatherData ? '#666' : 'rgba(255,255,255,0.7)',
                mb: 1 
              }}
            >
              Powered by OpenWeather API
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: weatherData ? '#999' : 'rgba(255,255,255,0.5)' 
              }}
            >
              © 2024 WeatherScope. Built with ❤️ for weather enthusiasts.
            </Typography>
          </Box>
        </motion.div>
      </Container>
      
      {/* Settings Modal */}
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}
    </Box>
  );
};

export default EnhancedWeatherApp;
