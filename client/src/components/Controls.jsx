
import React from 'react';

class Controls extends React.Component {
  constructor(props) {
    super();
    this.state = {
      yourHand: {
        bets: [0],
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
      deal, hit, stay, doubledown, player, stage, yourHand,
    } = this.props;
    return (
      <div className="controls-container">
        <div className="hit active" onClick={() => hit()} onKeyPress={() => hit()} role="button" tabIndex={0}>HIT</div>
        <div className="stay active" onClick={() => setTimeout(() => { stay(); }, 500)} onKeyPress={() => setTimeout(() => { stay(); }, 500)} role="button" tabIndex={0}>STAY</div>
        <div className="double active" onClick={() => doubledown()} onKeyPress={() => doubledown()} role="button" tabIndex={0}>DOUBLE</div>
        <div className="split inactive" onClick={() => doubledown()} onKeyPress={() => doubledown()} role="button" tabIndex={0}>SPLIT</div>
        <div className="bet-info">{yourHand.bets[0]}</div>
      </div>
    );
  }
}

export default Controls;
