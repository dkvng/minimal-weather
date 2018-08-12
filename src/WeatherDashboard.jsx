import React, { Component } from "react";

class WeatherDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {},
      location: ""
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
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/photos").then(response => {
      console.log(response);
    });
  }

  render() {
    return (
      <section>
        <form onSubmit={this.handleInput}>
          <input
            type="text"
            value={this.state.location}
            onChange={this.update("location")}
            placeholder="Enter Location"
          />
        </form>
      </section>
    );
  }
}

export default WeatherDashboard;
