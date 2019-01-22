
import React from 'react';

class Controls extends React.Component {
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
    const { state } = this.props;
    this.setState({
      yourHand: state.yourHand,
    });
  }

  displayButtons(i) {
    const { yourHand } = this.state;
    const buttons = {
      hit: 'active',
      stay: 'active',
      doubledown: 'active',
      split: 'active',
    };
    if (yourHand.cards[i].length !== 2) {
      buttons.doubledown = 'inactive';
      buttons.split = 'inactive';
    }
    if (yourHand.cards[i][0].slice(0, yourHand.cards[i][0].length - 1) !== yourHand.cards[i][1].slice(0, yourHand.cards[i][1].length - 1)) {
      buttons.split = 'inactive';
    }
    if (yourHand.totals[i].some(v => v === 21)) {
      buttons.hit = 'inactive';
    }
    return buttons;
  }

  render() {
    const {
      hit, stay, doubledown, state,
    } = this.props;
    const { yourHand } = state;

    const displayTotal = (total) => {
      if (typeof total === 'string') {
        return total;
      }
      if (total[1] !== total[0] && total[1] <= 21) {
        return `Total: ${total[0]} / ${total[1]}`;
      }
      return `Total: ${total[0]}`;
    };

    if (yourHand.turn < 0) {
      return (
        <div className="controls-container" />
      );
    }
    for (let i = 0; i < yourHand.totals.length; i += 1) {
      if (i === yourHand.turn) {
        const buttons = this.displayButtons(i);
        return (
          <div className="ctrl-you-container">
            <div className={`turn${yourHand.turn}`}>
              <div className="controls-container">
                <div className={`hit ${buttons.hit}`} onClick={() => hit(buttons.hit)} onKeyPress={() => hit(buttons.hit)} role="button" tabIndex={0}>HIT</div>
                <div className={`stay ${buttons.stay}`} onClick={() => stay()} onKeyPress={() => stay()} role="button" tabIndex={0}>STAY</div>
                <div className={`double ${buttons.doubledown}`} onClick={() => doubledown(buttons.doubledown)} onKeyPress={() => doubledown(buttons.doubledown)} role="button" tabIndex={0}>DOUBLE</div>
                <div className={`split ${buttons.split}`} onClick={() => doubledown(buttons.split)} onKeyPress={() => doubledown(buttons.split)} role="button" tabIndex={0}>SPLIT</div>
                <div className="bet-info">
                  {displayTotal(yourHand.totals[i])}
                  <br />
                  $
                  {yourHand.bets[i]}
                </div>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="controls-container">
          <div className="bet-info">
            {displayTotal(yourHand.totals[i])}
            <br />
            $
            {yourHand.bets[i]}
          </div>
        </div>
      );
    }
  }
}

export default Controls;
