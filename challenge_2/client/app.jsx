import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Chart from 'chart.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      prices: [],
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
          const results = [];
          const datesArr = [];
          const pricesArr = [];
          const dataObj = JSON.parse(data);
          for (const dates in dataObj.bpi) {
            const obj = {};
            datesArr.push(dates);
            pricesArr.push(dataObj.bpi[dates]);
            // obj.date = dates;
            // obj.price = dataObj.bpi[dates];
            // results.push(obj);
          }
          this.setState({
            dates: datesArr,
            prices: pricesArr,
          });
          this.createChart();
        },
      },
    );
  }

  createChart() {
    const elementToRenderOn = document.getElementById('thechart');
    const lineGraph = new Chart(elementToRenderOn, {
      type: 'line',
      data: {
        labels: this.state.dates,
        datasets: [
          {
            label: "Bitcoin",
            data: this.state.prices
          }
        ],
      options: {
        title: {
          display: true,
          text: 'Bitcoin Month Price Trend'
        },
        borderColor: 'pink',
      },
    }
  }
  )
    


  }
 
  render() {
    return (
      <div>
        <p>
          Powered by CoinDesk
        </p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
