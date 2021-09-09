import React, { useState } from 'react'
import { months, days } from './utils';
import './App.css';

const api = {
  key: '84bf820deb081b3ea8d05f73df5cd87c',
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
        });
    }
  }

  const dateBuilder = (d) => {
    let dia = days[d.getDay()];
    let fecha = d.getDate();
    let mes = months[d.getMonth()];
    let anio = d.getFullYear();
    return `${dia} ${fecha} de ${mes}, ${anio}`;
  }

  return (
    <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar.."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                <p>{Math.round(weather.main.temp)}°C</p>
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="location-box">
              <div className="location">Bienvenido a Climapp</div>
              <div className="date">Ingresa la ciudad que deseas buscar</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
