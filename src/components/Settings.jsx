import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Grid,
  Chip,
  Modal,
  Backdrop,
} from '@mui/material';
import {
  Lock,
  Eye,
  EyeOff,
  User,
  Mail,
  Save,
  Thermometer,
  Wind,
  Globe,
  Palette,
  Bell,
  Shield,
  Monitor,
  Smartphone,
  Clock,
  Calendar,
  Gauge,
  Ruler,
  Volume2,
  Zap,
  RefreshCw,
  MapPin,
  Image,
  Sunrise,
  Settings2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';

// Styled TextField component for consistent theming
const StyledTextField = ({ children, ...props }) => (
  <TextField
    {...props}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        '&:hover fieldset': {
          borderColor: '#667eea',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#667eea',
          borderWidth: '2px',
        },
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#667eea',
      },
      ...props.sx,
    }}
  >
    {children}
  </TextField>
);

// Styled FormControl for consistent theming
const StyledFormControl = ({ children, ...props }) => (
  <FormControl
    {...props}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#667eea',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#667eea',
          borderWidth: '2px',
        },
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#667eea',
      },
      ...props.sx,
    }}
  >
    {children}
  </FormControl>
);

const Settings = ({ onClose }) => {
  const { user, updateUser } = useAuth();
  const { preferences, updatePreference, resetAllPreferences } = usePreferences();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  // Password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'units', label: 'Units & Format', icon: Ruler },
    { id: 'display', label: 'Display & Theme', icon: Monitor },
    { id: 'behavior', label: 'App Behavior', icon: Settings2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user context (in real app, this would be an API call)
      if (updateUser) {
        updateUser({ ...user, ...profileData });
      }
      
      // Update localStorage
      const userData = JSON.parse(localStorage.getItem('weatherAppUser') || '{}');
      const updatedUser = { ...userData, ...profileData };
      localStorage.setItem('weatherAppUser', JSON.stringify(updatedUser));
      
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    if (!passwordData.currentPassword) {
      setError('Please enter your current password');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call for password change
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = (key, value) => {
    // Use context to update preference
    updatePreference(key, value);
    
    setSuccess(`${key.charAt(0).toUpperCase() + key.slice(1)} preference updated!`);
    setTimeout(() => setSuccess(''), 2000);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all app data? This will reset your preferences and recent searches.')) {
      // Use context to reset all preferences
      resetAllPreferences();
      
      setSuccess('All app data cleared successfully!');
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Box component="form" onSubmit={handleProfileSubmit}>
            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <User size={20} style={{ marginRight: 8 }} />
              Profile Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <User size={20} color="#667eea" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} color="#667eea" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Save size={20} />}
                  sx={{ 
                    mt: 2,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: 2,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a67d8, #6b46c1)',
                    },
                    '&:disabled': {
                      background: 'rgba(102, 126, 234, 0.3)',
                    },
                  }}
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      case 'security':
        return (
          <Box component="form" onSubmit={handlePasswordSubmit}>
            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <Shield size={20} style={{ marginRight: 8 }} />
              Change Password
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility('current')}>
                          {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  helperText="Minimum 6 characters"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility('new')}>
                          {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility('confirm')}>
                          {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Shield size={20} />}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Changing Password...' : 'Change Password'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      case 'units':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <Ruler size={20} style={{ marginRight: 8 }} />
              Units & Format Settings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <StyledFormControl fullWidth>
                  <InputLabel>Temperature Unit</InputLabel>
                  <Select
                    value={preferences.temperatureUnit}
                    onChange={(e) => handlePreferenceChange('temperatureUnit', e.target.value)}
                  >
                    <MenuItem value="celsius">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Thermometer size={16} style={{ marginRight: 8 }} />
                        Celsius (°C)
                      </Box>
                    </MenuItem>
                    <MenuItem value="fahrenheit">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Thermometer size={16} style={{ marginRight: 8 }} />
                        Fahrenheit (°F)
                      </Box>
                    </MenuItem>
                    <MenuItem value="kelvin">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Thermometer size={16} style={{ marginRight: 8 }} />
                        Kelvin (K)
                      </Box>
                    </MenuItem>
                  </Select>
                </StyledFormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Wind Speed Unit</InputLabel>
                  <Select
                    value={preferences.windUnit}
                    onChange={(e) => handlePreferenceChange('windUnit', e.target.value)}
                  >
                    <MenuItem value="kmh">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Wind size={16} style={{ marginRight: 8 }} />
                        Kilometers per hour (km/h)
                      </Box>
                    </MenuItem>
                    <MenuItem value="mph">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Wind size={16} style={{ marginRight: 8 }} />
                        Miles per hour (mph)
                      </Box>
                    </MenuItem>
                    <MenuItem value="ms">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Wind size={16} style={{ marginRight: 8 }} />
                        Meters per second (m/s)
                      </Box>
                    </MenuItem>
                    <MenuItem value="knots">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Wind size={16} style={{ marginRight: 8 }} />
                        Knots (kn)
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Pressure Unit</InputLabel>
                  <Select
                    value={preferences.pressureUnit}
                    onChange={(e) => handlePreferenceChange('pressureUnit', e.target.value)}
                  >
                    <MenuItem value="hpa">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Gauge size={16} style={{ marginRight: 8 }} />
                        Hectopascals (hPa)
                      </Box>
                    </MenuItem>
                    <MenuItem value="mbar">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Gauge size={16} style={{ marginRight: 8 }} />
                        Millibars (mbar)
                      </Box>
                    </MenuItem>
                    <MenuItem value="mmhg">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Gauge size={16} style={{ marginRight: 8 }} />
                        Millimeters of Mercury (mmHg)
                      </Box>
                    </MenuItem>
                    <MenuItem value="inhg">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Gauge size={16} style={{ marginRight: 8 }} />
                        Inches of Mercury (inHg)
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Distance/Visibility Unit</InputLabel>
                  <Select
                    value={preferences.distanceUnit}
                    onChange={(e) => handlePreferenceChange('distanceUnit', e.target.value)}
                  >
                    <MenuItem value="km">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Ruler size={16} style={{ marginRight: 8 }} />
                        Kilometers (km)
                      </Box>
                    </MenuItem>
                    <MenuItem value="miles">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Ruler size={16} style={{ marginRight: 8 }} />
                        Miles (mi)
                      </Box>
                    </MenuItem>
                    <MenuItem value="meters">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Ruler size={16} style={{ marginRight: 8 }} />
                        Meters (m)
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Time Format</InputLabel>
                  <Select
                    value={preferences.timeFormat}
                    onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
                  >
                    <MenuItem value="24h">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Clock size={16} style={{ marginRight: 8 }} />
                        24-hour (15:30)
                      </Box>
                    </MenuItem>
                    <MenuItem value="12h">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Clock size={16} style={{ marginRight: 8 }} />
                        12-hour (3:30 PM)
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Date Format</InputLabel>
                  <Select
                    value={preferences.dateFormat}
                    onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                  >
                    <MenuItem value="dd/mm/yyyy">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Calendar size={16} style={{ marginRight: 8 }} />
                        DD/MM/YYYY (06/09/2024)
                      </Box>
                    </MenuItem>
                    <MenuItem value="mm/dd/yyyy">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Calendar size={16} style={{ marginRight: 8 }} />
                        MM/DD/YYYY (09/06/2024)
                      </Box>
                    </MenuItem>
                    <MenuItem value="yyyy-mm-dd">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Calendar size={16} style={{ marginRight: 8 }} />
                        YYYY-MM-DD (2024-09-06)
                      </Box>
                    </MenuItem>
                    <MenuItem value="dd-mmm-yyyy">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Calendar size={16} style={{ marginRight: 8 }} />
                        DD-MMM-YYYY (06-Sep-2024)
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );

      case 'display':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <Monitor size={20} style={{ marginRight: 8 }} />
              Display & Theme Settings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>App Theme</InputLabel>
                  <Select
                    value={preferences.theme}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  >
                    <MenuItem value="auto">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Palette size={16} style={{ marginRight: 8 }} />
                        Auto (Weather-based)
                      </Box>
                    </MenuItem>
                    <MenuItem value="light">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Sunrise size={16} style={{ marginRight: 8 }} />
                        Light Mode
                      </Box>
                    </MenuItem>
                    <MenuItem value="dark">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Monitor size={16} style={{ marginRight: 8 }} />
                        Dark Mode
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Color Scheme</InputLabel>
                  <Select
                    value={preferences.colorScheme}
                    onChange={(e) => handlePreferenceChange('colorScheme', e.target.value)}
                  >
                    <MenuItem value="default">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Palette size={16} style={{ marginRight: 8 }} />
                        Default Blue
                      </Box>
                    </MenuItem>
                    <MenuItem value="green">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Palette size={16} style={{ marginRight: 8, color: '#4CAF50' }} />
                        Nature Green
                      </Box>
                    </MenuItem>
                    <MenuItem value="purple">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Palette size={16} style={{ marginRight: 8, color: '#9C27B0' }} />
                        Royal Purple
                      </Box>
                    </MenuItem>
                    <MenuItem value="orange">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Palette size={16} style={{ marginRight: 8, color: '#FF9800' }} />
                        Sunset Orange
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Display Mode</InputLabel>
                  <Select
                    value={preferences.displayMode}
                    onChange={(e) => handlePreferenceChange('displayMode', e.target.value)}
                  >
                    <MenuItem value="detailed">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Monitor size={16} style={{ marginRight: 8 }} />
                        Detailed View
                      </Box>
                    </MenuItem>
                    <MenuItem value="compact">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Smartphone size={16} style={{ marginRight: 8 }} />
                        Compact View
                      </Box>
                    </MenuItem>
                    <MenuItem value="minimal">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Smartphone size={16} style={{ marginRight: 8 }} />
                        Minimal View
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Weather Icons Style</InputLabel>
                  <Select
                    value={preferences.weatherIcons}
                    onChange={(e) => handlePreferenceChange('weatherIcons', e.target.value)}
                  >
                    <MenuItem value="animated">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Zap size={16} style={{ marginRight: 8 }} />
                        Animated Icons
                      </Box>
                    </MenuItem>
                    <MenuItem value="static">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image size={16} style={{ marginRight: 8 }} />
                        Static Icons
                      </Box>
                    </MenuItem>
                    <MenuItem value="minimal">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Monitor size={16} style={{ marginRight: 8 }} />
                        Minimal Icons
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.backgroundImages}
                      onChange={(e) => handlePreferenceChange('backgroundImages', e.target.checked)}
                    />
                  }
                  label="Enable dynamic background images"
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                  Show weather-appropriate background images from Unsplash
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.animationsEnabled}
                      onChange={(e) => handlePreferenceChange('animationsEnabled', e.target.checked)}
                    />
                  }
                  label="Enable smooth animations"
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                  Smooth transitions and micro-interactions
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.soundEnabled}
                      onChange={(e) => handlePreferenceChange('soundEnabled', e.target.checked)}
                    />
                  }
                  label="Enable sound effects"
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                  Sound feedback for interactions (coming soon)
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );

      case 'behavior':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <Settings2 size={20} style={{ marginRight: 8 }} />
              App Behavior Settings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  >
                    <MenuItem value="english">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Globe size={16} style={{ marginRight: 8 }} />
                        English
                      </Box>
                    </MenuItem>
                    <MenuItem value="hindi">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Globe size={16} style={{ marginRight: 8 }} />
                        हिंदी (Hindi)
                      </Box>
                    </MenuItem>
                    <MenuItem value="spanish">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Globe size={16} style={{ marginRight: 8 }} />
                        Español (Spanish)
                      </Box>
                    </MenuItem>
                    <MenuItem value="french">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Globe size={16} style={{ marginRight: 8 }} />
                        Français (French)
                      </Box>
                    </MenuItem>
                    <MenuItem value="german">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Globe size={16} style={{ marginRight: 8 }} />
                        Deutsch (German)
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Region</InputLabel>
                  <Select
                    value={preferences.region}
                    onChange={(e) => handlePreferenceChange('region', e.target.value)}
                  >
                    <MenuItem value="auto">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Globe size={16} style={{ marginRight: 8 }} />
                        Auto-detect
                      </Box>
                    </MenuItem>
                    <MenuItem value="us">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Globe size={16} style={{ marginRight: 8 }} />
                        United States
                      </Box>
                    </MenuItem>
                    <MenuItem value="eu">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Globe size={16} style={{ marginRight: 8 }} />
                        Europe
                      </Box>
                    </MenuItem>
                    <MenuItem value="asia">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Globe size={16} style={{ marginRight: 8 }} />
                        Asia-Pacific
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Startup Location</InputLabel>
                  <Select
                    value={preferences.startupLocation}
                    onChange={(e) => handlePreferenceChange('startupLocation', e.target.value)}
                  >
                    <MenuItem value="current">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MapPin size={16} style={{ marginRight: 8 }} />
                        Current Location
                      </Box>
                    </MenuItem>
                    <MenuItem value="last">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RefreshCw size={16} style={{ marginRight: 8 }} />
                        Last Searched Location
                      </Box>
                    </MenuItem>
                    <MenuItem value="none">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Monitor size={16} style={{ marginRight: 8 }} />
                        No Auto-load
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Auto-refresh Interval</InputLabel>
                  <Select
                    value={preferences.refreshInterval}
                    onChange={(e) => handlePreferenceChange('refreshInterval', e.target.value)}
                    disabled={!preferences.autoRefresh}
                  >
                    <MenuItem value="15">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RefreshCw size={16} style={{ marginRight: 8 }} />
                        15 minutes
                      </Box>
                    </MenuItem>
                    <MenuItem value="30">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RefreshCw size={16} style={{ marginRight: 8 }} />
                        30 minutes
                      </Box>
                    </MenuItem>
                    <MenuItem value="60">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RefreshCw size={16} style={{ marginRight: 8 }} />
                        1 hour
                      </Box>
                    </MenuItem>
                    <MenuItem value="120">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RefreshCw size={16} style={{ marginRight: 8 }} />
                        2 hours
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.autoLocation}
                      onChange={(e) => handlePreferenceChange('autoLocation', e.target.checked)}
                    />
                  }
                  label="Auto-detect location on app start"
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                  Automatically detect and load weather for your current location
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.autoRefresh}
                      onChange={(e) => handlePreferenceChange('autoRefresh', e.target.checked)}
                    />
                  }
                  label="Auto-refresh weather data"
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                  Automatically update weather information in the background
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={clearAllData}
                  sx={{ mt: 2 }}
                >
                  Clear All App Data
                </Button>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  This will reset all preferences and clear recent searches
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );

      case 'notifications':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <Bell size={20} style={{ marginRight: 8 }} />
              Notification Settings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.notifications}
                      onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                    />
                  }
                  label="Enable browser notifications"
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Get notified about severe weather conditions and app updates
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Current Notification Status:
                </Typography>
                <Chip
                  label={preferences.notifications ? "Enabled" : "Disabled"}
                  color={preferences.notifications ? "success" : "default"}
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Alert severity="info">
                  <strong>Coming Soon:</strong> Weather alerts, daily forecasts, and severe weather warnings will be available in future updates.
                </Alert>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }
        }
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{ outline: 'none' }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 800,
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            border: 'none',
          }}
        >
          {/* Sidebar */}
          <Box
            sx={{
              width: { xs: '100%', md: 250 },
              borderRight: { md: '1px solid rgba(102, 126, 234, 0.1)' },
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: { md: 4, xs: 0 },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textAlign: 'center'
                }}
              >
                Settings
              </Typography>
              
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <Button
                    key={tab.id}
                    fullWidth
                    variant="text"
                    startIcon={<Icon size={20} />}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setError('');
                      setSuccess('');
                    }}
                    sx={{
                      mb: 1,
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      borderRadius: 2,
                      py: 1.5,
                      px: 2,
                      color: isActive ? 'white' : '#667eea',
                      backgroundColor: isActive 
                        ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                        : 'transparent',
                      background: isActive 
                        ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: isActive 
                          ? 'linear-gradient(135deg, #5a67d8, #6b46c1)'
                          : 'rgba(102, 126, 234, 0.08)',
                        background: isActive 
                          ? 'linear-gradient(135deg, #5a67d8, #6b46c1)'
                          : 'rgba(102, 126, 234, 0.08)',
                      },
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {tab.label}
                  </Button>
                );
              })}
              
              <Button
                fullWidth
                variant="outlined"
                onClick={onClose}
                sx={{ 
                  mt: 3, 
                  textTransform: 'none',
                  borderColor: '#667eea',
                  color: '#667eea',
                  borderRadius: 2,
                  py: 1,
                  '&:hover': {
                    borderColor: '#5a67d8',
                    backgroundColor: 'rgba(102, 126, 234, 0.04)',
                  },
                }}
              >
                Close Settings
              </Button>
            </Box>
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              maxHeight: { xs: '60vh', md: '90vh' },
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    border: '1px solid rgba(244, 67, 54, 0.2)',
                    color: '#d32f2f',
                  }}
                >
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    border: '1px solid rgba(76, 175, 80, 0.2)',
                    color: '#2e7d32',
                  }}
                >
                  {success}
                </Alert>
              )}

              {renderContent()}
            </CardContent>
          </Box>
        </Card>
      </motion.div>
    </Modal>
  );
};

export default Settings;
