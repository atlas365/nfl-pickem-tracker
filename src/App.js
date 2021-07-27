import './App.css';
import React from 'react';

import LineChart from './LineChart';
import BarChart from './BarChart';
import RaceChart from './RaceChart';

import data from './data';

class App extends React.Component {

  state = { week: 1, play: true };
  
  startInterval() {
    this.interval = setInterval(() => this.setState({ week: ++this.state.week }), 1500);
  }
  
  stopInterval() {
    clearInterval(this.interval);
  }

  onButtonClick = () => {
    if(this.state.play) {
      this.stopInterval();
    } else {
      this.startInterval();
    }
    this.setState({ play: !this.state.play });
  }

  componentDidMount() {
    this.startInterval();
  }
  
  componentWillUnmount() {
    this.stopInterval();
  }

  render() {
    if (this.state.week === 21) {
      this.stopInterval();
    }

    return (
      <div className="dashboard">
        <div className="race-chart">
          <RaceChart playerDataInput={ data } week={ this.state.week }/>
        </div>
        <button class="ui labeled icon button" onClick={this.onButtonClick}>
          <i className={ this.state.play ? 'pause icon' : 'play icon' }></i>
          {this.state.play ? 'Pause' : 'Play' }
        </button>
      </div>
    ); 
  } 
}

export default App;
