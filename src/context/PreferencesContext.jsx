import React, { createContext, useContext, useState, useEffect } from 'react';

const PreferencesContext = createContext();

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    temperatureUnit: localStorage.getItem('weatherApp_temperatureUnit') || 'celsius',
    windUnit: localStorage.getItem('weatherApp_windUnit') || 'kmh',
    pressureUnit: localStorage.getItem('weatherApp_pressureUnit') || 'hpa',
    distanceUnit: localStorage.getItem('weatherApp_distanceUnit') || 'km',
    timeFormat: localStorage.getItem('weatherApp_timeFormat') || '24h',
    dateFormat: localStorage.getItem('weatherApp_dateFormat') || 'dd/mm/yyyy',
    theme: localStorage.getItem('weatherApp_theme') || 'auto',
    colorScheme: localStorage.getItem('weatherApp_colorScheme') || 'default',
    animationsEnabled: localStorage.getItem('weatherApp_animations') !== 'false',
    soundEnabled: localStorage.getItem('weatherApp_sound') !== 'false',
    notifications: localStorage.getItem('weatherApp_notifications') === 'true',
    autoLocation: localStorage.getItem('weatherApp_autoLocation') !== 'false',
    autoRefresh: localStorage.getItem('weatherApp_autoRefresh') === 'true',
    refreshInterval: localStorage.getItem('weatherApp_refreshInterval') || '30',
    language: localStorage.getItem('weatherApp_language') || 'english',
    region: localStorage.getItem('weatherApp_region') || 'auto',
    weatherProvider: localStorage.getItem('weatherApp_provider') || 'openweather',
    displayMode: localStorage.getItem('weatherApp_displayMode') || 'detailed',
    startupLocation: localStorage.getItem('weatherApp_startupLocation') || 'current',
    backgroundImages: localStorage.getItem('weatherApp_backgroundImages') !== 'false',
    weatherIcons: localStorage.getItem('weatherApp_weatherIcons') || 'animated',
  });

  const updatePreference = (key, value) => {
    // Update state
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));

    // Save to localStorage
    localStorage.setItem(`weatherApp_${key}`, value.toString());
  };

  const resetAllPreferences = () => {
    const defaultPreferences = {
      temperatureUnit: 'celsius',
      windUnit: 'kmh',
      pressureUnit: 'hpa',
      distanceUnit: 'km',
      timeFormat: '24h',
      dateFormat: 'dd/mm/yyyy',
      theme: 'auto',
      colorScheme: 'default',
      animationsEnabled: true,
      soundEnabled: true,
      notifications: true,
      autoLocation: true,
      autoRefresh: false,
      refreshInterval: '30',
      language: 'english',
      region: 'auto',
      weatherProvider: 'openweather',
      displayMode: 'detailed',
      startupLocation: 'current',
      backgroundImages: true,
      weatherIcons: 'animated',
    };

    setPreferences(defaultPreferences);

    // Clear localStorage
    Object.keys(defaultPreferences).forEach(key => {
      localStorage.setItem(`weatherApp_${key}`, defaultPreferences[key].toString());
    });

    // Also clear other app data
    localStorage.removeItem('weatherApp_recentSearches');
  };

  const value = {
    preferences,
    updatePreference,
    resetAllPreferences
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};
