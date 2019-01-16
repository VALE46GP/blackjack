
import React from 'react';

class Controls extends React.Component {
  constructor(props) {
    super();
    this.state = {
      yourHand: {
        bets: [0],
        totals: [[]],
        displays: [],
      },
    };
  }

  // componentDidMount() {
  //   const { yourHand } = this.props;
  //   this.setState({
  //     yourHand,
  //   });
  // }

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
    const display = (total) => {
      if (typeof total === 'string') {
        return total;
      }
      if (total[1] !== total[0] && total[1] <= 21) {
        return `Total: ${total[0]} / ${total[1]}`;
      }
      return `Total: ${total[0]}`;
    }
    return (
      <div className="controls-container">
        <div className="hit active" onClick={() => hit()} onKeyPress={() => hit()} role="button" tabIndex={0}>HIT</div>
        <div className="stay active" onClick={() => setTimeout(() => { stay(); }, 500)} onKeyPress={() => setTimeout(() => { stay(); }, 500)} role="button" tabIndex={0}>STAY</div>
        <div className="double active" onClick={() => doubledown()} onKeyPress={() => doubledown()} role="button" tabIndex={0}>DOUBLE</div>
        <div className="split inactive" onClick={() => doubledown()} onKeyPress={() => doubledown()} role="button" tabIndex={0}>SPLIT</div>
        <div className="bet-info">{display(yourHand.totals[yourHand.turn])}</div>
      </div>
    );
  }
}

export default Controls;
