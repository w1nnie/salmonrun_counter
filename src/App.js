// import logo from './logo.svg';
import React from 'react';
import './App.css';


function App() {
  return (
    <div className="App">
      <AppContainer />
    </div>
  );
}

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {eval: 40};
  }

  render() {
    return (
      <div className="AppContainer">
        <Display eval = {this.state.eval}/>
        <Buttons eval = {this.state.eval}/>
      </div>
    );
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="display">
        {this.props.eval}
      </div>
    );
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {eval: 40};
  }

  handleClick(value) {
    this.setState({eval: this.state.eval+value});
    console.log(this.state);
  }
  render() {
    return (
      <div className="buttons">
        <div className="grid-wrapper">
          <button className="box" onClick={() => {this.handleClick(20)}}>+20</button>
          <button className="box" onClick={() => {this.handleClick(20)}}>+20 ex-O</button>
          <button className="box" onClick={() => {this.handleClick(20)}}>+20 ex-X</button>
          <button className="box" onClick={() => {this.handleClick(-20)}}>-20</button>
          <button className="box" onClick={() => {this.handleClick(-10)}}>-10</button>
          <button className="box" onClick={() => {this.handleClick(0)}}>±0 </button>
        </div>
      </div>
    );
  }
}


export default App;
