
import React from 'react';

class Bet extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  handleBetChange(event) {
    this.setState({
      bet: event.target.value,
    });
  }

  render() {
    const {
      deal, hit, stay, doubledown, player, stage,
    } = this.props;
    const { bet } = this.state;
    return (
      <div>
        <div>
          Bet:
          {' '}
          <input type="number" onChange={this.handleBetChange.bind(this)} name="bet" min="1" max={player.money} />
        </div>
        <button type="submit" onClick={() => deal(bet)}>Deal</button>
      </div>
    );
  }
}

export default Bet;
