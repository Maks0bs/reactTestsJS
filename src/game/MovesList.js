import React, {Component} from 'react';

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

export default MovesList;