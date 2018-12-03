
import React from 'react';

class Stats extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const { bet, player } = this.props;
    return (
      <div>
        <h2>Stats</h2>
        <img src={player.avatar} alt="avatar" height="50" />
        <h3>{player.gamertag}</h3>
        <h4>{`Bet: ${bet}`}</h4>
      </div>
    );
  }
}

export default Stats;
