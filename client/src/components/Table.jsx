
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
      bank: {
        money: 0,
        bet: 0,
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
    const { bet, player, dealersHand, yourHand } = this.state;
    return (
      <div className="center-page">
        <h1>Blackjack</h1>
        <div>
          <Dealer hand={dealersHand} />
          <You hand={yourHand} />
          <div className="bottom">
            <div>
              <Stats bet={bet} player={player} />
            </div>
            <div>
              <Controls deal={this.deal} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
