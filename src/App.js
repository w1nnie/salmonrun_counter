// import logo from './logo.svg';
import React from 'react';
import './App.css';
import bg_clear from "./salmonrun_assets/clear/bg.png";
import bg_failure from "./salmonrun_assets/failure/bg.png";
import c0 from "./salmonrun_assets/clear/0.png";
import c1 from "./salmonrun_assets/clear/1.png";
import c2 from "./salmonrun_assets/clear/2.png";
import c3 from "./salmonrun_assets/clear/3.png";
import c4 from "./salmonrun_assets/clear/4.png";
import c5 from "./salmonrun_assets/clear/5.png";
import c6 from "./salmonrun_assets/clear/6.png";
import c7 from "./salmonrun_assets/clear/7.png";
import c8 from "./salmonrun_assets/clear/8.png";
import c9 from "./salmonrun_assets/clear/9.png";
import f0 from "./salmonrun_assets/failure/0.png";
import f1 from "./salmonrun_assets/failure/1.png";
import f2 from "./salmonrun_assets/failure/2.png";
import f3 from "./salmonrun_assets/failure/3.png";
import f4 from "./salmonrun_assets/failure/4.png";
import f5 from "./salmonrun_assets/failure/5.png";
import f6 from "./salmonrun_assets/failure/6.png";
import f7 from "./salmonrun_assets/failure/7.png";
import f8 from "./salmonrun_assets/failure/8.png";
import f9 from "./salmonrun_assets/failure/9.png";
import arrow_up from "./salmonrun_assets/clear/up.png";
import arrow_keep from "./salmonrun_assets/failure/keep.png";
import arrow_down from "./salmonrun_assets/failure/down.png";
import boss_clear from "./salmonrun_assets/clear/boss_clear.png";
import boss_failure from "./salmonrun_assets/clear/boss_failure.png";
const c = [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9];
const f = [f0, f1, f2, f3, f4, f5, f6, f7, f8, f9];



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
    this.state = {score: 40, isWin:true, hasEncounteredBoss: true, hasBeatenBoss: true, arrow: "up"};
    this.recordArray = [];
  }

  handlescoreChange(value, win, encounter, beat, arrow) {
    this.setState({score: value, isWin: win, hasEncounteredBoss: encounter, hasBeatenBoss: beat, arrow: arrow});
    this.addScore({score: value, isWin: win, hasEncounteredBoss: encounter, hasBeatenBoss: beat, arrow: arrow});
  }

  addScore(state) {
    this.recordArray.unshift(state);
    // if(this.scoreArray.length > 10) {
      // this.scoreArray.pop();
    // }
  }

  render() {
    // console.log(this.recordArray);
    return (
      <div className="AppContainer">
        <Display 
          recordArray={this.recordArray}/>
        <Buttons
          score={this.state.score}
          onscoreChange={this.handlescoreChange}/>
      </div>
    );
  }
}

function Display(props) {
  const getKey = () => Math.random().toString(32).substring(2);

  const listitems = props.recordArray.map((element, index) =>
    <ScoreImage key={getKey()} record={props.recordArray[index]}/>
  );
  let drawListitems = listitems;

  return (
    <div className="display">{drawListitems.slice(0,10)}</div>
  );
}

function ScoreImage(props) {
  let record = props.record;

  let bg = record.isWin ? bg_clear : bg_failure;


  let third,second,first;
  let thirdValue = Math.floor((record.score % 1000) / 100);
  let secondValue = Math.floor((record.score % 100) / 10);
  let firstValue = Math.floor(record.score % 10);
  third = record.isWin ? c[thirdValue] : f[thirdValue];
  second = record.isWin ? c[secondValue] : f[secondValue];
  first = record.isWin ? c[firstValue] : f[firstValue];

  let arrowState;
  if(record.arrow === "up"){
    arrowState = arrow_up;
  } else if (record.arrow === "keep"){
    arrowState = arrow_keep;
  } else {
    arrowState = arrow_down;
  }

  let bossSrc;
  if(!record.hasEncounteredBoss) { //出現しなかった
    bossSrc = null;
  } else if(record.hasEncounteredBoss && record.hasBeatenBoss){ //出現して勝った
    bossSrc = boss_clear;
  } else { // 出現したけど負けた
    bossSrc = boss_failure;
  }


  return (
    <div className="scoreImage" style={{backgroundImage: `url(${bg})`}}>
      <img className="scoreValue" src={third} style={{display: `${thirdValue === 0 ? "none" : "block"}`}}/>
      <img className="scoreValue" src={second}/>
      <img className="scoreValue" src={first}/>
      <img className="arrow" src={arrowState}/>
      <img className="okashira" src={bossSrc}/>
    </div>
  );
}

class Buttons extends React.Component {
  handleClick(score, diff, isWin, hasEncounteredBoss, hasBeatenBoss, arrow) {
    let newScore = score+diff < 1000 ? score+diff : 999;
    this.props.onscoreChange(newScore, isWin, hasEncounteredBoss, hasBeatenBoss, arrow);
  }
  render() {
    const score = this.props.score;
    return (
      <div className="buttons">
        <div className="grid-wrapper">
          <button className="box" onClick={() => this.handleClick(score, 20, true, false, false, "up")}>+20</button>
          <button className="box" onClick={() => this.handleClick(score, 20, true, true, true, "up")}>+20 ex-O</button>
          <button className="box" onClick={() => this.handleClick(score, 20, true, true, false, "up")}>+20 ex-X</button>
          <button className="box" onClick={() => this.handleClick(score, -20, false, false, false, "down")}>-20</button>
          <button className="box" onClick={() => this.handleClick(score, -10, false, false, false, "down")}>-10</button>
          <button className="box" onClick={() => this.handleClick(score, 0, false, false, false, "keep")}>±0 </button>
        </div>
      </div>
    );
  }
}


export default App;
