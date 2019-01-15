
import React from 'react';

class Bet extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    const { bet } = this.props;
    this.setState({
      bet,
    });
  }

  handleBetChange(event) {
    this.setState({
      bet: event.target.value || 0,
    });
  }

  render() {
    const {
      deal, hit, stay, doubledown, player, stage,
    } = this.props;
    const { bet } = this.state;

    if (stage === 'play') {
      return (
        <div>
          <p>Dealer:</p>
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
