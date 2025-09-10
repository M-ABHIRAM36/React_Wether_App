import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";
export default function InfoBox({info}){
    const Img_Url = "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZldyUyMGNsb3VkeSUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    // let info =  {  now this is sended by from weatherApp is props as info only name see in InfoBox() here..up..
    //     city:"hyderabad",
    //     temp:27.33,
    //     temMin : 27.33,
    //     temMax : 27.33,
    //     humidity: 47,
    //     lon:78.4744,
    //     lan:17.3753,
    //     weather:"few clouds",
    //     windSpeed : 4.12,
    //     windDeg :110
    // };
    
    return(
        <div className="infoBox">
            <p>Weather Info - {info.weather}</p>
          <div className='cardContainer'>
            <div className="subCard">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                sx={{ height: 140 }}
                image={Img_Url}
                title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {info.city}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>           
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