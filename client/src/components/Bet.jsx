
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
      player, yourHand, dealersHand,
    } = state;
    const { bet } = this.state;

    const displayTotal = (total) => {
      if (typeof total === 'string') {
        return total;
      }
      if (total[1] !== total[0] && total[1] <= 21) {
        return `Dealer shows: ${total[1]}`;
      }
      return `Dealer shows: ${total[0]}`;
    };

    if (yourHand.turn >= 0 && yourHand.turn < yourHand.cards.length) {
      return (
        <div className="dealer-label">
          <h1>Dealer:</h1>
        </div>
      );
    }
    if (yourHand.turn === yourHand.cards.length) {
      return (
        <div className="bet-container">
          <div className="bet-input active">
            Bet:
            <input className="bet-number-input" type="number" onChange={this.handleBetChange.bind(this)} name="bet" min="1" max={player.money} placeholder={bet} />
          </div>
          <div className="bet-deal active" onClick={() => deal(bet)} onKeyPress={() => deal(bet)} role="button" tabIndex={0}>DEAL</div>
          <div className="dealer-info">
            {displayTotal(dealersHand.total)}
          </div>
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
