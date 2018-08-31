import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search.jsx';
import ResultList from './resultList.jsx';
import ResultListEntry from './resultListEntry.jsx';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: 'default',
      eventList: [],
      pageCount: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  // seems that JSON-server sends the data back on error event
  handleClick() {
    const urlString = `http://localhost:3000/events?q=${this.state.searchQuery}`;
    $.ajax({
      method: 'GET',
      url: urlString,
      error: (err) => {
        this.setState({ eventList: JSON.parse(err.responseText) });
      },
      success: (data) => {
        console.log('data retrieved from server', data);
      },
      dataType: 'application/JSON',
    });
  }

  handlePagination() {
  {/*let selected = this will be the number of the current page*/}
  }

  render() {
    return (
      <div>
        <Search onChange={this.onChange} handleClick={this.handleClick}/>
        <ResultList eventList={this.state.eventList}/>
        <ReactPaginate />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

