// Temperature conversion utilities

export const convertTemperature = (celsius, unit) => {
  switch (unit) {
    case 'fahrenheit':
      return (celsius * 9/5) + 32;
    case 'kelvin':
      return celsius + 273.15;
    case 'celsius':
    default:
      return celsius;
  }
};

export const getTemperatureUnit = (unit) => {
  switch (unit) {
    case 'fahrenheit':
      return '°F';
    case 'kelvin':
      return 'K';
    case 'celsius':
    default:
      return '°C';
  }
};

export const formatTemperature = (celsius, unit = 'celsius') => {
  const converted = convertTemperature(celsius, unit);
  const symbol = getTemperatureUnit(unit);
  return `${Math.round(converted)}${symbol}`;
};

// Wind speed conversion utilities
export const convertWindSpeed = (ms, unit) => {
  switch (unit) {
    case 'mph':
      return ms * 2.237;
    case 'kmh':
      return ms * 3.6;
    case 'knots':
      return ms * 1.944;
    case 'ms':
    default:
      return ms;
  }
};

export const getWindSpeedUnit = (unit) => {
  switch (unit) {
    case 'mph':
      return 'mph';
    case 'kmh':
      return 'km/h';
    case 'knots':
      return 'knots';
    case 'ms':
    default:
      return 'm/s';
  }
};

export const formatWindSpeed = (ms, unit = 'kmh') => {
  const converted = convertWindSpeed(ms, unit);
  const symbol = getWindSpeedUnit(unit);
  return `${converted.toFixed(1)} ${symbol}`;
};

// Pressure conversion utilities
export const convertPressure = (hpa, unit) => {
  switch (unit) {
    case 'mbar':
      return hpa; // hPa and mbar are equivalent
    case 'mmhg':
      return hpa * 0.750062;
    case 'inhg':
      return hpa * 0.0295301;
    case 'hpa':
    default:
      return hpa;
  }
};

export const getPressureUnit = (unit) => {
  switch (unit) {
    case 'mbar':
      return 'mbar';
    case 'mmhg':
      return 'mmHg';
    case 'inhg':
      return 'inHg';
    case 'hpa':
    default:
      return 'hPa';
  }
};

export const formatPressure = (hpa, unit = 'hpa') => {
  const converted = convertPressure(hpa, unit);
  const symbol = getPressureUnit(unit);
  return `${Math.round(converted)} ${symbol}`;
};

// Distance conversion utilities
export const convertDistance = (km, unit) => {
  switch (unit) {
    case 'miles':
      return km * 0.621371;
    case 'meters':
      return km * 1000;
    case 'km':
    default:
      return km;
  }
};

export const getDistanceUnit = (unit) => {
  switch (unit) {
    case 'miles':
      return 'mi';
    case 'meters':
      return 'm';
    case 'km':
    default:
      return 'km';
  }
};

export const formatDistance = (km, unit = 'km') => {
  const converted = convertDistance(km, unit);
  const symbol = getDistanceUnit(unit);
  
  if (unit === 'meters') {
    return `${Math.round(converted)} ${symbol}`;
  } else {
    return `${converted.toFixed(1)} ${symbol}`;
  }
};
