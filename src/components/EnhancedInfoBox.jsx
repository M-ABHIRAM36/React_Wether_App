import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import {
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  getWeatherImageUrl,
  getTemperatureDescription,
  formatTime,
  getWindDirection,
  msToKmh,
  getWeatherAdvice,
  getWeatherBackground,
} from '../utils/weatherUtils';
import { formatTemperature, formatWindSpeed, formatPressure, formatDistance } from '../utils/temperatureUtils';
import { usePreferences } from '../context/PreferencesContext';
import WeatherIcon from './WeatherIcon';

const EnhancedInfoBox = ({ weatherData, loading }) => {
  // Get reactive preferences from context
  const { preferences } = usePreferences();
  const { temperatureUnit, windUnit, pressureUnit, distanceUnit } = preferences;
  const windUnitLabel = windUnit === 'mph' ? 'mph' : windUnit === 'ms' ? 'm/s' : windUnit === 'knots' ? 'kn' : 'km/h';
  const pressureUnitLabel = pressureUnit === 'inhg' ? 'inHg' : pressureUnit === 'mmhg' ? 'mmHg' : pressureUnit === 'mbar' ? 'mbar' : 'hPa';
  const distanceUnitLabel = distanceUnit === 'miles' ? 'mi' : distanceUnit === 'meters' ? 'm' : 'km';
  const formatUtcOffset = (offsetSeconds = 0) => {
    const sign = offsetSeconds >= 0 ? '+' : '-';
    const abs = Math.abs(offsetSeconds);
    const hours = Math.floor(abs / 3600);
    const minutes = Math.floor((abs % 3600) / 60);
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    return `${sign}${hh}:${mm}`;
  };
  
  if (!weatherData) {
    return (
      <Card sx={{ maxWidth: 800, mx: 'auto', mt: 3 }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            Search for a city to get weather information
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const {
    city,
    country,
    temp,
    temMin,
    temMax,
    humidity,
    pressure,
    weather,
    weatherMain,
    windSpeed,
    windDeg,
    visibility,
    cloudiness,
    sunrise,
    sunset,
    timezone,
  } = weatherData;

  const weatherAdvice = getWeatherAdvice(weatherData);
  const temperatureDesc = getTemperatureDescription(temp);
  const weatherBg = getWeatherBackground(weather, temp);
  const tzLabel = formatUtcOffset(timezone);

  const regionToLocale = (region) => {
    switch (region) {
      case 'us':
        return 'en-US';
      case 'eu':
        return 'en-GB';
      case 'asia':
        return 'en-IN';
      default:
        return undefined; // let browser decide
    }
  };

  const formatTimeWithPrefs = (ts) => {
    const date = new Date((ts + timezone) * 1000);
    const hour12 = preferences?.timeFormat === '12h';
    const locale = regionToLocale(preferences?.region);
    return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card 
        sx={{ 
          maxWidth: 800, 
          mx: 'auto', 
          mt: 3,
          background: weatherBg,
          color: 'white',
          overflow: 'visible'
        }}
      >
        {/* Header with weather image */}
        <CardMedia
          sx={{ height: 200, position: 'relative' }}
          image={getWeatherImageUrl(weather, temp)}
          title={`${weather} in ${city}`}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <Box sx={{ mb: 1 }}>
                <WeatherIcon condition={weather} size={64} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                {formatTemperature(temp, temperatureUnit)}
              </Typography>
              <Typography variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                {temperatureDesc}
              </Typography>
            </Box>
          </Box>
        </CardMedia>

        <CardContent sx={{ p: 3 }}>
          {/* Location and basic info */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <MapPin size={20} style={{ marginRight: 8 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {city}, {country}
              </Typography>
            </Box>
            
            <Typography variant="subtitle1" sx={{ opacity: 0.9, textTransform: 'capitalize' }}>
              {weather}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingDown size={16} style={{ marginRight: 4 }} />
                <Typography variant="body2">
                  Low: {formatTemperature(temMin, temperatureUnit)}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp size={16} style={{ marginRight: 4 }} />
                <Typography variant="body2">
                  High: {formatTemperature(temMax, temperatureUnit)}
                </Typography>
              </Box>
              {temMin === temMax && (
                <Typography variant="caption" sx={{ opacity: 0.7, ml: 1 }}>
                  (Current reading)
                </Typography>
              )}
            </Box>
          </Box>

          {/* Weather metrics grid */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'inherit' }}>
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Droplets size={24} style={{ marginBottom: 8 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {humidity}%
                  </Typography>
                  <Typography variant="caption">
                    Humidity
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'inherit' }}>
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Wind size={24} style={{ marginBottom: 8 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {formatWindSpeed(windSpeed, windUnit)}
                  </Typography>
                  <Typography variant="caption">
                    Wind {getWindDirection(windDeg)} ({windUnitLabel})
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'inherit' }}>
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Gauge size={24} style={{ marginBottom: 8 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {formatPressure(pressure, pressureUnit)}
                  </Typography>
                  <Typography variant="caption">
                    Pressure ({pressureUnitLabel})
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'inherit' }}>
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Eye size={24} style={{ marginBottom: 8 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {formatDistance(visibility, distanceUnit)}
                  </Typography>
                  <Typography variant="caption">
                    Visibility ({distanceUnitLabel})
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Additional information */}
          <Grid container spacing={3}>
            {/* Sun times */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'inherit' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Sun Times
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', mb: 1, opacity: 0.85 }}>
                    Timezone UTC{tzLabel}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Sunrise size={20} style={{ marginRight: 8 }} />
                      <Typography variant="body2">Sunrise</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatTimeWithPrefs(sunrise)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Sunset size={20} style={{ marginRight: 8 }} />
                      <Typography variant="body2">Sunset</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatTimeWithPrefs(sunset)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Cloud coverage */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'inherit' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Cloud Coverage
                  </Typography>
                  
                  <Box sx={{ mb: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={cloudiness}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'rgba(255,255,255,0.8)',
                        },
                      }}
                    />
                  </Box>
                  
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    {cloudiness}% cloudy
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Weather advice */}
          {weatherAdvice.length > 0 && (
            <Card sx={{ mt: 3, backgroundColor: 'rgba(255,255,255,0.1)', color: 'inherit' }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Weather Tips
                </Typography>
                <List dense>
                  {weatherAdvice.map((advice, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary={advice}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontSize: '0.9rem' }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Last updated */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              Last updated: {new Date().toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedInfoBox;
