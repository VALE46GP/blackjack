
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
        <h1>Stats</h1>
        <img src={player.avatar} alt="avatar" height="50" />
        <h2 className="small-margins">{player.gamertag}</h2>
        <h3 className="small-margins">{`Bet: ${bet}`}</h3>
      </div>
    );
  }
}

export default Stats;
