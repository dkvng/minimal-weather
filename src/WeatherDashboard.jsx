import React, { Component } from "react";
import "./WeatherDashboard.css";

class WeatherDashboard extends Component {
  constructor(props) {
    super(props);

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    this.state = {
      weather: {},
      location: "",
      date: `${year}/${month}/${day}`,
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

  handleSubmit(e) {
    let { location, date } = this.state;
    e.preventDefault();
    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${location}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          throw "Enter a valid major city name";
        }
        let woeid = data[0].woeid;
        return fetch(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/${date}`
        );
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data[0]);
        this.setState({
          weather: data[0],
          error: ""
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          weather: {},
          error: err
        });
        return err;
      });
  }

  convertToF(temp) {
    return Math.round(temp * 9 / 5 + 32);
  }

  render() {
    let { error, weather } = this.state;
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          {error !== "" ? <p>{error}</p> : ""}
          <input
            type="text"
            value={this.state.location}
            onChange={this.update("location")}
            placeholder="Try New York or San Francisco"
          />
          <input type="submit" value="Get Current Weather" />
        </form>

        {Object.values(weather).length > 0 ? (
          <figure>
            <h3>Currently</h3>
            <p>
              {this.convertToF(weather.the_temp)} {weather.weather_state_name}
            </p>
            <p>
              High: {this.convertToF(weather.max_temp)} Low:{" "}
              {this.convertToF(weather.min_temp)}
            </p>
            <p>Humidity: {weather.humidity}%</p>
            <p>
              Wind Speed: {Math.round(weather.wind_speed)} mph{" "}
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

export default WeatherDashboard;
