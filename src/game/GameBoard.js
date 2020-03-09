import React, {Component} from 'react';
import GameBoardCell from './GameBoardCell';
import cssClasses from '../css/main.module.css'
let {GAMEBOARD_SIZE, NULL_TURN, GAME_RESULT_UNDECIDED} = require('./constants');
//TODO: push up board attribute to top (Game.js) and save it there as state

class GameBoard extends Component {
  #board = [];
  constructor(props){
    super(props);

    this.makeTurn = this.makeTurn.bind(this);
    this.getUpdatedBoardElement = this.getUpdatedBoardElement.bind(this);

    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      let curRow = [];
      for (let j = i * GAMEBOARD_SIZE; j < (i + 1) * GAMEBOARD_SIZE; j++){
        curRow.push(
          <GameBoardCell 
            num={j}
            key={j}
            curTurn={NULL_TURN}
            makeTurn={this.makeTurn}
          />
        );
      }
      this.#board.push(curRow);
    }
  }

  getUpdatedBoardElement(num){
    let newElement = (
      <GameBoardCell 
        num={num}
        key={num}
        makeTurn={this.makeTurn}
        curTurn={this.props.curTurn}
      />
    );

    return newElement;
  }

  makeTurn(num){
    if (this.props.gameResult !== GAME_RESULT_UNDECIDED){
      return;
    }
    let newElement = this.getUpdatedBoardElement(num);
    let row = Math.floor((num + GAMEBOARD_SIZE) / GAMEBOARD_SIZE - 1);
    let col = num % GAMEBOARD_SIZE;
    this.#board[row][col] = newElement;

    this.props.makeTurn(num);
  }

  render(){
    let board = [];
    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      board.push(
        <div key={i} className={cssClasses['board-row']}>
          {this.#board[i]}
        </div>
      )
    }

    return (
      <div>
        {board}
      </div>
    )
  }
}

export default GameBoard;