import React, { Component } from "react";
import "./WeatherDashboard.css";

class WeatherDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {},
      location: "",
      locationTitle: "",
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  checkCache(location) {
    let adjLocation = location.toUpperCase();

    if (WeatherDashboard.WOEIDS[adjLocation]) {
      return new Promise((resolve, reject) => {
        resolve([{ woeid: WeatherDashboard.WOEIDS[adjLocation] }]);
      });
    } else {
      return fetch(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${location}`
      ).then(response => response.json());
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let { location } = this.state;

    if (location === "") {
      location = "San Francisco";
    }
    this.setState({
      weather: {}
    });

    this.checkCache(location)
      .then(data => {
        if (data.length === 0) {
          throw new Error("Enter a valid major city name");
        }
        let woeid = data[0].woeid;
        return fetch(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`
        );
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          weather: data.consolidated_weather[0],
          locationTitle: data.title,
          error: ""
        });
      })
      .catch(err => {
        this.setState({
          weather: {},
          error: err.message
        });
        return err;
      });
  }

  convertToF(temp) {
    return Math.round(temp * 9 / 5 + 32);
  }

  render() {
    let { error, weather, locationTitle } = this.state;

    return (
      <section className="Weather-section">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.location}
            onChange={this.update("location")}
            placeholder="Try New York or San Francisco"
          />
          <input
            type="submit"
            value="Get Current Weather"
            className="Weather-submit"
          />
          {error !== "" ? <p>{error}</p> : ""}
        </form>

        {Object.values(weather).length > 0 ? (
          <figure>
            <h3>Currently in {locationTitle}</h3>
            <div className={"animate-" + weather.weather_state_abbr} />
            <h2>
              {this.convertToF(weather.the_temp)}&#176;{" "}
              {weather.weather_state_name}
            </h2>
            <p>
              <strong>High: </strong>
              {this.convertToF(weather.max_temp)}&#176;
              <strong> Low: </strong>
              {this.convertToF(weather.min_temp)}&#176;
            </p>
            <p>
              <strong>Humidity: </strong>
              {weather.humidity}%
            </p>
            <p>
              <strong>Wind Speed: </strong>
              {Math.round(weather.wind_speed)} mph{" "}
              {weather.wind_direction_compass}
            </p>
          </figure>
        ) : (
          ""
        )}
      </section>
    );
  }
}

WeatherDashboard.WOEIDS = {
  "NEW YORK": 2459115,
  "SAN FRANCISCO": 2487956,
  PARIS: 615702
};

export default WeatherDashboard;
