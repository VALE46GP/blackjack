
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
        <p>{`Cash:         ${player.money}`}</p>
        <p>{`Money Won:    ${player.moneyWon}`}</p>
        <p>{`Money Lost:   ${player.moneyLost}`}</p>
        <p>{`Games Played: ${player.gamesPlayed}`}</p>
        <p>{`GamesWon:     ${player.gamesWon}`}</p>
        <p>{`Games Lost:   ${player.gamesLost}`}</p>
        <p>{`Games Tied:   ${player.gamesTied}`}</p>
      </div>
    );
  }
}

export default Stats;
