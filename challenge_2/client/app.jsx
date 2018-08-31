import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Graph from './Graph.jsx';
import Chart from 'chart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    $.ajax(
      {
        method: 'GET',
        url: 'https://api.coindesk.com/v1/bpi/historical/close.json',
        error: (err) => {
          console.log('error retrieving data', err);
        },
        success: (data) => {
          console.log('successfully retrieved data', JSON.parse(data));
          for (let i = 0; i < JSON.parse(data).bpi.length; i += 1) {
            for (let key in JSON.parse(data).bpi){
              const obj = {};
              obj.date = key;
              obj.price = JSON.parse(data).bpi[key];
            }
          }
          this.setState(
            {
              data: JSON.parse(data),
            },
          );
          this.createChart();
        },
      },
    );
  }

  createChart() {
    const elementToRenderOn = document.getElementById('chart');
    const lineGraph = new Chart (elementToRenderOn, {
      type: 'line',
      data: this.state.data,
    });
  }

  render() {
    return (
      <div>
        <Graph />
        <p>
          Powered by CoinDesk 
        </p>
      </div>
      );

    // <Graph />
  }
}
ReactDOM.render(<App />, document.getElementById('app'));

