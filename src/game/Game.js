import React, {Component} from 'react';
import cssClasses from '../css/main.module.css'
import GameBoard from './GameBoard';
import StatusDisplay from './StatusDisplay'
import MovesList from './MovesList'
import {GAMEBOARD_SIZE, NULL_PLAYER, GAME_RESULT_UNDECIDED,
  GAME_RESULT_DRAW, GAME_WIN_SYMBOLS_CNT
} from './constants'

/* TODO TODO TODO TODO TODO
  1) Add return to certain turn (just like in the example)
  2) change turnHistory to persistent normal structure (will not save whole state, but only changes)
*/

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
    this.goToTurn = this.goToTurn.bind(this);
  }

  getPos(i, j){
    if (Math.max(i, j) >= GAMEBOARD_SIZE || Math.min(i, j) < 0){
      return Game.OUT_OF_BOUNDS;
    }
    return i * GAMEBOARD_SIZE + j;
  }

  getGameResult(board){
    let result = GAME_RESULT_UNDECIDED;
    //let board = this.state.turnHistory[this.state.curTurn];
    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      if (result !== GAME_RESULT_UNDECIDED){
        break;
      }
      for (let j = 0; j < GAMEBOARD_SIZE; j++){
        let comp = board[this.getPos(i, j)];
        if (comp === NULL_PLAYER){
          continue;
        }
        let r = true, d = true, dr = true, ur = true; 
        for (let k = 1; k < GAME_WIN_SYMBOLS_CNT; k++){
          //may be able to optimise if merge some conditions in one
          if (r && (this.getPos(i, j + k) === Game.OUT_OF_BOUNDS || 
            board[this.getPos(i, j + k)] !== comp)
          ){
            r = false;
          }

          if (dr && (this.getPos(i + k, j + k) === Game.OUT_OF_BOUNDS || 
            board[this.getPos(i + k, j + k)] !== comp)
          ){
            dr = false;
          }

          if (d && (this.getPos(i + k, j) === Game.OUT_OF_BOUNDS || 
            board[this.getPos(i + k, j)] !== comp)
          ){
            d = false;
          }

          if (ur && (this.getPos(i - k, j + k) === Game.OUT_OF_BOUNDS || 
            board[this.getPos(i - k, j + k)] !== comp)
          ){
            ur = false;
          }
        }

        if (r || d || dr || ur){
          result = comp;
          break;
        }
      }
    }
    if (result === GAME_RESULT_UNDECIDED && 
      this.state.turnHistory.length - 1 === GAMEBOARD_SIZE * GAMEBOARD_SIZE
    ){
      result = GAME_RESULT_DRAW;
    }
    return result;
  }

  makeTurn(num){
    //this way of updating state is optimal for arrays (imho), but renderer gives a warning
    //that you shouldn't mutate state directly
    let last = [...this.state.turnHistory[this.state.curTurn]];
    last[num] = this.state.curTurn % 2;
    this.setState({
      turnHistory: [...this.state.turnHistory, last],
      gameResult: this.getGameResult(last),
      curTurn: this.state.curTurn + 1,
    })
  }

  goToTurn(num){
    this.setState({
      turnHistory: this.state.turnHistory.slice(0, num + 1),
      curTurn: num
    })
  }

  render(){
    console.log(this.state.turnHistory);
    return (
      <div className={cssClasses.game}>
        <GameBoard 
          makeTurn={this.makeTurn} 
          boardState={this.state.turnHistory[this.state.curTurn]}
          curTurn={this.state.curTurn}
          gameResult={this.state.gameResult}
        />
        <div className={cssClasses.gameInfo}>
          <StatusDisplay 
            player={this.state.curTurn % 2}
            gameResult={this.state.gameResult}
          />
          <MovesList 
            className={cssClasses.movesList}
            curTurn={this.state.curTurn}
            goToTurn={this.goToTurn}
          />
        </div>
      </div>
    );
  }
}

export default Game;