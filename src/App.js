import './App.css';
import './app_component/meteo.component';
import Meteo from './app_component/meteo.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import React from 'react';
import './app_component/formulaire.component';
import Formulaire from './app_component/formulaire.component';


const API_key = "1c996892aec8af5126745647e37fa75a";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      tempmax: undefined,
      tempmin: undefined,
      description: "",
      error:false,
    };
    

    this.icon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Couds:"wi-day-fog"
    };

  }

  calculCelsius(temp){
    let cell = Math.floor(temp-273.15)
    return cell;
  }

  get_Weathericon(icon, rangeId){
    // eslint-disable-next-line default-case
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon:this.icon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon:this.icon.Drizzle});
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({icon:this.icon.Rain});
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon:this.icon.Snow});
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon:this.icon.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({icon:this.icon.Clear});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon:this.icon.Couds});
        break;
      
      default:
        this.setState({icon:this.icon.Couds});
    }
  }

  getWeather = async (e) =>{

    e.preventDefault();

    const city = e.target.elements.city.value;

    if(city){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);

      const response = await api_call.json();

      console.log(response);

      this.setState({
        city : `${response.name},${response.sys.country}`,
        celsius : this.calculCelsius(response.main.temp),
        tempmax : this.calculCelsius(response.main.temp_max),
        tempmin : this.calculCelsius(response.main.temp_min),
        description : response.weather[0].description,
        error : false
      })
      this.get_Weathericon(this.icon, response.weather[0].id);
    }else{
      this.setState({error:true});
    }

  };

  state = {};
  render (){
    return(
    <div className="App">
      <Formulaire 
        loadweather= {this.getWeather}
        error = {this.state.error}
      />
      <Meteo 
        city= {this.state.city} 
        country= {this.state.country}
        celsius= {this.state.celsius}
        tempmax= {this.state.tempmax}
        tempmin= {this.state.tempmin}
        description= {this.state.description}
        icon = {this.state.icon}
      />
    </div>
    );
  }

}


export default App;
