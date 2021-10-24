import React from 'react'
import humidity from '../Assets/humidity.png'
import thermometer from '../Assets/thermometer.png'
import wind from '../Assets/wind.png'

function DailyWeatherItem (props){
    return(
      <section>
          <div className="search_list_item">
            <div className="search_list_item_main">
              <div className="list_date_block">
                <span>{props.date}</span>
              </div>
              <div className="search_list_avg_temp">{Math.floor(props.dailyData.temp.day)} F</div>
              <div>
                <div>{props.dailyData.weather[0].main}</div>
              </div>
              <div>
                <span>{Math.floor(props.dailyData.temp.max)} F</span>
                <div className="thermometer"><img src={thermometer}/></div>
                <span>{Math.floor(props.dailyData.temp.min)} F</span>
              </div>
              <div>
                <div>Humidity</div>
                <img src={humidity}/>
                <div>
                  <span>{props.dailyData.humidity}</span>
                  <span> %</span>
                </div>
              </div>
              <div>
                <div>Wind</div>
                <img src={wind}/>
                <div>{props.dailyData.wind_speed} mph</div>
              </div>
            </div>
            <div className="search_list_item_comment">
            {`${props.dailyData.weather[0].main} . Daily avarage temperature is 
              ${props.dailyData.temp.day} F and night avarage is F. Winds at 
              ${props.dailyData.wind_speed} mph.`} 
            </div>
          </div>
    </section>
    )
}

export default DailyWeatherItem