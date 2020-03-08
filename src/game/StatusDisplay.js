import React, {Component} from 'react';
let {PLAYERS} = require('./constants');

class StatusDisplay extends Component {
  constructor(props){
    super(props);
  }

  render(){
    //console.log(PLAYERS[this.props.player]);
    return (
      <div>
        <div>Next player: {PLAYERS[this.props.player]}</div>
      </div>
    )
  }
}

export default StatusDisplay;