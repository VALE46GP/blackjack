
import React from 'react';

class Controls extends React.Component {
  constructor(props) {
    super();
    this.state = {
      bet: 0,
    };
  }

  componentDidMount() {
    const { bet, totals } = this.props;
    this.setState({
      bet,
      totals,
    });
  }

  handleBetChange(event) {
    this.setState({
      bet: event.target.value,
    });
  }

  render() {
    const {
      deal, hit, stay, doubledown, player, stage, bet,
    } = this.props;
    return (
      <div className="controls-container">
        <div className="hit active" onClick={() => hit()} onKeyPress={() => hit()} role="button" tabIndex={0}>HIT</div>
        <div className="stay active" onClick={() => setTimeout(() => { stay(); }, 500)} onKeyPress={() => setTimeout(() => { stay(); }, 500)} role="button" tabIndex={0}>STAY</div>
        <div className="double active" onClick={() => doubledown()} onKeyPress={() => doubledown()} role="button" tabIndex={0}>DOUBLE</div>
        <div className="split inactive" onClick={() => doubledown()} onKeyPress={() => doubledown()} role="button" tabIndex={0}>SPLIT</div>
        <div className="bet-info">{bet}</div>
      </div>
    );
  }
}

export default Controls;
