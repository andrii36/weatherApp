let {log} = console

let search_button = document.getElementById("search_button")

function getWeatherByCity(cityName){
	return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=&units=imperial`)
  .then(response => response.json())
 }

 function getWeatherDaily(lat, lon){
	return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=&exclude=current,minutely,hourly,alerts&units=imperial`)
  .then(response => response.json())
 }

function transformWindDegree(windDeg){
	let windDegree
	if (windDeg >=315 & windDeg <=360 || windDeg >=0 & windDeg <45){windDegree = "N"}
	else if (windDeg >=45 & windDeg <135){windDegree = "E"}
	else if (windDeg >=135 & windDeg <225){windDegree = "S"}
	else if (windDeg >=225 & windDeg <315){windDegree = "W"}
		return windDegree
}

function dateCount(dateNow, daysAhead){
	return dateNow + daysAhead;
}

function weekDaysCount(){
	let weekFormat = ['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat ']
	let week = ['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat ']
	let rest = []
	let a = new Date()
	let todayDay = a.getDay()
	for(let i=0; i<(7-todayDay); i++){
		rest.push(week.pop())
	}
	return [...rest.reverse(), ...week, weekFormat[todayDay]]
}

function expandItem(elId, ind){
	document.getElementById(elId).className='search_list_item daily_forecast_details'
	document.getElementById(`search_list_item_comment${ind}`).style.display='list-item'
}
function unExpandItem(elId, ind){
	document.getElementById(elId).className='search_list_item'
	document.getElementById(`search_list_item_comment${ind}`).style.display='none'
}

function setData(obj, cityNameId, visibilityId, tempNowId, tempHighId, tempLowId, humidity, windDirId, windSpeedId, weatherImageId){
	let windDegree = transformWindDegree(obj.wind.deg)

 	document.getElementById(cityNameId).innerText=obj.name
 	document.getElementById(visibilityId).innerText=obj.weather[0].main
 	document.getElementById(tempNowId).innerText=Math.round(obj.main.temp)
 	document.getElementById(tempHighId).innerText=Math.round(obj.main.temp_max)
 	document.getElementById(tempLowId).innerText=Math.round(obj.main.temp_min)
 	document.getElementById(humidity).innerText=obj.main.humidity
 	document.getElementById(windDirId).innerText=windDegree
 	document.getElementById(windSpeedId).innerText=Math.round(obj.wind_speed)
 	document.getElementById(weatherImageId).src=`./${obj.weather[0].main}.png`
 }

 function setDailyData(obj, ind, date, weekday){
 	
 	let windDegree = transformWindDegree(obj.wind_deg)

 	document.getElementById(`search_list_avg_temp${ind}`).innerText=Math.round(obj.temp.day)+"F"
 	document.getElementById(`search_list_visibility${ind}`).innerText=obj.weather[0].main
 	document.getElementById(`search_list_temp_high${ind}`).innerText=Math.round(obj.temp.max)
 	document.getElementById(`search_list_temp_low${ind}`).innerText=Math.round(obj.temp.min)
 	document.getElementById(`search_list_humidity${ind}`).innerText=obj.humidity
 	document.getElementById(`search_list_wind_dir${ind}`).innerText=windDegree
 	document.getElementById(`search_list_wind_speed${ind}`).innerText=Math.round(obj.wind_speed)
 	document.getElementById(`search_list_weather_image${ind}`).src=`./${obj.weather[0].main}.png`
 	document.getElementById(`search_list_date${ind}`).innerText=date
 	document.getElementById(`search_list_weekday${ind}`).innerText=weekday
 	document.getElementById(`visibility_desc${ind}`).innerText=obj.weather[0].description
 	document.getElementById(`day_avg_desc${ind}`).innerText=Math.round(obj.temp.day)
 	document.getElementById(`night_avg_desc${ind}`).innerText=Math.round(obj.temp.night)
 	document.getElementById(`wind_dir_desc${ind}`).innerText=windDegree
 	document.getElementById(`wind_speed_desc${ind}`).innerText=Math.round(obj.wind_speed)
 	document.getElementById('search_result_city_name').innerText=document.getElementById('main_search').value
 }

async function getWeatherAndSetData(){
	await getWeatherByCity("London")
	.then((res) => setData(res, 'item_city1', 'visibility1', 'temp_now1', 'temp_high1', 'temp_low1', 'humidity1', 'wind_dir1', 'wind_speed1', 'weather_image1'))

	await getWeatherByCity("New York")
	.then((res) => setData(res, 'item_city2', 'visibility2', 'temp_now2', 'temp_high2', 'temp_low2', 'humidity2', 'wind_dir2', 'wind_speed2', 'weather_image2'))

	await getWeatherByCity("Kyiv")
	.then((res) => setData(res, 'item_city3', 'visibility3', 'temp_now3', 'temp_high3', 'temp_low3', 'humidity3', 'wind_dir3', 'wind_speed3', 'weather_image3'))

	await getWeatherByCity("Tokyo")
	.then((res) => setData(res, 'item_city4', 'visibility4', 'temp_now4', 'temp_high4', 'temp_low4', 'humidity4', 'wind_dir4', 'wind_speed4', 'weather_image4'))

	await getWeatherByCity("Berlin")
	.then((res) => setData(res, 'item_city5', 'visibility5', 'temp_now5', 'temp_high5', 'temp_low5', 'humidity5', 'wind_dir5', 'wind_speed5', 'weather_image5'))
}

async function searchClick(){
	if(!document.getElementById('main_search').value){
		document.getElementById('search_error').innerText='Field is required'
	}else{
		document.getElementById('search_error').innerText=''
		document.getElementById('main_section').style.display = 'none'
		document.getElementById('search_result_section').style.display = 'initial'

		let {coord:{lat, lon}, main:{temp}, name} = await getWeatherByCity(document.getElementById("main_search").value)
		
		let {daily} = await getWeatherDaily(lat, lon)
	
		let d = new Date()

		daily.forEach((obj, ind) => {

			let date
			if(ind==0){date=d.getDate()}else if(ind==1){date=d.getDate()+1}else if(ind==2){date=d.getDate()+2}else if(ind==3){date=d.getDate()+3}
			else if (ind==4){date=d.getDate()+4}else if(ind==5){date=d.getDate()+5}else if(ind==6){date=d.getDate()+6}else if(ind==7){date=d.getDate()+7}
		
			setDailyData(daily[ind], ind, date, weekDaysCount()[ind])

			document.getElementById(`search_list_date_block${ind}`).addEventListener('click', (e) => {
				document.getElementById(`search_list_item${ind}`).className==='search_list_item daily_forecast_details'
				? unExpandItem(e.path[3].id, ind)
				: expandItem(e.path[3].id, ind)
			})
		})
		document.getElementById('main_search').value=''
	}
}

getWeatherAndSetData()
search_button.addEventListener("click", searchClick)

for(let i=1; i<6; i++){
	document.getElementById(`item_city${i}`).addEventListener("click", () => {
		document.getElementById('main_search').value = document.getElementById(`item_city${i}`).innerText
		searchClick()
	})
}
