
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
      stage: 'init', // stages: init, play, dealerPlay, lost, won, tie
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
    const {
      cards, dealersHand, yourHand, player, bet,
    } = this.state;
    let dealersCards = dealersHand.cards;
    let total = cardMethods.countHand(dealersCards);

    const checkValue = () => {
      if (total[1] > 21) {
        total = [total[0], total[0]];
      }
      if (total[1] > 21) {
        player.money += (bet * 2);
        player.gamesWon += 1;
        player.moneyWon += bet;
        this.setState({
          stage: 'won',
          player,
        });
      } else if (total[1] > yourHand.total[1]) {
        player.gamesLost += 1;
        player.moneyLost += bet;
        this.setState({
          stage: 'lost',
          player,
        });
      } else if (total[1] < yourHand.total[1]) {
        player.money += (bet * 2);
        player.gamesWon += 1;
        player.moneyWon += bet;
        this.setState({
          stage: 'won',
          player,
        });
      } else {
        player.money += bet;
        player.gamesTied += 1;
        this.setState({
          stage: 'tie',
          player,
        });
      }
    };

    if (total.some(v => v > 16)) {
      checkValue();
    }

    while (total.every(v => v <= 16)) {
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

      checkValue();
    }
  }

  deal(bet) {
    const {
      cards, dealersHand, yourHand, player,
    } = this.state;
    const { unused } = cards;
    const used = cards.used.concat(dealersHand.cards, yourHand.cards);
    const dealerCards = unused.splice(0, 2);
    const yourCards = unused.splice(0, 2);
    const dealerTotal = cardMethods.countHand(dealersHand.cards);
    const yourTotal = cardMethods.countHand(yourCards);
    const betInt = parseInt(bet, 10);
    player.gamesPlayed += 1;
    player.money -= betInt;

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
      bet: betInt,
      stage: 'play',
      player,
    });
  }

  hit() {
    const {
      cards, yourHand, player, bet,
    } = this.state;
    const { unused } = cards;
    const yourCards = yourHand.cards.concat(unused.splice(0, 1));
    let total = cardMethods.countHand(yourCards);

    console.log(`total = ${total}`);

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

    // check if over 21
    if (total[1] > 21) {
      total = [total[0], total[0]];
      this.setState({
        yourHand: {
          cards: yourCards,
          total,
        },
      });
    }
    if (total[0] > 21) {
      player.gamesLost += 1;
      player.moneyLost += bet;
      this.setState({
        stage: 'lost',
        player,
      });
    }
  }

  stay() {
    const { dealerHit } = this;
    const { dealersHand } = this.state;
    this.setState({
      stage: 'dealerPlay',
    });
    setTimeout(() => { dealerHit(); }, 750);
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
        </div>
        <hr />
        <div className="main-flex">
          <div>
            <Controls deal={this.deal} hit={this.hit} stay={this.stay} player={player} stage={stage} />
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
      </div>
    );
  }
}

export default Table;
