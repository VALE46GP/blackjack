
import React from 'react';

class Dealer extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const { dealersHand, yourHand } = this.props;

    if (dealersHand.cards.length) {
      if (yourHand.turn < yourHand.cards.length) {
        return (
          <div className="dealer">
            <img src={`https://s3-us-west-1.amazonaws.com/blackjack-react/deck_standard/${dealersHand.cards[0]}.png`} alt={dealersHand.cards[0]} key={dealersHand.cards[0]} height="100" />
            <img src="https://s3-us-west-1.amazonaws.com/blackjack-react/card_back_biff_tanner.png" alt="dealer-card" width="65.422" height="100" />
          </div>
        );
      }
      return (
        <div className="dealer">
          {dealersHand.cards.map(c => <img src={`https://s3-us-west-1.amazonaws.com/blackjack-react/deck_standard/${c}.png`} alt={c} key={c} height="100" />)}
        </div>
      );
    }
    return (
      <div className="dealer" />
    );
  }
}

export default Dealer;
