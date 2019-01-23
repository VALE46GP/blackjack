
import React from 'react';

class You extends React.Component {
  constructor(props) {
    super();
    this.state = {
      yourHand: {
        cards: [[]],
        totals: [[]],
        bets: [0],
        turn: 0,
      },
    };
  }

  componentDidMount() {
    const { yourHand } = this.props;
    this.setState({
      yourHand,
    });
  }

  render() {
    const { hit } = this.props;
    const { yourHand } = this.state;
    if (yourHand.turn < 0) {
      return (
        <div className="ctrl-you-container" />
      );
    }
    for (let i = 0; i < yourHand.cards.length; i += 1) {
      if (yourHand.cards[i].length === 1) {
        hit();
      }
      return (
        <div className="ctrl-you-container">
          <div className={`turn${i}`}>
            <div className="you">
              {yourHand.cards[i].map((c, e) => <img src={`https://s3-us-west-1.amazonaws.com/blackjack-react/deck_standard/${c}.png`} alt={c} key={c + e} height="100" />)}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default You;
