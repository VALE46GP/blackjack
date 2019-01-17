
import React from 'react';

class You extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const { yourHand } = this.props;
    if (yourHand.turn < 0) {
      return (
        <div className="ctrl-you-container" />
      );
    }
    for (let i = 0; i < yourHand.totals.length; i += 1) {
      return (
        <div className="ctrl-you-container">
          <div className={`turn${yourHand.turn}`}>
            <div className="you">
              {yourHand.cards[yourHand.turn].map((c, i) => <img src={`https://s3-us-west-1.amazonaws.com/blackjack-react/deck_standard/${c}.png`} alt={c} key={c + i} height="100" />)}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default You;
