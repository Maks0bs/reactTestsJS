import React, {Component} from 'react';
import MovesListItem from './MovesListItem'

class MovesList extends Component {
  #list = [];
  constructor(props){
    super(props);

    this.updateList = this.updateList.bind(this);
    this.goToTurn = this.goToTurn.bind(this);
  }

  goToTurn(num){
    this.props.goToTurn(num);
  }

  updateList(){
    let value;
    if (this.props.curTurn === 0){
      value = 'Go to game start';
    }
    else{
      value = `Go to move #${this.props.curTurn}`;
    }
    this.#list.push(
      <MovesListItem
        num={this.props.curTurn}
        key={this.props.curTurn}
        value={value}
        goToTurn={this.goToTurn}
      />
    )
  }

  render(){
    this.updateList();
    return (
      <ol className={this.props.className}>
        {this.#list}
      </ol>
    )
  }
}

export default MovesList;