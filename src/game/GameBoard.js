import React, {Component} from 'react';
import GameBoardCell from './GameBoardCell';
import cssClasses from '../css/main.module.css'
let {GAMEBOARD_SIZE, NULL_TURN} = require('./constants');
//TODO: push up board attribute to top (Game.js) and save it there as state

class GameBoard extends Component {
  #board = [];
  constructor(props){
    super(props);

    this.makeTurn = this.makeTurn.bind(this);
    this.getUpdatedBoardElement = this.getUpdatedBoardElement.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderBoard = this.renderBoard.bind(this);

    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      let curRow = [];
      for (let j = i * GAMEBOARD_SIZE; j < (i + 1) * GAMEBOARD_SIZE; j++){
        curRow.push(
          <GameBoardCell 
            num={j}
            key={j}
            value={this.props.boardState[j]}
            curTurn={NULL_TURN}
            makeTurn={this.makeTurn}
          />
        );
      }
      this.#board.push(
        <div className={cssClasses['board-row']} key={i}>
          {curRow}
        </div>
      );
    }
  }

  getUpdatedBoardElement(num){
    let curPlayer = this.props.curTurn % 2;

    let newElement = (
      <GameBoardCell 
        num={num}
        key={num}
        value={curPlayer}
        makeTurn={this.makeTurn}
        curTurn={this.props.curTurn}
      />
    );

    return newElement;
  }

  makeTurn(num){
    let newElement = this.getUpdatedBoardElement(num);
    let row = Math.floor((num + GAMEBOARD_SIZE) / GAMEBOARD_SIZE - 1);
    let col = num % GAMEBOARD_SIZE;
    ((this.#board)[row].props.children)[col] = newElement;

    this.props.makeTurn(num);
  }

  renderRow(row, key){
    let boardRow = cssClasses['board-row'];
    let elements = row.props.children;
    let res = [];

    for (let i of elements){
      res.push(i);
    }
    return (
      <div className={boardRow} key={key}>
        {res}
      </div>
    )
  }

  renderBoard(){
    let res = [];
    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      res.push(this.renderRow(this.#board[i], i));
    }
    return res;
  }

  render(){

    return (
      <div>
        {this.renderBoard()}
      </div>
    )
  }
}

export default GameBoard;