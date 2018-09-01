import React from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from './Scoreboard.jsx';
import Selector from './Selector.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
    }
  }
  render() {
    return (
      <div>
        <h1> 
          This is my upper level component
        </h1>
        <Selector />
        <Scoreboard />
      </div>
    );
  }
};


ReactDOM.render(<App />, document.getElementById("app"));

