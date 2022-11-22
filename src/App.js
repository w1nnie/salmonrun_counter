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
    this.handlescoreChange = this.handlescoreChange.bind(this);
    this.state = {score: 40};
  }

  handlescoreChange(value) {
    this.setState({score: value});
  }

  render() {
    console.log(this.state.score);
    return (
      <div className="AppContainer">
        <Display score={this.state.score}/>
        <Buttons
          score={this.state.score}
          onscoreChange={this.handlescoreChange}/>
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
        {this.props.score}
      </div>
    );
  }
}

class Buttons extends React.Component {


  handleClick(score, diff) {
    this.props.onscoreChange(score+diff);
  }
  render() {
    const score = this.props.score;
    return (
      <div className="buttons">
        <div className="grid-wrapper">
          <button className="box" onClick={() => this.handleClick(score, 20)}>+20</button>
          <button className="box" onClick={() => this.handleClick(score, 20)}>+20 ex-O</button>
          <button className="box" onClick={() => this.handleClick(score, 20)}>+20 ex-X</button>
          <button className="box" onClick={() => this.handleClick(score, -20)}>-20</button>
          <button className="box" onClick={() => this.handleClick(score, -10)}>-10</button>
          <button className="box" onClick={() => this.handleClick(score, 0)}>±0 </button>
        </div>
      </div>
    );
  }
}


export default App;
