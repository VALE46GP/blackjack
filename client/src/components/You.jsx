
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
    return (
      <div className="ctrl-you-container">
        {yourHand.cards.map((hand, i) => {
          return (
            <div className={`turn${i}`} key={`youhand${i}`}>
              <div className="you">
                {hand.map((c, e) => <img src={`https://s3-us-west-1.amazonaws.com/blackjack-react/deck_standard/${c}.png`} alt={c} key={c + e} height="100" />)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default You;
