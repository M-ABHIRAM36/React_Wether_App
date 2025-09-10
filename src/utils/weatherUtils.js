// Weather utility functions without JSX imports

// Weather condition mapping
export const weatherConditions = {
  // Clear
  'clear sky': 'clear',
  'clear': 'clear',
  
  // Clouds
  'few clouds': 'partly-cloudy',
  'scattered clouds': 'cloudy',
  'broken clouds': 'cloudy',
  'overcast clouds': 'overcast',
  
  // Rain
  'light rain': 'light-rain',
  'moderate rain': 'rain',
  'heavy rain': 'heavy-rain',
  'very heavy rain': 'heavy-rain',
  'extreme rain': 'heavy-rain',
  'freezing rain': 'sleet',
  'light intensity shower rain': 'light-rain',
  'shower rain': 'rain',
  'heavy intensity shower rain': 'heavy-rain',
  
  // Drizzle
  'light intensity drizzle': 'drizzle',
  'drizzle': 'drizzle',
  'heavy intensity drizzle': 'drizzle',
  
  // Thunderstorm
  'thunderstorm': 'thunderstorm',
  'thunderstorm with light rain': 'thunderstorm',
  'thunderstorm with rain': 'thunderstorm',
  'thunderstorm with heavy rain': 'thunderstorm',
  
  // Snow
  'light snow': 'light-snow',
  'snow': 'snow',
  'heavy snow': 'heavy-snow',
  'sleet': 'sleet',
  
  // Atmosphere
  'mist': 'fog',
  'fog': 'fog',
  'haze': 'fog',
  'dust': 'fog',
  'sand': 'fog',
  'smoke': 'fog'
};

// Get weather icon type and color
export const getWeatherIconData = (condition) => {
  const weatherType = weatherConditions[condition.toLowerCase()] || 'clear';
  
  switch (weatherType) {
    case 'clear':
      return { type: 'Sun', color: '#FFA500' };
    case 'partly-cloudy':
      return { type: 'Cloud', color: '#87CEEB' };
    case 'cloudy':
    case 'overcast':
      return { type: 'Cloud', color: '#696969' };
    case 'light-rain':
    case 'rain':
    case 'heavy-rain':
      return { type: 'CloudRain', color: '#4682B4' };
    case 'drizzle':
      return { type: 'CloudDrizzle', color: '#4682B4' };
    case 'thunderstorm':
      return { type: 'CloudLightning', color: '#483D8B' };
    case 'light-snow':
    case 'snow':
    case 'heavy-snow':
    case 'sleet':
      return { type: 'CloudSnow', color: '#B0E0E6' };
    case 'fog':
      return { type: 'Cloud', color: '#D3D3D3' };
    default:
      return { type: 'Sun', color: '#FFA500' };
  }
};

// Get weather background gradient based on condition and temperature
export const getWeatherBackground = (condition, temperature) => {
  const weatherType = weatherConditions[condition.toLowerCase()] || 'clear';
  
  if (temperature > 35) {
    return 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)'; // Hot
  } else if (temperature > 25) {
    return 'linear-gradient(135deg, #ffa500 0%, #ff7043 100%)'; // Warm
  } else if (temperature > 15) {
    switch (weatherType) {
      case 'clear':
        return 'linear-gradient(135deg, #87ceeb 0%, #98d8e8 100%)'; // Pleasant clear
      case 'rain':
      case 'drizzle':
        return 'linear-gradient(135deg, #4682b4 0%, #5f9ea0 100%)'; // Rainy
      case 'cloudy':
        return 'linear-gradient(135deg, #696969 0%, #778899 100%)'; // Cloudy
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; // Default mild
    }
  } else if (temperature > 5) {
    return 'linear-gradient(135deg, #4682b4 0%, #2f4f4f 100%)'; // Cool
  } else {
    return 'linear-gradient(135deg, #b0c4de 0%, #4682b4 100%)'; // Cold/Snow
  }
};

// Get weather image URL based on condition
export const getWeatherImageUrl = (condition, temperature) => {
  const weatherType = weatherConditions[condition.toLowerCase()] || 'clear';
  const baseUrl = 'https://images.unsplash.com/';
  
  // Temperature-based selection first
  if (temperature > 35) {
    return `${baseUrl}photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60`; // Hot sunny day
  } else if (temperature < 0) {
    return `${baseUrl}photo-1547754980-3df97fed72a8?w=400&auto=format&fit=crop&q=60`; // Snowy/freezing
  }
  
  // Condition-based selection
  switch (weatherType) {
    case 'clear':
      return `${baseUrl}photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60`; // Clear sky
    case 'partly-cloudy':
      return `${baseUrl}photo-1504608524841-42fe6f032b4b?w=400&auto=format&fit=crop&q=60`; // Partly cloudy
    case 'cloudy':
    case 'overcast':
      return `${baseUrl}photo-1561484930-998b6a7b22e8?w=400&auto=format&fit=crop&q=60`; // Cloudy
    case 'light-rain':
    case 'rain':
    case 'heavy-rain':
      return `${baseUrl}photo-1519692933481-e162a57d6721?w=400&auto=format&fit=crop&q=60`; // Rain
    case 'drizzle':
      return `${baseUrl}photo-1515694346937-94d85e41e6f0?w=400&auto=format&fit=crop&q=60`; // Drizzle
    case 'thunderstorm':
      return `${baseUrl}photo-1605727216801-e27ce1d0cc28?w=400&auto=format&fit=crop&q=60`; // Lightning
    case 'snow':
    case 'light-snow':
    case 'heavy-snow':
      return `${baseUrl}photo-1547754980-3df97fed72a8?w=400&auto=format&fit=crop&q=60`; // Snow
    case 'fog':
      return `${baseUrl}photo-1487621167305-5d248087c724?w=400&auto=format&fit=crop&q=60`; // Fog
    default:
      return `${baseUrl}photo-1504608524841-42fe6f032b4b?w=400&auto=format&fit=crop&q=60`; // Default
  }
};

// Get temperature description
export const getTemperatureDescription = (temp) => {
  if (temp > 40) return 'Extremely Hot 🔥';
  if (temp > 35) return 'Very Hot ☀️';
  if (temp > 30) return 'Hot 🌞';
  if (temp > 25) return 'Warm 😎';
  if (temp > 20) return 'Pleasant 🌤️';
  if (temp > 15) return 'Mild 🌥️';
  if (temp > 10) return 'Cool 🌦️';
  if (temp > 5) return 'Cold 🥶';
  if (temp > 0) return 'Very Cold ❄️';
  return 'Freezing 🧊';
};

// Format time from timestamp
export const formatTime = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'UTC' 
  });
};

// Get wind direction
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(degrees / 22.5) % 16];
};

// Convert meters per second to kilometers per hour
export const msToKmh = (ms) => {
  return (ms * 3.6).toFixed(1);
};

// Get UV index description
export const getUVIndexDescription = (uvIndex) => {
  if (uvIndex <= 2) return { level: 'Low', color: '#4CAF50' };
  if (uvIndex <= 5) return { level: 'Moderate', color: '#FF9800' };
  if (uvIndex <= 7) return { level: 'High', color: '#FF5722' };
  if (uvIndex <= 10) return { level: 'Very High', color: '#E91E63' };
  return { level: 'Extreme', color: '#9C27B0' };
};

// Weather advice based on conditions
export const getWeatherAdvice = (weatherData) => {
  const { temp, weatherMain, humidity, windSpeed } = weatherData;
  const advice = [];
  
  if (temp > 35) {
    advice.push('🏠 Stay indoors during peak hours');
    advice.push('💧 Drink plenty of water');
    advice.push('🧴 Use sunscreen if going out');
  } else if (temp < 5) {
    advice.push('🧥 Dress warmly');
    advice.push('🏠 Stay indoors if possible');
    advice.push('🔥 Keep yourself warm');
  }
  
  if (weatherMain === 'Rain') {
    advice.push('☂️ Carry an umbrella');
    advice.push('🚗 Drive carefully');
    advice.push('👟 Wear waterproof shoes');
  }
  
  if (windSpeed > 10) {
    advice.push('💨 Strong winds expected');
    advice.push('🏠 Secure loose objects');
  }
  
  if (humidity > 80) {
    advice.push('🌫️ High humidity - may feel muggy');
    advice.push('💨 Use fans or AC for comfort');
  }
  
  return advice;
};
