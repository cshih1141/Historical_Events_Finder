import React from 'react';
import Event from './Event';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };

    this.retrieveHistEvents = this.retrieveHistEvents.bind(this);
  }

  retrieveHistEvents(query) {
    axios.get('/events?_page=1&_limit=10&q=' + query)
      .then((response) => {
        // handle success
        // console.log(response); 
        this.setState({
          events: response.data
        }, () => console.log(this.state.events));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  componentDidMount() {
    this.retrieveHistEvents('hello');
  }

  render() {
    return (
      <div>
        {this.state.events.map((event) => <Event histEvent = {event}/>)}
      </div>
    );
  }
}

export default App;