
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
      stage: 'init', // stages: init, play, dealerPlay, lost, won
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
    const { cards, dealersHand, yourHand } = this.state;
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
      if (total[1] > 21) {
        total = [total[0], total[0]];
      }
      if (total[1] > 21) {
        this.setState({
          stage: 'won',
        });
      } else if (total[1] > yourHand.total[1]) {
        this.setState({
          stage: 'lost',
        });
      } else {
        this.setState({
          stage: 'tie',
        });
      }
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
      this.setState({
        stage: 'lost',
      });
    } else if (total[1] > 21) {
      this.setState({
        yourHand: {
          yourCards,
          total: [total[0], total[0]],
        },
      });
    }
  }

  stay() {
    const { dealerHit } = this;
    const { dealersHand } = this.state;
    this.setState({
      stage: 'dealerPlay',
    });
    setTimeout(function () { dealerHit(); }, 750);
  }

  // END CONTROLS ////////////////////////////////////////////////////////////

  render() {
    const {
      bet, player, dealersHand, yourHand, stage,
    } = this.state;
    if (['play', 'dealerPlay'].includes(stage)) {
      return (
        <div>
          <div className="title">
            <h1>Blackjack</h1>
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
    return (
      <div>
        <div className="title">
          <h1>Blackjack</h1>
        </div>
        <hr />
        <div className="main-flex">
          <div>
            <Controls deal={this.deal} hit={this.hit} stay={this.stay} player={player} stage={stage} />
          </div>
          <div className="main-flex">
            <div className="game-col">
              <img src={`https://s3-us-west-1.amazonaws.com/blackjack-react/biff_tanner_${stage}.png`} alt="place-bet" width="300px" />
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
