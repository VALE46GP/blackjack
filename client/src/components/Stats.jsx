
import React from 'react';

class Stats extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const { bets, player } = this.props;
    return (
      <div>
        <img className="avatar" src={player.avatar} alt="avatar" height="50" />
        <h2 className="small-margins">{player.gamertag}</h2>
        <p>{`Cash:         ${player.money}`}</p>
        <p>{`Money Won:    ${player.moneyWon}`}</p>
        <p>{`Money Lost:   ${player.moneyLost}`}</p>
        <p>{`Hands Played: ${player.handsPlayed}`}</p>
        <p>{`GamesWon:     ${player.handsWon}`}</p>
        <p>{`Games Lost:   ${player.handsLost}`}</p>
      </div>
    );
  }
}

export default Stats;
