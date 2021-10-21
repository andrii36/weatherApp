import { Route } from 'react-router-dom';
import './App.css';
import FrontPage from './Components/FrontPage';
import Header from './Components/Header.jsx'
import WeatherByCity from './Components/WeatherByCity';

function App(props) {
  return (
    <div className="App">
      <Header/>
      <Route exact path='/' render={() => <FrontPage/>}/>
      <Route path='/weather-by-city/:city' render={() => <WeatherByCity/>}/>
    </div>
  )
}

export default App