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
    // var axr = $.ajax({
    //   type: 'HEAD',
    //   url: urlString,
    //   success: (data) => {
    //     let tc = axr.getResponseHeader('X-Total-Count');
    //     console.log(tc)
    //   }
    // })
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

  handlePagination() {
  {/*let selected = this will be the number of the current page*/}
  }

  render() {
    return (
      <div>
        <Search onChange={this.onChange} handleClick={this.handleClick}/>
        <ResultList eventList={this.state.eventList}/>
        <ReactPaginate 
          pageCount={ this.state.numberPages }
          pageRangeDisplayed={30}
          marginPagesDisplayed={2}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

