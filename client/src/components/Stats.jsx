import React from 'react';

class Stats extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.colorify = this.colorify.bind(this);

    window.socket.on('trigger-color-change', (d) => {
      console.log(d);
      this.setState({color: d.color});
    });
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  colorify() {
    window.socket.emit('request-color-change', {color: this.getRandomColor()});
  }

  render() {
    const {player} = this.props;
    return (
      <div>
        <img className="avatar" src={player.avatar} alt="avatar" height="50"/>
        <h2 className="small-margins">{player.gamertag}</h2>
        <p>Cash {player.money}</p>
        <p>{`Hands Played: ${player.handsPlayed}`}</p>
        <p>{`Hands Won:    ${player.handsWon}`}</p>
        <p>{`Money Won:    ${player.moneyWon}`}</p>
        <p>{`Money Lost:   ${player.moneyLost}`}</p>
        <button onClick={this.colorify}>Color ME!!!</button>
        <div style={{background: this.state.color, width: '100px', height: '100px'}}></div>
      </div>
    );
  }
}

export default Stats;
