
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
      <div className="ctrl-you-container">
        <div className="turn0">
          <div className="you">
            {hand.cards[0].map((c, i) => <img src={`https://s3-us-west-1.amazonaws.com/blackjack-react/deck_standard/${c}.png`} alt={c} key={c + i} height="100" />)}
          </div>
        </div>
      </div>
    );
  }
}

export default You;
