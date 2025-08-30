import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./infoBox.css";
export default function InfoBox({info}){
    const getBackdropImage = (weatherMain, weatherDesc) => {
        // More specific mapping based on weather description for better climate representation
        const weatherDescLower = weatherDesc?.toLowerCase() || '';
        
        // Specific weather conditions with climate-appropriate images
        if (weatherDescLower.includes('thunderstorm') || weatherDescLower.includes('storm')) {
            return "https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?q=80&w=1932&auto=format&fit=crop";
        }
        if (weatherDescLower.includes('drizzle') || weatherDescLower.includes('light rain')) {
            return "https://images.unsplash.com/photo-1541911087797-f89237bd95d2?q=80&w=1932&auto=format&fit=crop";
        }
        if (weatherDescLower.includes('rain') || weatherDescLower.includes('shower')) {
            return "https://images.unsplash.com/photo-1527766833261-b9ad8397388e?q=80&w=1932&auto=format&fit=crop";
        }
        if (weatherDescLower.includes('snow') || weatherDescLower.includes('blizzard')) {
            return "https://images.unsplash.com/photo-1511140973288-019d589d7aaf?q=80&w=1932&auto=format&fit=crop";
        }
        if (weatherDescLower.includes('clear') || weatherDescLower.includes('sunny')) {
            return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop";
        }
        if (weatherDescLower.includes('clouds') || weatherDescLower.includes('overcast')) {
            if (weatherDescLower.includes('scattered') || weatherDescLower.includes('broken')) {
                return "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=1932&auto=format&fit=crop";
            }
            return "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1932&auto=format&fit=crop";
        }
        if (weatherDescLower.includes('mist') || weatherDescLower.includes('fog')) {
            return "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1932&auto=format&fit=crop";
        }
        if (weatherDescLower.includes('smoke') || weatherDescLower.includes('haze')) {
            return "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=1932&auto=format&fit=crop";
        }
        if (weatherDescLower.includes('dust') || weatherDescLower.includes('sand')) {
            return "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=1932&auto=format&fit=crop";
        }
        if (weatherDescLower.includes('ash') || weatherDescLower.includes('volcanic')) {
            return "https://images.unsplash.com/photo-1586778742846-0d58d661b0f1?q=80&w=1932&auto=format&fit=crop";
        }
        if (weatherDescLower.includes('squall') || weatherDescLower.includes('tornado')) {
            return "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1932&auto=format&fit=crop";
        }
        
        // Fallback based on main weather category
        const mainMap = {
            Thunderstorm: "https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?q=80&w=1932&auto=format&fit=crop",
            Drizzle: "https://images.unsplash.com/photo-1541911087797-f89237bd95d2?q=80&w=1932&auto=format&fit=crop",
            Rain: "https://images.unsplash.com/photo-1527766833261-b9ad8397388e?q=80&w=1932&auto=format&fit=crop",
            Snow: "https://images.unsplash.com/photo-1511140973288-019d589d7aaf?q=80&w=1932&auto=format&fit=crop",
            Clear: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
            Clouds: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=1932&auto=format&fit=crop",
            Mist: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1932&auto=format&fit=crop",
            Smoke: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=1932&auto=format&fit=crop",
            Haze: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=1932&auto=format&fit=crop",
            Dust: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=1932&auto=format&fit=crop",
            Fog: "https://images.unsplash.com/photo-1468476775582-6bede20f356f?q=80&w=1932&auto=format&fit=crop",
            Sand: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1932&auto=format&fit=crop",
            Ash: "https://images.unsplash.com/photo-1586778742846-0d58d661b0f1?q=80&w=1932&auto=format&fit=crop",
            Squall: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1932&auto=format&fit=crop",
            Tornado: "https://images.unsplash.com/photo-1461511669078-d46bf351cd6e?q=80&w=1932&auto=format&fit=crop",
        };
        
        return mainMap[weatherMain] || "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=1932&auto=format&fit=crop";
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