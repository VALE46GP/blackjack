
import React from 'react';

class You extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    let { hand } = this.props;
    return (
      <div>
        <p>{hand.cards.forEach(c => c)}</p>
        <h2>You</h2>
      </div>
    );
  }
}

export default You;
