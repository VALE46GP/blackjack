
import React from 'react';

class Bet extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    const { state } = this.props;
    this.setState({
      bet: state.yourHand.bets[0],
    });
  }

  handleBetChange(event) {
    this.setState({
      bet: event.target.value || 0,
    });
  }

  render() {
    const { state, deal } = this.props;
    const {
      player, stage,
    } = state;
    const { bet } = this.state;

    if (stage === 'play') {
      return (
        <div className="dealer-label">
          <h1>Dealer:</h1>
        </div>
      );
    }
    return (
      <div className="bet-container">
        <div className="bet-input active">
          Bet:
          <input className="bet-number-input" type="number" onChange={this.handleBetChange.bind(this)} name="bet" min="1" max={player.money} placeholder={bet} />
        </div>
        <div className="bet-deal active" onClick={() => deal(bet)} onKeyPress={() => deal(bet)} role="button" tabIndex={0}>DEAL</div>
      </div>
    );
  }
}

export default Bet;
