
import React from 'react';

class Dealer extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const { hand } = this.props;
    return (
      <div>
        <h2>Dealer</h2>
        <p>{hand.cards.forEach(c => <p>{c}</p>)}</p>
      </div>
    );
  }
}

export default Dealer;
