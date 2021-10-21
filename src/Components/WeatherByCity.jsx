import React, { useEffect } from 'react'
import * as axios from 'axios'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'
import DailyWeatherItem from './DailyWeatherItem'

function WeatherByCity ({dailyData, ...props}){
  
  let {pathname} = useLocation()
  let cityName = pathname.split('/')[2]

  let weekDaysCount = () => {
    let weekFormat = ['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat ']
    let week = [...weekFormat]
    let rest = []
    let a = new Date()
    let todayDay = a.getDay()
    for(let i=0; i<(7-todayDay); i++){
      rest.push(week.pop())
    }
    return [...rest.reverse(), ...week, weekFormat[todayDay]]
  }

  let setTodayWeather = () => {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e9822466c14f5a61fb03c57fe3601e20&units=imperial`)
    .then((res) => props.setCurrentCity(res.data))
  }
  let setDailyWeather = () => {
    axios({
      method: 'get',
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&appid=e9822466c14f5a61fb03c57fe3601e20&exclude=current,minutely,hourly,alerts&units=imperial`
    })
    .then(res => props.setDailyData(res.data.daily))
  }

  useEffect(() => {
    setTodayWeather()
  }, [])

  useEffect(() => {
    if(cityName != props.currentCity){
      setTodayWeather()
    }
    setDailyWeather()
  }, [props.lat, cityName])
  
  let list = !dailyData ? 'Loading' : dailyData.map((el, ind) => <DailyWeatherItem date={weekDaysCount()[ind]} dailyData={el} {...props}/>)

  return(
    <div>
      <div>8 Days Weather {props.currentCity && props.currentCity.name}</div>
      {list}
    </div>
  )
}
const mstp = (state) => ({
  dailyData: state.main.infoByCityDaily,
  currentCity: state.main.currentCity,
  lat: !state.main.currentCity ? null : state.main.currentCity.coord.lat,
  lon: !state.main.currentCity ? null : state.main.currentCity.coord.lon
})
const mdtp = (dispatch) => ({
  setDailyData: (data) => dispatch({type: 'setInfoDaily', info: data}),
  setCurrentCity: (currentCity) => dispatch({type: 'setCurrentCity', currentCity})
})
export default connect(mstp, mdtp)(WeatherByCity)