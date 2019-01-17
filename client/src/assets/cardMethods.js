
const cardMethods = {};

cardMethods.shuffle = (cards) => {
  const len = cards.length;
  for (let i = len; i > 0; i -= 1) {
    const p = Math.floor(Math.random() * Math.floor(i));
    cards.push(cards[p]);
    cards.splice(p, 1);
  }
  return cards;
};

cardMethods.generate = (numOfDecks) => {
  const suits = ['H', 'C', 'S', 'D'];
  const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  const deck = [];

  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(value + suit);
    });
  });
  let decks = [];
  for (let q = 0; q < numOfDecks; q += 1) {
    decks = decks.concat(deck);
  }
  return cardMethods.shuffle(decks);
};

cardMethods.isBlackjack = (cards) => {
  const ten = ['10', 'J', 'Q', 'K'];
  const values = cards.map(c => c.slice(0, c.length - 1));
  if (ten.includes(values[0]) || ten.includes(values[1])) {
    if (values.includes('A')) {
      return true;
    }
  }
  return false;
};

cardMethods.countHand = (cards) => {
  if (cards.length === 2 && cardMethods.isBlackjack(cards)) {
    return 'blackjack';
  }
  let total = [0, 0];
  cards.forEach((c) => {
    const value = c.slice(0, c.length - 1);
    if (['J', 'Q', 'K'].includes(value)) {
      total = total.map(v => v + 10);
    } else if (value === 'A') {
      total[0] += 1;
      if (total[1] <= 10) {
        total[1] += 11;
      } else {
        total[1] += 1;
      }
    } else {
      total = total.map(v => v + parseInt(value, 10));
    }
  });
  if (total[0] > 21) {
    return 'bust';
  }
  return total;
};

cardMethods.checkIfOver = (total) => { total.some(v => v <= 21); };

// MOVES ///////////////////////////////////////////////////////////////

cardMethods.deal = (state) => {
  const {
    cards, dealersHand, yourHand, player,
  } = state;
  cards.used = cards.used.concat(dealersHand.cards);
  yourHand.cards.forEach((hand) => {
    cards.used = cards.used.concat(hand);
  });
  dealersHand.cards = cards.unused.splice(0, 2);
  yourHand.cards = [cards.unused.splice(0, 2)];

  dealersHand.total = cardMethods.countHand(dealersHand.cards);
  yourHand.totals = [cardMethods.countHand(yourHand.cards[0])];

  yourHand.turn = 0;
  yourHand.bets[0] = parseInt(yourHand.bets[0], 10);
  player.gamesPlayed += 1;
  player.money -= yourHand.bets[0];

  return state;
};

cardMethods.hit = (state) => {
  const {
    cards, yourHand,
  } = state;
  yourHand.cards[yourHand.turn] = yourHand.cards[yourHand.turn].concat(cards.unused.splice(0, 1));
  yourHand.totals[yourHand.turn] = cardMethods.countHand(yourHand.cards[yourHand.turn]);
  if (typeof yourHand.totals[yourHand.turn] === 'string') {
    yourHand.turn += 1;
  }
  return state;
};

cardMethods.doubledown = (state) => {
  const { yourHand, player } = state;
  player.money -= yourHand.bets[yourHand.turn];
  yourHand.bets[yourHand.turn] = parseInt(yourHand.bets[yourHand.turn] * 2, 10);

  const newState = cardMethods.hit(state);
  newState.yourHand.turn += 1;
  return newState;
};

cardMethods.dealerHit = (state) => {
  const {
    cards, dealersHand,
  } = state;
  dealersHand.total = cardMethods.countHand(dealersHand.cards);

  while (typeof dealersHand.total !== 'string' && dealersHand.total.every(v => v <= 16)) {
    dealersHand.cards = dealersHand.cards.concat(cards.unused.splice(0, 1));
    dealersHand.total = cardMethods.countHand(dealersHand.cards);
  }
  return state;
};

export default cardMethods;

//

// dealerHit(state) {
//   const {
//     cards, dealersHand, yourHand, player, bet,
//   } = state;
//   let total = cardMethods.countHand(dealersHand.cards)

//   const checkValue = () => {
//     if (total === 'blackjack') {
//       player.gamesLost += 1;
//       player.moneyLost += bet;
//       this.setState({
//         stage: 'lost',
//         player,
//       });
//     } else {
//       if (total[1] > 21) {
//         total = [total[0], total[0]];
//       }
//       if (total[1] > 21) {
//         player.money += bet * 2;
//         player.gamesWon += 1;
//         player.moneyWon += bet;
//         this.setState({
//           stage: 'won',
//           player,
//         });
//       } else if (total[1] > yourHand.total[1]) {
//         player.gamesLost += 1;
//         player.moneyLost += bet;
//         this.setState({
//           stage: 'lost',
//           player,
//         });
//       } else if (total[1] < yourHand.total[1]) {
//         player.money += bet * 2;
//         player.gamesWon += 1;
//         player.moneyWon += bet;
//         this.setState({
//           stage: 'won',
//           player,
//         });
//       } else {
//         player.money += bet;
//         player.gamesTied += 1;
//         this.setState({
//           stage: 'tie',
//           player,
//         });
//       }
//     }
//   };

//   if (total === 'blackjack' || total.some(v => v > 16)) {
//     checkValue();
//   }

//   while (total !== 'blackjack' && total.every(v => v <= 16)) {
//     const { unused } = cards;
//     dealersHand.cards = dealersHand.cards.concat(unused.splice(0, 1));
//     total = cardMethods.countHand(dealersHand.cards);
//     this.setState({
//       cards: {
//         unused,
//         used: cards.used,
//       },
//       dealersHand: {
//         cards: dealersHand.cards,
//         total,
//       },
//     });
//     checkValue();
//   }
// }

// doubledown() {
//   const { bet, player } = this.state;
//   const betInt = parseInt(bet, 10);
//   this.hit();
//   player.money -= betInt;
//   this.setState({
//     bet: betInt * 2,
//     stage: 'dealerPlay',
//     player,
//   });
//   setTimeout(() => { this.dealerHit(); }, 750);
// }

// hit() {
//   const {
//     cards, yourHand, player, bet,
//   } = this.state;
//   const { unused } = cards;
//   const yourCards = yourHand.cards.concat(unused.splice(0, 1));
//   let total = cardMethods.countHand(yourCards);

//   console.log(`total = ${total}`);

//   this.setState({
//     cards: {
//       unused,
//       used: cards.used,
//     },
//     yourHand: {
//       cards: yourCards,
//       total,
//     },
//   });

//   // check if over 21
//   if (total[1] > 21) {
//     total = [total[0], total[0]];
//     this.setState({
//       yourHand: {
//         cards: yourCards,
//         total,
//       },
//     });
//   }
//   if (total[0] > 21) {
//     player.gamesLost += 1;
//     player.moneyLost += bet;
//     this.setState({
//       stage: 'lost',
//       player,
//     });
//   }
// }

// deal(bet) {
//   const {
//     cards, dealersHand, yourHand, player,
//   } = this.state;
//   const { unused } = cards;
//   const used = cards.used.concat(dealersHand.cards, yourHand.cards);
//   const dealerCards = unused.splice(0, 2);
//   const yourCards = unused.splice(0, 2);
//   const dealerTotal = cardMethods.countHand(dealerCards);
//   const yourTotal = cardMethods.countHand(yourCards);
//   const betInt = parseInt(bet, 10);
//   player.gamesPlayed += 1;
//   player.money -= betInt;

//   if (yourTotal === 'blackjack') {
//     if (dealerTotal === 'blackjack') {
//       player.money += betInt;
//       player.gamesTied += 1;
//       this.setState({
//         cards: {
//           unused,
//           used,
//         },
//         dealersHand: {
//           cards: dealerCards,
//           total: dealerTotal,
//         },
//         yourHand: {
//           cards: yourCards,
//           total: yourTotal,
//         },
//         bet: betInt,
//         stage: 'tie',
//         player,
//       });
//     } else {
//       player.money += betInt * 2.5;
//       player.gamesWon += 1;
//       player.moneyWon += betInt * 1.5;
//       this.setState({
//         cards: {
//           unused,
//           used,
//         },
//         dealersHand: {
//           cards: dealerCards,
//           total: dealerTotal,
//         },
//         yourHand: {
//           cards: yourCards,
//           total: yourTotal,
//         },
//         bet: betInt,
//         stage: 'won',
//         player,
//       });
//     }
//   } else {
//     this.setState({
//       cards: {
//         unused,
//         used,
//       },
//       dealersHand: {
//         cards: dealerCards,
//         total: dealerTotal,
//       },
//       yourHand: {
//         cards: yourCards,
//         total: yourTotal,
//       },
//       bet: betInt,
//       stage: 'play',
//       player,
//     });
//   }
// }
