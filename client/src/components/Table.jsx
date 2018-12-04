
import React from 'react';
import Dealer from './Dealer';
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
        cards: [],
        total: [0, 0],
      },
      bet: 0,
      stage: 'bet', // stages: bet, play, lose, win
      player: {},
    };
    this.deal = this.deal.bind(this);
    this.hit = this.hit.bind(this);
    this.dealerHit = this.dealerHit.bind(this);
    this.stay = this.stay.bind(this);
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

  dealerHit() {
    const { cards, dealersHand } = this.state;
    let dealersCards = dealersHand.cards;
    let total = cardMethods.countHand(dealersCards);

    while (total.some(v => v <= 16)) {
      const { unused } = cards;
      dealersCards = dealersCards.concat(unused.splice(0, 1));
      total = cardMethods.countHand(dealersCards);

      this.setState({
        cards: {
          unused,
          used: cards.used,
        },
        dealersHand: {
          cards: dealersCards,
          total,
        },
      });
      // CHECK IF OVER 21
    }
  }

  deal(bet) {
    const { cards, dealersHand, yourHand } = this.state;
    const { unused } = cards;
    const used = cards.used.concat(dealersHand.cards, yourHand.cards);
    const dealerCards = unused.splice(0, 2);
    const yourCards = unused.splice(0, 2);
    const dealerTotal = cardMethods.countHand(dealersHand.cards);
    const yourTotal = cardMethods.countHand(yourCards);

    this.setState({
      cards: {
        unused,
        used,
      },
      dealersHand: {
        cards: dealerCards,
        total: dealerTotal,
      },
      yourHand: {
        cards: yourCards,
        total: yourTotal,
      },
      bet,
      stage: 'play',
    });
  }

  hit() {
    const { cards, yourHand } = this.state;
    const { unused } = cards;
    const yourCards = yourHand.cards.concat(unused.splice(0, 1));
    const total = cardMethods.countHand(yourCards);

    this.setState({
      cards: {
        unused,
        used: cards.used,
      },
      yourHand: {
        cards: yourCards,
        total,
      },
    });

    if (!total.some(v => v <= 21)) {
      // INITIATE LOSE SEQUENCE
    }
  }

  stay() {
    const { dealerHit } = this;
    const { dealersHand } = this.state;
    this.setState({
      stage: 'dealerPlay',
    });
    setTimeout(function () { dealerHit(); }, 750 * (dealersHand.cards.length - 1));
  }

  // END CONTROLS ////////////////////////////////////////////////////////////

  render() {
    const {
      bet, player, dealersHand, yourHand, stage,
    } = this.state;
    return (
      <div>
        <div className="title">
          <h1>Blackjack</h1>
          <p>{yourHand.total.map(t => `${t}  `)}</p>
        </div>
        <hr />
        <div className="main-flex">
          <div>
            <Controls deal={this.deal} hit={this.hit} stay={this.stay} player={player} stage={stage} />
          </div>
          <div className="main-flex">
            <div className="game-col">
              <Dealer hand={dealersHand} stage={stage} />
              <You hand={yourHand} />
            </div>
          </div>
          <div>
            <Stats bet={bet} player={player} />
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
