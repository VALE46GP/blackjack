
import React from 'react';

class Controls extends React.Component {
  constructor(props) {
    super();
    this.state = {
      bet: 0,
    };
  }

  handleBetChange(e) {
    this.setState({
      bet: event.target.value,
    });
  }

  render() {
    const {
      deal, hit, stay, player, stage,
    } = this.props;
    const { bet } = this.state;
    if (stage === 'play') {
      return (
        <div>
          <h2>Controls</h2>
          <div>
            <button type="submit" onClick={() => hit()}>Hit</button>
          </div>
          <button type="submit" onClick={() => setTimeout(function() { stay(); }, 500)}>Stay</button>
        </div>
      );
    }
    return (
      <div>
        <h2>Controls</h2>
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

export default Controls;
