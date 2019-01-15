
import React from 'react';

class Controls extends React.Component {
  constructor(props) {
    super();
    this.state = {
      bet: 0,
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
    if (stage === 'play') {
      return (
        <div>
          <h1>Controls</h1>
          <div>
            <button type="submit" onClick={() => hit()}>Hit</button>
          </div>
          <div>
            <button type="submit" onClick={() => setTimeout(function() { stay(); }, 500)}>Stay</button>
          </div>
          <div>
            <button type="submit" onClick={() => doubledown()}>Doubledown</button>
          </div>
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
