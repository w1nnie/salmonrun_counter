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
    this.addScore = this.addScore.bind(this);
    this.state = {score: 40};
    this.scoreArray = [];
  }

  handlescoreChange(value) {
    this.setState({score: value});
    this.addScore(value);
  }

  addScore(value) {
    this.scoreArray.unshift(value);
    if(this.scoreArray.length > 10) {
      this.scoreArray.pop();
    }
  }

  render() {
    return (
      <div className="AppContainer">
        <Display scoreArray={this.scoreArray}/>
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
    console.log(this.props.scoreArray)
    const listitems = this.props.scoreArray.map((number) =>
      // <li key={number.toString()}>{number}</li>
      <ScoreImage key={number.toString()} value={number} />
    );
    return (
      <div className="display">{listitems}</div>
    );
  }
}

function ScoreImage(props) {
  // return <div className="scoreImage">{number}</div>;
  return <div className="scoreImage">{props.value}</div>;
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
