import React, {Component} from 'react';

class MovesListItem extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.goToTurn(this.props.num);
  }

  render(){
    console.log('rendered MovesListItem');
    return (
      <li>
        <button onClick={this.handleClick}>
          {this.props.value}
        </button>
      </li>
    )
  }
}

export default MovesListItem;