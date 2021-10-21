import React from 'react'
import humidity from '../Assets/humidity.png'
import thermometer from '../Assets/thermometer.png'
import wind from '../Assets/wind.png'
import { NavLink } from 'react-router-dom'

function CityItem ({info}){
    if(!info){
      return 'Loading...'
    } else{
      return (
        <div className="list_item">
          <div className="list_location">
            <NavLink to={`/weather-by-city/${info.name}`} className="list_city_name">{info.name}</NavLink>
            <div>Today </div>
          </div>
          <div>
            <div>{info.weather[0].main}</div>
          </div>
          <div className="temp_now">{info.main.temp} F</div>
          <div>
            <span>{info.main.temp_max} F</span>
            <div className="thermometer"><img src={thermometer}/></div>
            <span>{info.main.temp_min} F</span>
          </div>
          <div>
            <div>Humidity</div>
            <img src={humidity}/>
            <div>
              <span>{info.main.humidity}</span>
              <span> %</span>
            </div>
          </div>
          <div>
            <div>Wind</div>
            <img src={wind}/>
            <div>{info.wind.speed} mph</div>
          </div>
        </div>
      )
    } 
      
    
}

export default CityItem