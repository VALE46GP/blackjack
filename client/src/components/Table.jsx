
import React from 'react';
import Dealer from './Dealer';
import You from './You';
import Bank from './Bank';
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
      bank: {
        money: 0,
        bet: 0,
      },
    };
  }

  componentDidMount() {
    console.log(cardMethods.generate(4));
    this.setState({
      cards: {
        unused: cardMethods.generate(4),
        used: [],
      },
    });
  }

  deal() {
    const { cards, dealersHand, yourHand } = this.state;
    this.setState({
      cards: {
        unused: cards.unused,
        used: cards.used.concat(dealersHand, yourHand),
      },
      dealersHand: {
        cards: [],
        total: 0,
      },
      yourHand: {
        cards: [],
        total: 0,
      },
    });
  }

  render() {
    const { bank, dealersHand, yourHand } = this.state;
    return (
      <div>
        <h1>Blackjack</h1>
        <div>
          <Dealer hand={dealersHand} />
          <You hand={yourHand} />
          <div className="bottom">
            <div>
              <Bank bank={bank} />
            </div>
            <div>
              <Controls />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
