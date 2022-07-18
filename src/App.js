import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares : Array(9).fill(null),
      count: 0,
      statusText: '',
      xWin : 0,
      oWin: 0,
      whoFirst: '',
      displayQ: true,
    }

    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
  }

  isWinner = () => {
    let a='', b='';
    if(this.state.whoFirst === 'X'){
      a = 'X';
      b = 'O';
    } else {
      a = 'O';
      b = 'X';
    }
    let s = (this.state.count % 2 === 0) ? a : b;
    let someWiner = false;
    for (let i = 0; i < 8; i++) {
      let line = this.winnerLine[i];
      if(this.state.squares[line[0]] === s 
        && this.state.squares[line[1]] === s 
        && this.state.squares[line[2]] === s){
          this.setState({statusText : s + " - win"});
          someWiner = true;
          if(s === 'X'){
            this.setState({xWin: this.state.xWin + 1})
            break
          } else{
            this.setState({oWin: this.state.oWin + 1})
            break
          }
        }
        
    }
    if(this.state.count === 8 && !someWiner){
      this.setState({statusText: "Draw!"})
    }
  }


  clickHandler = event => {
    let a='', b='';
    if(this.state.whoFirst === 'X'){
      a = 'X';
      b = 'O';
    } else {
      a = 'O';
      b = 'X';
    }
    if(this.state.whoFirst === ''){
      alert('Please select who is first!')
    }
    let data = event.target.getAttribute('data');
    let currentSquares = this.state.squares;
    if((currentSquares[data] === null) && (this.state.statusText ==='') && (this.state.whoFirst !== '')){
      currentSquares[data] = (this.state.count % 2 === 0) ? a : b;
      this.setState({ count: this.state.count + 1 });
      this.setState({ squares: currentSquares });
    }

    this.isWinner();
  }

  resetBtn = () => {
      this.setState({squares: Array(9).fill(null)});
      this.setState({count: 0});
      this.setState({statusText : ''});
      this.setState({whoFirst: ''})
      this.setState({displayQ: true})
  }

  setPlayer = (e) => {
      this.setState({whoFirst: e.target.innerText});
      this.setState({displayQ: false});

  }
  
render(){

    return (
      <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="wrap">
        <span>X: {this.state.xWin}</span>
        <span>O: {this.state.oWin}</span>
      </div>
        <div className='tic-tac-toe'>
          <div className="ttt-grid" onClick={this.clickHandler} data="0">{this.state.squares[0]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="1">{this.state.squares[1]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="2">{this.state.squares[2]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="3">{this.state.squares[3]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="4">{this.state.squares[4]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="5">{this.state.squares[5]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="6">{this.state.squares[6]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="7">{this.state.squares[7]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="8">{this.state.squares[8]}</div>
        </div>
        
        {this.state.displayQ ? (<div className="selectFirst">
          <span className='ask'>Who is first?</span> 
          <button className='btn' onClick={this.setPlayer}>X</button>
          <span>or</span> 
          <button className='btn' onClick={this.setPlayer}>O</button>
        </div>) : null }
        
        <p className="statusText">{this.state.statusText}</p>
        <button className="btnRestart" onClick={this.resetBtn}>Restart</button>
      </div>
    );
  }
}

export default App;
