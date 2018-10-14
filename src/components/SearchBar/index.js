import React, { Component } from "react";

const API_KEY = "d7a4967f6a986eb2ac0ceedd8a9cdfb5";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      cityWeather: "",
      cityName: "",
      errorMessage: ""
    };
  }

  searchWeather = () => {
    const city = this.state.inputValue;
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
    )
      .then(response => response.json())
      .then(city => {
        console.log("city >>>>>>>", city);
        const temperature = Math.round(city.main.temp); // kelvin
        this.setState({
          cityName: city.name,
          cityWeather: temperature,
          inputValue: "",
          errorMessage: ""
        });
      })
      .catch(() => {
        this.setState({
          errorMessage: `${this.state.inputValue} does not exist`,
          inputValue: "",
          cityWeather: ""
        });
      });
  };

  render() {
    return (
      <div>
        <input
          onChange={e =>
            this.setState({
              inputValue: e.target.value
            })
          }
          value={this.state.inputValue}
        />
        <button onClick={this.searchWeather}>Search</button>
        {this.state.cityWeather && (
          <p>
            The current temperature of {this.state.cityName} is{" "}
            {this.state.cityWeather} degrees celsius
          </p>
        )}
        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
      </div>
    );
  }
}

export default SearchBar;
