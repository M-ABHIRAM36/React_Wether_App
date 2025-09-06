import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle
} from 'lucide-react';
import { getWeatherIconData } from '../utils/weatherUtils';

const WeatherIcon = ({ condition, size = 48 }) => {
  const iconData = getWeatherIconData(condition);
  const iconProps = { size, color: iconData.color };
  
  switch (iconData.type) {
    case 'Sun':
      return <Sun {...iconProps} />;
    case 'Cloud':
      return <Cloud {...iconProps} />;
    case 'CloudRain':
      return <CloudRain {...iconProps} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...iconProps} />;
    case 'CloudLightning':
      return <CloudLightning {...iconProps} />;
    case 'CloudSnow':
      return <CloudSnow {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
};

export default WeatherIcon;
