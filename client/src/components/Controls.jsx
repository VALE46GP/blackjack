
import React from 'react';

class Controls extends React.Component {
  constructor(props) {
    super();
    this.state = {
      yourHand: {
        bets: [0],
        totals: [[]],
        displays: [],
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

  // handleBetChange(event) {
  //   this.setState({
  //     bets: [event.target.value],
  //   });
  // }

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
        return (
          <div className="ctrl-you-container">
            <div className={`turn${yourHand.turn}`}>
              <div className="controls-container">
                <div className="hit active" onClick={() => hit()} onKeyPress={() => hit()} role="button" tabIndex={0}>HIT</div>
                <div className="stay active" onClick={() => stay()} onKeyPress={() => stay()} role="button" tabIndex={0}>STAY</div>
                <div className="double active" onClick={() => doubledown()} onKeyPress={() => doubledown()} role="button" tabIndex={0}>DOUBLE</div>
                <div className="split inactive" onClick={() => doubledown()} onKeyPress={() => doubledown()} role="button" tabIndex={0}>SPLIT</div>
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
