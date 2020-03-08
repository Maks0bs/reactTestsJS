import React, {Component} from 'react';
import cssClasses from '../css/main.module.css'
import GameBoard from './GameBoard';
import StatusDisplay from './StatusDisplay'
import MovesList from './MovesList'
import {GAMEBOARD_SIZE, NULL_PLAYER, NULL_TURN, GAME_RESULT_UNDECIDED,
  GAME_RESULT_DRAW, GAME_WIN_SYMBOLS_CNT
} from './constants'

class Game extends Component {
  static OUT_OF_BOUNDS = -15;
  constructor(props){
    super(props);

    let initState = [];
    for (let i = 0; i < GAMEBOARD_SIZE * GAMEBOARD_SIZE; i++){
      initState.push(NULL_PLAYER);
    }
    this.state = {
      turnHistory: [[...initState]],
      curTurn: 0,
      gameResult: GAME_RESULT_UNDECIDED
    }
    this.makeTurn = this.makeTurn.bind(this);
    this.getGameResult = this.getGameResult.bind(this);
    this.getPos = this.getPos.bind(this);
  }

  getPos(i, j){
    if (Math.max(i, j) >= GAMEBOARD_SIZE || Math.min(i, j) < 0){
      return Game.OUT_OF_BOUNDS;
    }
    return i * GAMEBOARD_SIZE + j;
  }

  getGameResult(){
    let result = GAME_RESULT_UNDECIDED;
    let board = this.state.turnHistory[this.state.curTurn];

    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      for (let j = 0; j < GAMEBOARD_SIZE; j++){
        let comp = board[this.getPos(i, j)];
        let r = true, d = true, dr = true, ur = true; 
        for (let k = 0; k < GAME_WIN_SYMBOLS_CNT; k++){
          //if ()
        }
      }
    }
    if (result === GAME_RESULT_UNDECIDED && 
      this.state.turnHistory.length === GAMEBOARD_SIZE * GAMEBOARD_SIZE
    ){
      result = GAME_RESULT_DRAW;
    }

    return result;
  }

  makeTurn(num){
    //this way of updating state is optimal for arrays (imho), but renderer gives a warning
    //that you shouldn't mutate state directly
    this.state.turnHistory.push([...this.state.turnHistory[this.state.curTurn]]);
    this.state.turnHistory[this.state.curTurn + 1][num] = this.state.curTurn % 2;
    let gameResult = this.getGameResult();
    this.setState({
      turnHistory: this.state.turnHistory,
      curTurn: this.state.curTurn + 1
    })
  }

  check

  render(){
    console.log(this.state.turnHistory);
    return (
      <div className={cssClasses.game}>
        <GameBoard 
          makeTurn={this.makeTurn} 
          boardState={this.state.turnHistory[this.state.curTurn]}
          curTurn={this.state.curTurn}
        />
        <div className={cssClasses.gameInfo}>
          <StatusDisplay player={this.state.curTurn % 2} winner="1"/>
          <MovesList className={cssClasses.movesList}/>
        </div>
      </div>
    );
  }
}

export default Game;