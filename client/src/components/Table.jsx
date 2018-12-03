
import React from 'react';
import Dealer from './Dealer';
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
        total: 0,
      },
      yourHand: {
        cards: [],
        total: 0,
      },
      bet: 0,
      player: {
        id: 0,
        gamertag: 'Marty McFly',
        avatar: '',
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
    };
    this.deal = this.deal.bind(this);
  }

  componentDidMount() {
    this.setState({
      cards: {
        unused: cardMethods.generate(4),
        used: [],
      },
    });
  }

  deal() {
    const { cards, dealersHand, yourHand } = this.state;
    const { unused } = cards;
    const used = cards.used.concat(dealersHand.cards, yourHand.cards);
    const dealerCards = unused.splice(0, 2);
    const yourCards = unused.splice(0, 2);
    this.setState({
      cards: {
        unused,
        used,
      },
      dealersHand: {
        cards: dealerCards,
        total: 0,
      },
      yourHand: {
        cards: yourCards,
        total: 0,
      },
    });
  }

  hit() {
    const { cards } = this.state;
    const yourCards = cards.unused.splice(0, 1);
    const { unused } = cards;
    this.setState({
      cards: {
        unused,
        used: cards.used,
      },
      yourHand: {
        cards: yourCards,
        total: 0,
      },
    });
    // nextTurn
  }

  stay() {
    // nextTurn
  }

  dealerPlays() {

  }

  render() {
    const {
      bet, player, dealersHand, yourHand,
    } = this.state;
    return (
      <div>
        <div className="title">
          <h1>Blackjack</h1>
        </div>
        <hr />
        <div className="main-flex">
          <div>
            <Controls deal={this.deal} player={player} />
          </div>
          <div className="game-col">
            <Dealer hand={dealersHand} />
            <You hand={yourHand} />
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
