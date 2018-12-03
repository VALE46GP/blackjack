
import React from 'react';

class Dealer extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const { hand } = this.props;
    if (hand.cards.length) {
      return (
        <div className="dealer">
          <h2>Dealer</h2>
          <img src="https://s3-us-west-1.amazonaws.com/blackjack-react/card_back_biff_tanner.png" alt="dealer-card" width="65.422" height="100" />
          <img src={`https://s3-us-west-1.amazonaws.com/blackjack-react/deck_standard/${hand.cards[1]}.png`} alt={hand.cards[1]} height="100" />
        </div>
      );
    }
    return (
      <div className="dealer">
        <h2>Dealer</h2>
      </div>
    );
  }
}

export default Dealer;
