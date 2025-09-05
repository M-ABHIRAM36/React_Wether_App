import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';
// import MAIN_API_URL from '../.env';
// import MAIN_API_KEY from '../.env';

export default function SearchBox({updateInfo}){
    const API_URL = process.env.MAIN_API_URL;
    const API_KEY = process.env.MAIN_API_KEY;
    let [city,SetCity] = useState("");
    let [error,SetError] = useState(false);
    let getWeatherInfo = async ()=>{
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            // console.log(jsonResponse);// here full details of weather are there      ---> means its an main object..
            let result = {
                city:city,
                temp:jsonResponse.main.temp,
                temMin : jsonResponse.main.temp_min,
                temMax : jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                lon:jsonResponse.coord.lon,
                lan:jsonResponse.coord.lat,
                weather:jsonResponse.weather[0].description,
                windSpeed : jsonResponse.wind.speed,
                windDeg : jsonResponse.wind.deg,
            }
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }

    }
    


    let HandleChange = (evt) =>{
        SetCity(evt.target.value);
    }

    let HandleSubmit = async (evt)=>{
        try {
            evt.preventDefault();
            console.log(city);
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            SetCity("");
            SetError(false); 
        } catch (err) {
            SetCity("");
            SetError(true);
        }
    }
    return(
        <div className='SearchBox'>
            <h2>Search for the Weather</h2>
            <form onSubmit={HandleSubmit}>
                <TextField id="city" label="City Name" variant="standard" required value={city} onChange={HandleChange}/>   <br /><br />
                <Button variant="contained" type='submit' >Search</Button>
                
                {error ? <p style={{color:"red"}} className='check-error'>No such Place Exits</p>:null}
                
                
            </form>
        </div>
    );
}