import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="logo">
          <img src={logo} className="logo_picture" alt="logo"/>
        </div>
        <div class="countdown">
          <div class="time days">
            <h1>00</h1>
            <h6>DAYS</h6>
          </div>
          <div class="time hours">
            <h1>00</h1>
            <h6>HRS</h6>
          </div>
          <div class="time minutes">
            <h1>00</h1>
            <h6>MINS</h6>
          </div>
          <div class="time seconds">
            <h1>00</h1>
            <h6>SECS</h6>
          </div>
        </div>
        <div class="navigation_menu">
          <ul>
            <li>Design + Code + Build</li>
            <li>March 10-11 2018 @ Clemson University</li>
            <li>All skill levels encouraged</li>
          </ul>
        </div>
        <a><button class="interested">INTERESTED?</button></a>
        <div class="social_media">
          <a href="#"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
        </div>
        <footer>(c) CUhackers</footer>
      </div>
    );
  }
}

export default App;
