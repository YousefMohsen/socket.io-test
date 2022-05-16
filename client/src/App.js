import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:4001",
      counter:null
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
    socket.on('counter', data => this.setState({ counter: data }))

  }
  render() {
    const { counter } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {counter
          ? <p>
              {counter} 
            </p>
          : <p>Loading...</p>}
      </div>
    );
  }
}
export default App;