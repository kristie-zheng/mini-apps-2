import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';
import Search from './search.jsx';
import ResultList from './resultList.jsx';
import ResultListEntry from './resultListEntry.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: 'default',
      eventList: [],
      numberPages: 1,
      pageCount: 1,
    };
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  // seems that JSON-server sends the data back on error event
  handleClick() {
    const urlString = `http://localhost:3000/events?q=${this.state.searchQuery}&_page=${this.state.pageCount}`;
    var ajaxReq = $.ajax({
      method: 'GET',
      url: urlString,
      type: 'head',
      error: (err) => {
        let totalCount = ajaxReq.getResponseHeader('X-Total-Count');
        this.setState({ eventList: JSON.parse(err.responseText),
        numberPages: Math.ceil(totalCount/10) });
      },
      success: (data) => {
        console.log('data retrieved from server', data);
      },
      dataType: 'application/JSON',
    });
  }

  handlePagination(data) {
    this.setState({ pageCount: data.selected });
    this.handleClick();
  }

  render() {
    return (
      <div>
        <Search onChange={this.onChange} handleClick={this.handleClick}/>
        <ResultList eventList={this.state.eventList}/>
        <ReactPaginate 
          pageCount={ this.state.numberPages }
          pageRangeDisplayed={30}
          marginPagesDisplayed={2}
          onPageChange={this.handlePagination.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

