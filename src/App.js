/*jshint esversion:6*/

import React, { Component } from 'react';
import logo from './logo.svg';

/*
  Loads in the logo from src/logo.svg
 */
function Logo(props) {
  return (
    <div className="logo">
      <img src={logo} className="logo_picture" alt="logo"/>
    </div>
  );
}

/*
  holds the main info
 */
function Info(props) {
  return (
    <div className="navigation_menu">
      <ul>
        <li>Design + Code + Build</li>
        <li>March 10-11 2018 @ Clemson University</li>
        <li>All skill levels encouraged</li>
      </ul>
    </div>
  );
}

function SocialMedia(props) {
  return (
    <div className="social_media">
      <a href="#" target="blank">
        <i className="fa fa-facebook-square" aria-hidden="true">
        </i>
      </a>
      <a href="https://www.instagram.com/cuhackit/" target="blank">
        <i className="fa fa-instagram" aria-hidden="true">
        </i>
      </a>
      <a href="https://twitter.com/CUhackit" target="blank">
        <i className="fa fa-twitter-square" aria-hidden="true">
        </i>
      </a>
    </div>
  );
}

/*
  allows the countdown to function
 */
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    let now = new Date();
    let hackDate = new Date("March 10, 2018 10:00:00");
    let timeDelta = hackDate - now.getTime();
    this.setState({
      days: Math.floor(timeDelta/86400000),
      hours: Math.floor(timeDelta/3600000) % 24,
      minutes: Math.floor(timeDelta/60000) % 60,
      seconds: Math.floor(timeDelta/1000) % 60,
    });
  }

  render() {
    return (
      <div className="countdown">
        <div className="time days">
          <h1>{ this.state.days }</h1>
          <h6>DAYS</h6>
        </div>
        <div className="time hours">
          <h1>{ this.state.hours }</h1>
          <h6>HRS</h6>
        </div>
        <div className="time minutes">
          <h1>{ this.state.minutes }</h1>
          <h6>MINS</h6>
        </div>
        <div className="time seconds">
          <h1>{ this.state.seconds }</h1>
          <h6>SECS</h6>
        </div>
      </div>
    );
  }
}

/*
  the main app container
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <Logo />
        <Timer />
        <Info />
        <a><button className="interested">INTERESTED?</button></a>
        <SocialMedia />
        <footer>(c) CUhackers</footer>
      </div>
    ); 
  }
}

export default App;
