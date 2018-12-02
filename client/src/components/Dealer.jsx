
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
      <div className="dealer">
        <h2>Dealer</h2>
        <p>
          {hand.cards.map(c => <img src={`https://s3-us-west-1.amazonaws.com/blackjack-react/deck_standard/${c}.png`} alt={c} />)}
        </p>
      </div>
    );
  }
}

export default Dealer;
