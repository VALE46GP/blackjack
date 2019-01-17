
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
        turn: 0,
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

  dealerHit() {
    const {
      cards, dealersHand, yourHand, player, bet,
    } = this.state;
    let dealersCards = dealersHand.cards;
    let total = cardMethods.countHand(dealersCards);

    const checkValue = () => {
      if (total === 'blackjack') {
        player.gamesLost += 1;
        player.moneyLost += bet;
        this.setState({
          stage: 'lost',
          player,
        });
      } else {
        if (total[1] > 21) {
          total = [total[0], total[0]];
        }
        if (total[1] > 21) {
          player.money += bet * 2;
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
          player.money += bet * 2;
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
      }
    };

    if (total === 'blackjack' || total.some(v => v > 16)) {
      checkValue();
    }

    while (total !== 'blackjack' && total.every(v => v <= 16)) {
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
    const { yourHand } = this.state;
    yourHand.bets[0] = bet;
    const newState = cardMethods.deal(Object.assign(this.state, { yourHand, stage: 'play' }));
    this.setState(newState);
  }

  hit() {
    const newState = cardMethods.hit(this.state);
    this.setState(newState);
  }

  stay() {
    const { yourHand } = this.state;
    this.setState({
      yourHand: Object.assign(yourHand, { turn: yourHand.turn + 1 }),
    });
  }

  doubledown() {
    const newState = cardMethods.doubledown(this.state);
    this.setState(newState);
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
                <Dealer hand={dealersHand} stage={stage} />
              </div>
              <div className="ctrl">
                <Controls hit={this.hit} stay={this.stay} doubledown={this.doubledown} state={this.state} />
              </div>
              <div className="your-side">
                <You hand={yourHand} />
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
