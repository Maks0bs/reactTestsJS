import React, {Component} from 'react';
import cssClasses from '../css/main.module.css'
import GameBoard from './GameBoard';
import GameBoardCell from './GameBoardCell'
import StatusDisplay from './StatusDisplay'
import MovesList from './MovesList'
import MovesListItem from './MovesListItem'
import {GAMEBOARD_SIZE, GAME_RESULT_UNDECIDED,
  GAME_RESULT_DRAW, GAME_WIN_SYMBOLS_CNT, NULL_TURN
} from './constants'

/* TODO TODO TODO TODO TODO
  1) Add return to certain turn (just like in the example)
  2) change turnHistory to persistent normal structure (will not save whole state, but only changes)
*/

class Game extends Component {
  constructor(props){
    super(props);

    this.makeTurn = this.makeTurn.bind(this);
    this.getGameResult = this.getGameResult.bind(this);
    this.validPos = this.validPos.bind(this);
    this.boardComp = this.boardComp.bind(this);
    this.goToTurn = this.goToTurn.bind(this);
    this.getUpdatedBoardElement = this.getUpdatedBoardElement.bind(this);
    this.updateMovesList = this.updateMovesList.bind(this);

    let initState = [];
    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      let row = [];
      for (let j = 0; j < GAMEBOARD_SIZE; j++){
        row.push(NULL_TURN);
      }
      initState.push(row);
    }

    let initBoard = []
    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      let curRow = [];
      for (let j = 0; j < GAMEBOARD_SIZE; j++){
        curRow.push(
          <GameBoardCell 
            row={i} col={j}
            key={i * GAMEBOARD_SIZE + j}
            curTurn={NULL_TURN}
            makeTurn={this.makeTurn}
          />
        );
      }
      initBoard.push(curRow);
    }

    let initMovesList = ([
      <MovesListItem
        num={0}
        key={0}
        value={'Go to game start'}
        goToTurn={this.goToTurn}
      />
    ])

    this.state = {
      turnHistory: [[...initState]],
      realTurn: 0,
      board: initBoard,
      gameResult: GAME_RESULT_UNDECIDED,
      movesList: initMovesList
    }
    
  }

  updateMovesList(){
    /*if (this.state.realTurn + 1=== this.state.turnHistory.length){
      return;
    }*/
    let value;
    if (this.state.realTurn === 0){
      value = 'Go to game start';
    }
    else{
      value = `Go to move #${this.state.realTurn}`;
    }
    this.state.movesList.push(
      <MovesListItem
        num={this.state.realTurn}
        key={this.state.realTurn}
        value={value}
        goToTurn={this.goToTurn}
      />
    )

    
  }

  validPos(i, j){
    return Math.max(i, j) < GAMEBOARD_SIZE && Math.min(i, j) >= 0;
  }

  boardComp(i, j, x, y){
    if (!this.validPos(x, y) || !this.validPos(x, y)){
      return false;
    }
    let a = this.state.turnHistory[this.state.realTurn][i][j];
    let b = this.state.turnHistory[this.state.realTurn][x][y];
    return a !== NULL_TURN && b!== NULL_TURN && ((a % 2) === (b % 2))
  }

  getGameResult(){
    let result = GAME_RESULT_UNDECIDED;
    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      if (result !== GAME_RESULT_UNDECIDED){
        break;
      }
      for (let j = 0; j < GAMEBOARD_SIZE; j++){
        let r = true, d = true, dr = true, ur = true; 
        for (let k = 1; k < GAME_WIN_SYMBOLS_CNT; k++){
          //may be able to optimise if merge some conditions in one
          if (r && !this.boardComp(i, j, i, j + k)){
            r = false;
          }

          if (dr && !this.boardComp(i, j, i + k, j + k)){
            dr = false;
          }

          if (d && !this.boardComp(i, j, i + k, j)){
            d = false;
          }

          if (ur && !this.boardComp(i, j, i - k, j + k)){
            ur = false;
          }
        }

        if (r || d || dr || ur){
          result = this.state.turnHistory[this.state.realTurn][i][j] % 2;
          break;
        }
      }
    }
    if (result === GAME_RESULT_UNDECIDED && 
      this.state.realTurn === GAMEBOARD_SIZE * GAMEBOARD_SIZE
    ){
      result = GAME_RESULT_DRAW;
    }
    return result;
  }

  getUpdatedBoardElement(row, col){
    let newElement = (
      <GameBoardCell 
        row={row} col = {col}
        key={row * GAMEBOARD_SIZE + col}
        makeTurn={this.makeTurn}
        curTurn={this.state.realTurn}
      />
    );

    return newElement;
  }

  makeTurn(row, col){
    //this way of updating state is optimal for arrays (imho), but renderer gives a warning
    //that you shouldn't mutate state directly
    
    if (this.state.gameResult !== GAME_RESULT_UNDECIDED){
      return;
    }
    
    
    let newElement = this.getUpdatedBoardElement(row, col); 
    this.state.board[row][col] = newElement;

    let lastRef = this.state.turnHistory[this.state.realTurn];
    let last = [];
    for (let i = 0; i < lastRef.length; i++){
      last.push(lastRef[i].slice())
    }
    last[row][col] = this.state.realTurn;
    if (this.state.realTurn !== this.state.turnHistory.length - 1){
      this.state.turnHistory = this.state.turnHistory.slice(0, this.state.realTurn + 1);
      this.state.movesList = this.state.movesList.slice(0, this.state.realTurn + 1);
    }

    this.state.realTurn = this.state.realTurn + 1;
    this.updateMovesList();

    this.setState({
      turnHistory: [...this.state.turnHistory, last],
      realTurn: this.state.realTurn,
      board: this.state.board,
      gameResult: this.state.gameResult,
      movesList: this.state.movesList
    });

  }

  goToTurn(num){
    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      for (let j = 0; j < GAMEBOARD_SIZE; j++){
        let cur = this.state.turnHistory[this.state.realTurn][i][j];
        let changeTo = this.state.turnHistory[num][i][j];
        if (cur !== changeTo){
          this.state.board[i][j] = (
            <GameBoardCell 
              row={i} col={j}
              key={i * GAMEBOARD_SIZE + j}
              curTurn={changeTo}
              makeTurn={this.makeTurn}
            />
          );
        }
      }
    }
    
    this.setState({
      //turnHistory: this.state.turnHistory.slice(0, num + 1),
      realTurn: num,
      board: this.state.board
    })
  }

  render(){
    this.state.gameResult = this.getGameResult()

    console.log(this.state);
    
    return (
      <div className={cssClasses.game}>
        <GameBoard 
          boardState={this.state.turnHistory[this.state.realTurn]}
          board={this.state.board}
          makeTurn={this.makeTurn}
        />
        <div className={cssClasses.gameInfo}>
          <StatusDisplay 
            player={this.state.realTurn % 2}
            gameResult={this.state.gameResult}
          />
          <MovesList 
            className={cssClasses.movesList}
            curTurn={this.state.realTurn}
            goToTurn={this.goToTurn}
            movesList={this.state.movesList}
          />
        </div>
      </div>
    );
  }
}

export default Game;