import React from 'react';
import { io } from 'socket.io-client';

import './App.css';

const socketURL = '/';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      show: false
    };
    this.login = this.login.bind(this);
    this.clickme = this.clickme.bind(this);
  }

  componentDidMount() {
    this.initSocket();
  }
  initSocket = ()=>{
    this.socket = io(socketURL);
    this.socket.on('show', (bool) => {
      this.setState({show: bool});
    });
  }

  login() {
    this.socket.emit('login');
    this.setState({logged_in: true});
  }
  clickme() {
    this.socket.emit('clicked');
  }
  render() {
    return (
      <div className="App">
        {!this.state.logged_in && <button onClick={this.login}>Log In</button>}
        {this.state.show && <button onClick={this.clickme}>Click Me!</button>}
      </div>
    );
  }
}
