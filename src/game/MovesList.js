import React, {Component} from 'react';
import MovesListItem from './MovesListItem'

class MovesList extends Component {
  #list = [];
  constructor(props){
    super(props);
  }

  render(){
    return (
      <ol className={this.props.className}>
        {this.props.movesList}
      </ol>
    )
  }
}

export default MovesList;