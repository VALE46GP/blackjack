
import React from 'react';
import faker from 'faker';
import Dealer from './Dealer';
import Bet from './Bet';
import You from './You';
import Stats from './Stats';
import Controls from './Controls';
import '../styles/style.css';
import cardMethods from '../assets/cardMethods';

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
      player: {},
    };
    this.deal = this.deal.bind(this);
    this.hit = this.hit.bind(this);
    this.dealerHit = this.dealerHit.bind(this);
    this.stay = this.stay.bind(this);
    this.doubledown = this.doubledown.bind(this);
    this.split = this.split.bind(this);
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
        handsPlayed: 0,
        handsWon: 0,
        handsLost: 0,
        money: 20,
        moneyWon: 0,
        moneyLost: 0,
        biggestWin: 0,
        biggestLoss: 0,
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
    if (yourHand.turn === yourHand.cards.length) {
      this.dealerHit(this.state);
    } else {
      this.setState({
        yourHand,
      });
    }
    if (yourHand.cards[yourHand.turn].length === 1) {
      setTimeout(this.hit('active'), 250);
    }
  }

  doubledown(displayState) {
    if (displayState === 'active') {
      const newState = cardMethods.doubledown(this.state);
      this.setState(newState);
    }
  }

  split(displayState) {
    if (displayState === 'active') {
      const newState = cardMethods.split(this.state);
      this.setState(newState);
      setTimeout(this.hit('active'), 250);
    }
  }

  // END CONTROLS ////////////////////////////////////////////////////////////

  render() {
    const {
      player, dealersHand, yourHand, stage,
    } = this.state;
    if (yourHand.turn === yourHand.cards.length) {
      this.dealerHit(this.state);
    }
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
                <Controls hit={this.hit} stay={this.stay} doubledown={this.doubledown} split={this.split} state={this.state} />
              </div>
              <div className="your-side">
                <You yourHand={yourHand} hit={this.hit} />
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
