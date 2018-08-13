import React, { Component } from "react";
import "./App.css";
import WeatherDashboard from "./WeatherDashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Minimal Weather by Dan</h1>
        </header>

        <WeatherDashboard />
      </div>
    );
  }
}

export default App;
