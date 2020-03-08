import React, {Component} from 'react';
import cssClasses from './css/main.module.css'

const GAMEBOARD_SIZE = 3;
const PLAYERS = ['X', 'O'];
//handle rerendering


class PlayerDisplay extends Component {
  constructor(props){
    super(props);

    this.render = this.render.bind(this);
  }

  render(){
    return (
      <div>
        <div>Next player: {PLAYERS[this.props.player]}</div>
      </div>
    )
  }
}

class MovesList extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={this.props.className}>
        <div>Sample text MovesList</div>
      </div>
    )
  }
}

class GameBoardCell extends Component {
  constructor(props){
    console.log('constructed');
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.blockClick = this.blockClick.bind(this);
    //console.log('created');


    this.state = {
      value: this.props.value
    }

  }


  handleClick(){
    //console.log('clicked ' + this.props.num + ' ' + this.props.value);
    let curPlayer = this.props.onChecked(this.props.num);
    this.setState({
      value: curPlayer
    });
  }

  blockClick(){
    return;
  }

  render(){
    console.log('value: ' + this.state.value);
    let square = cssClasses.square;
    let squareSideText = cssClasses.squareSideText;
    let squareOuter = cssClasses.squareOuter;
    let value, handler;
    if (this.state.value === -1){
      value = " ";
      handler = this.handleClick;
    }
    else{
      value = PLAYERS[this.state.value];
      handler = this.blockClick;
    }
    return (
      <div className={squareOuter}>
        <div className={squareSideText}>1</div>
        <button 
          className={square} 
          onClick={handler}>

          {value}
        </button>
      </div>
    )
  }
}


class GameBoard extends Component {
  #board;
  constructor(props){
    super(props);

    this.handeTurn = this.handeTurn.bind(this);
    this.updateBoard = this.updateBoard.bind(this);

    let boardRow = cssClasses['board-row'];
    let table = [];
    for (let i = 0; i < GAMEBOARD_SIZE; i++){
      let curRow = [];
      for (let j = i * GAMEBOARD_SIZE; j < (i + 1) * GAMEBOARD_SIZE; j++){
        curRow.push(
          <GameBoardCell 
            num={j}
            key={j}
            value={this.props.boardState[j]}
            onChecked={this.handeTurn}
          />
        );
      }
      table.push(
        <div className={boardRow} key={i}>
          {curRow}
        </div>
      );
    }

    this.#board = table;
  }

  updateBoard(num){
    //console.log('boardstatenum: ' + this.props.boardState[num]);
    let value = this.props.boardState[num];
    let row = Math.floor((num + GAMEBOARD_SIZE) / GAMEBOARD_SIZE - 1);
    let col = num % GAMEBOARD_SIZE;
    let newElement = (
      <GameBoardCell 
        num={num}
        key={num}
        value={value}
        boardState={this.props.boardState}
        onChecked={this.handeTurn}
      />
    );

    


    ((this.#board)[row].props.children).splice(col, 1, newElement);
  }

  handeTurn(num){
    this.props.onMakeTurn(num);
    return this.props.boardState[num];
    this.updateBoard(num);
  }


  render(){
    console.log(this.#board);


    
    return (
      <div>
        {this.#board}
      </div>
    )
  }
}


class Game extends Component {
  constructor(props){
    super(props);

    this.state = {
      curPlayer: 0,
      turnsPassed: 0,
      boardState: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      turnHistory: []
    }

    this.makeTurn = this.makeTurn.bind(this);
  }

  makeTurn(num){
    //this.changePlayer();
    this.state.turnHistory.push(this.state.boardState);
    this.state.boardState[num] = this.state.curPlayer;
    //console.log(this.state.boardState);

    this.setState({
      turnHistory: this.state.turnHistory,
      boardState: this.state.boardState,
      curPlayer: this.state.curPlayer ^ 1,
      turnsPassed: this.state.turnsPassed + 1
    })
  }

  render(){
    let game = cssClasses.game;
    let gameInfo = cssClasses.gameInfo;
    let movesList = cssClasses.movesList;
    let curPlayer = this.state.curPlayer;
    let boardState = this.state.boardState;
    return (
      <div className={game}>
        <GameBoard onMakeTurn={this.makeTurn} boardState={boardState}/>
        <div className={gameInfo}>
          <PlayerDisplay player={curPlayer}/>
          <MovesList className={movesList}/>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render(){
    return (
      <Game />
    );
  }
}

export default App;
