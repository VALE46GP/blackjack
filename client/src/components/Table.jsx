
import React from 'react';
import Dealer from './Dealer';
import Bet from './Bet';
import You from './You';
import Stats from './Stats';
import Controls from './Controls';
import '../styles/style.css';
import cardMethods from '../assets/cardMethods';

const faker = require('faker');

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: {
        unused: [],
        used: [],
      },
      dealersHand: {
        cards: [],
        total: [0, 0],
      },
      yourHand: {
        cards: [[]],
        totals: [[0, 0]],
        bets: [0],
        turn: -1,
      },
      stage: 'init', // stages: init, play, dealerPlay, lost, won, tie
      player: {},
    };
    this.deal = this.deal.bind(this);
    this.hit = this.hit.bind(this);
    this.dealerHit = this.dealerHit.bind(this);
    this.stay = this.stay.bind(this);
    this.doubledown = this.doubledown.bind(this);
  }

  componentDidMount() {
    this.setState({
      cards: {
        unused: cardMethods.generate(4),
        used: [],
      },
      player: {
        id: 0,
        gamertag: 'Marty McFly',
        avatar: faker.image.avatar(),
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        gamesTied: 0,
        blackjacks: 0,
        doubleDowns: 0,
        splits: 0,
        money: 20,
        moneyWon: 0,
        moneyLost: 0,
        biggestBet: 0,
        brave: 0,
        scared: 0,
        lucky: 0,
        unlucky: 0,
      },
    });
  }

  // CONTROLS ////////////////////////////////////////////////////////////////

  dealerHit(state) {
    cardMethods.dealerHit(state);
    this.setState(state);
  }

  deal(bet) {
    const { yourHand } = this.state;
    yourHand.bets[0] = bet;
    yourHand.turn = 0;
    const newState = cardMethods.deal(this.state);
    this.setState(newState);
  }

  hit(displayState) {
    if (displayState === 'active') {
      const newState = cardMethods.hit(this.state);
      this.setState(newState);
    }
  }

  stay() {
    const { yourHand } = this.state;
    yourHand.turn += 1;
    this.dealerHit(Object.assign(this.state));
  }

  doubledown(displayState) {
    if (displayState === 'active') {
      const newState = cardMethods.doubledown(this.state);
      this.setState(newState);
    }
  }

  split(displayState) {
    if (displayState === 'active') {
      const newState = cardMethods.doubledown(this.state);
      this.setState(newState);
    }
  }

  // END CONTROLS ////////////////////////////////////////////////////////////

  render() {
    const {
      player, dealersHand, yourHand, stage,
    } = this.state;
    return (
      <div>
        <div className="title">
          <h1>Blackjack</h1>
        </div>
        <hr />
        <div className="main-flex">
          <div className="game">
            <div className="game-container">
              <div className="dl">
                <Bet state={this.state} deal={this.deal} />
              </div>
              <div className="dr">
                <Dealer dealersHand={dealersHand} yourHand={yourHand} stage={stage} />
              </div>
              <div className="ctrl">
                <Controls hit={this.hit} stay={this.stay} doubledown={this.doubledown} state={this.state} />
              </div>
              <div className="your-side">
                <You yourHand={yourHand} />
              </div>
            </div>
          </div>
          <div className="stats">
            <Stats bets={yourHand.bets} player={player} />
          </div>
        </div>
      </div>
    );
  }
}

export default Table;

/*

<div className="main-flex">
<div>
  <Controls deal={this.deal} hit={this.hit} stay={this.stay} doubledown={this.doubledown} player={player} stage={stage} />
</div>
<div className="main-flex">
<div className="game-col">
  <div className="front">
    <Dealer hand={dealersHand} stage={stage} />
    <You hand={yourHand} />
  </div>
  <span>
    <img src={`https://s3-us-west-1.amazonaws.com/blackjack-react/biff_tanner_${stage}.png`} alt="place-bet" width="300px" />
  </span>
</div>
</div>
<div>
<Stats bet={bet} player={player} />
</div>
</div>

// DONT FORGET THIS DELAY AFTER LAST TURN !!

 stay() {
    const { dealerHit } = this;
    this.setState({
      stage: 'dealerPlay',
    });
    setTimeout(() => { dealerHit(); }, 750);
  }

*/
