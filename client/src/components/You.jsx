
import React from 'react';

class You extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const { hand } = this.props;
    return (
      <div className="you">
        <p>
          {hand.cards.map(c => <img src={`https://s3-us-west-1.amazonaws.com/blackjack-react/deck_standard/${c}.png`} alt={c} height="100" />)}
        </p>
        <h2>You</h2>
      </div>
    );
  }
}

export default You;
