import React from 'react';
import Event from './Event';
import ReactPaginate from 'react-paginate';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      currPage: 1,
      query: ''
    };

    this.retrieveHistEvents = this.retrieveHistEvents.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  retrieveHistEvents(query) {
    console.log(this.state.currPage);
    axios.get('/events?_page=' + this.state.currPage + '&_limit=10&q=' + query)
      .then((response) => {
        // handle success
        // console.log(response); 
        this.setState({
          events: response.data,
          query
        }, () => console.log(this.state.events));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  handlePagination(data) {
    let currPage = data.selected;
    this.setState({
      currPage
    }, this.retrieveHistEvents(this.state.query))
  }

  render() {
    return (
      <div>
        <input id="eventQuery"/>
        <button id="search" onClick={() => this.retrieveHistEvents(document.getElementById('eventQuery').value)}>Search</button>
        <div>
          {this.state.events.map((event) => <Event histEvent = {event}/>)}
        </div>
        <div>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePagination}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    );
  }
}

export default App;