import React, {Component} from 'react';
import cssClasses from '../css/main.module.css'
let {PLAYERS, NULL_PLAYER, NULL_PLAYER_PLACEHOLDER, NULL_TURN, NULL_TURN_PLACEHOLDER} = require('./constants');

class GameBoardCell extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.blockClick = this.blockClick.bind(this);
  }

  handleClick(){
    this.props.makeTurn(this.props.num);
  }

  blockClick(){
    return;
  }

  render(){
    let value, handler;
    if (this.props.value === NULL_PLAYER){
      value = NULL_PLAYER_PLACEHOLDER;
      handler = this.handleClick;
    }
    else{
      value = PLAYERS[this.props.value];
      handler = this.blockClick;
    }

    let curTurn;
    if (this.props.curTurn === NULL_TURN){
      curTurn = NULL_TURN_PLACEHOLDER;
    }
    else{
      curTurn = (this.props.curTurn + 1).toString();
    }
    return (
      <div className={cssClasses.squareOuter}>
        <div className={cssClasses.squareSideText}>{curTurn}</div>
        <button 
          className={cssClasses.square} 
          onClick={handler}>
          {value}
        </button>
      </div>
    )
  }
}

export default GameBoardCell;