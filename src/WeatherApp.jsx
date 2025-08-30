
import { useState } from 'react';
import SearchBox from './SearchBox';
import InfoBox from './infoBox';

export default function WeatherApp(){
    const [WeatherInfo,setWeatherInfo] = useState({
        city:"hyderabad",
        temp:27.33,
        temMin : 27.33,
        temMax : 27.33,
        humidity: 47,
        lon:78.4744,
        lan:17.3753,
        weather:"few clouds",
        windSpeed : 4.12,
        windDeg :110
    });

    let updateInfo = (WeatherResult)=>{
        setWeatherInfo(WeatherResult);
    }
    return(
        <div style={{textAlign:"center"}}>
            <h1>Weather App</h1>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={WeatherInfo}/>
        </div>
    );
}