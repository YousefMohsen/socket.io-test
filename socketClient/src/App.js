import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: false,
      joke: false,
      endpoint: "http://localhost:4001",
      message:'messi',
      socket:null,
      messageList: []
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    this.setState({socket:socketIOClient(endpoint)});
    if(this.state.socket){ 
    this.state.socket.on("newJoke", data => this.setState({ joke: data }));
    this.state.socket.on('counter', data => this.setState({ counter: data }))
    this.state.socket.on('messageList', data => this.setState({ messageList: data }))

  }
  }


  sendMessage(){
    if( this.state.socket){
      this.state.socket.emit('sendNewMessage', this.state.message)

    }

  }
  render() {
    const { counter, joke } = this.state;
    console.log('this.state',this.state)
    return (
      <div style={{ textAlign: "center" }}>
        {joke
          ? <p>
            {joke}
          </p>

          : <p>Loading...</p>}

        {counter
          ? <p style={{ marginTop: '40px' }}>
            {counter}
          </p>



          : <p style={{ marginTop: '40px' }} >Loading...</p>}

          <div style={{marginTop:'50px', borderTop:'1px black solid', paddingTop:'30px'}}>
          {this.state.messageList.map((msg)=><p>{msg}</p>)}
          <input onChange={(evt)=>{ this.setState({message:evt.target.value}) }} />
          <button onClick={this.sendMessage}>Send</button>

          </div>
      </div>
    );
  }
}
export default App;