import React, {Component} from 'react';
let {PLAYERS, GAME_RESULT_UNDECIDED, GAME_RESULT_DRAW} = require('./constants');

class StatusDisplay extends Component {
  render(){
    let text;
    
    if (this.props.gameResult === GAME_RESULT_DRAW){
      text = `No winner, draw!`;
    }
    else if (this.props.gameResult >= 0 && this.props.gameResult < PLAYERS.length){
      text = `Winner: ${PLAYERS[this.props.gameResult]}`
    }
    else if (!this.props.gameResult || this.props.gameResult === GAME_RESULT_UNDECIDED){
      text = `Next player: ${PLAYERS[this.props.player]}`;
    }
    return (
      <div>
        <div>{text}</div>
      </div>
    )
  }
}

export default StatusDisplay;