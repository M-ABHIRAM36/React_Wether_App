import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";

export default function InfoBox({info}){
    const getBackdropImage = (weatherMain, weatherDesc) => {
        // Check if it's day or night for better image selection
        const currentHour = new Date().getHours();
        const isDay = currentHour >= 6 && currentHour < 18;
        
        const weatherDescLower = weatherDesc?.toLowerCase() || '';
        
        // Weather-specific images with DISTINCT URLs for each weather type
        const weatherImages = {
            // Thunderstorm - Storm images
            thunderstorm: isDay 
                ? "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
            
            // Rain - Rainy weather images
            rain: isDay
                ? "https://images.unsplash.com/photo-1433863448220-78aaa064ff47?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=60&w=800&auto=format&fit=crop",
            drizzle: isDay
                ? "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=60&w=800&auto=format&fit=crop",
            
            // Snow - Snowy landscape images
            snow: isDay
                ? "https://images.unsplash.com/photo-1551524164-6cf2ac531d83?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=60&w=800&auto=format&fit=crop",
            
            // Clear/Sunny - Bright sky images
            clear: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=60&w=800&auto=format&fit=crop",
            sunny: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=60&w=800&auto=format&fit=crop",
            
            // Clouds - Cloudy sky images (DIFFERENT from clear/sunny)
            clouds: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
            overcast: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
            scattered: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
            broken: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
            
            // Mist/Fog - Foggy/misty images
            mist: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
            fog: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
            
            // Haze/Smoke - Hazy/smoky images
            haze: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
            smoke: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
            
            // Dust/Sand - Dusty/sandy images
            dust: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
            sand: isDay
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
        };
        
        // Check for specific weather conditions first
        for (const [key, image] of Object.entries(weatherImages)) {
            if (weatherDescLower.includes(key) || weatherMain?.toLowerCase() === key) {
                return image;
            }
        }
        
        // Fallback based on main weather category
        const mainWeatherMap = {
            Thunderstorm: weatherImages.thunderstorm,
            Drizzle: weatherImages.drizzle,
            Rain: weatherImages.rain,
            Snow: weatherImages.snow,
            Clear: weatherImages.clear,
            Clouds: weatherImages.clouds,
            Mist: weatherImages.mist,
            Smoke: weatherImages.smoke,
            Haze: weatherImages.haze,
            Dust: weatherImages.dust,
            Fog: weatherImages.fog,
            Sand: weatherImages.sand,
        };
        
        return mainWeatherMap[weatherMain] || weatherImages.clear;
    };

    const iconUrl = info?.weatherIcon ? `https://openweathermap.org/img/wn/${info.weatherIcon}@2x.png` : null;
    const backdrop = getBackdropImage(info?.weatherMain, info?.weather);
    
    return(
        <div className="infoBox">
            <p>Weather Info - {info.weather}</p>
          <div className='cardContainer'>
            <div className="subCard">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                sx={{ height: 140 }}
                image={backdrop}
                title={info.weatherMain || "Weather"}
                loading="lazy"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {info.city}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>           
                    {iconUrl ? <img src={iconUrl} alt={info.weather} width="64" height="64" /> : null}
                    <p> temperature = {info.temp}&deg; C</p>
                    <p>Temp Min = {info.temMin}&deg; C</p>
                    <p>Temp Max = {info.temMax}&deg; C</p>
                    <p>Humidity = {info.humidity}</p>
                    <p> Wind Speed = {info.windSpeed}</p>
                    <p> Wind Deg = {info.windDeg}</p>
                    <p> Longitude= {info.lon}</p>
                    <p> Lantitude = {info.lan}</p>
                  </Typography>
                </CardContent>

              </Card>
            </div>
          </div>
        </div>
    );
}
