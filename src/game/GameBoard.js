import React, {Component} from 'react';
import cssClasses from '../css/main.module.css'
import GameBoardCell from './GameBoardCell'
let {GAMEBOARD_SIZE} = require('./constants');
//TODO: push up board attribute to top (Game.js) and save it there as state

class GameBoard extends Component {
  render(){
    let board = [];
    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      board.push(
        <div key={i} className={cssClasses['board-row']}>
          {this.props.board[i]}
        </div>
      );
    }

    return (
      <div>
        {board}
      </div>
    )
  }
}

export default GameBoard;