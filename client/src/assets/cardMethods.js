
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
  // const suits = ['H', 'C', 'S', 'D'];
  // const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  const suits = ['H', 'C', 'S', 'D'];
  const values = ['A', 10, 10, 10, 10, 10, 10, 'J', 'Q', 'K'];
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
    return 'BLACKJACK!';
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
    return 'BUST';
  }
  return total;
};

cardMethods.compare = (state) => {
  const { dealersHand, yourHand, player } = state;
  let dealer = dealersHand.total;
  if (typeof dealer !== 'string') {
    if (dealer[1] > 21) {
      dealer = dealer[0];
    } else {
      dealer = dealer[1];
    }
  }

  for (let i = 0; i < yourHand.cards.length; i += 1) {
    const bet = yourHand.bets[i];
    let you = yourHand.totals[i];
    if (typeof you !== 'string') {
      if (you[1] > 21) {
        you = you[0];
      } else {
        you = you[1];
      }
    }

    if (you === 'BUST') {
      player.gamesLost += 1;
      player.moneyLost += bet;
      yourHand.bets[i] = `${bet} lost`;
    } else if (dealer === you) {
      player.money += bet;
      player.gamesTied += 1;
      yourHand.totals[i] = 'PUSH';
      yourHand.bets[i] = 'Break even';
    } else if (dealer === 'BLACKJACK!') {
      player.gamesLost += 1;
      player.moneyLost += bet;
      yourHand.totals[i] = 'House wins';
      yourHand.bets[i] = `${bet} lost`;
    } else if (dealer === 'BUST') {
      if (you === 'BLACKJACK!') {
        player.money += parseInt(bet * 2.5, 10);
        player.gamesWon += 1;
        player.moneyWon += parseInt(bet * 1.5, 10);
        yourHand.bets[i] = `${parseInt(bet * 1.5, 10)} won`;
      } else {
        player.money += parseInt(bet * 2, 10);
        player.gamesWon += 1;
        player.moneyWon += bet;
        yourHand.totals[i] = 'You win';
        yourHand.bets[i] = `${bet} won`;
      }
    } else if (dealer > you) {
      player.gamesLost += 1;
      player.moneyLost += bet;
      yourHand.totals[i] = 'House wins';
      yourHand.bets[i] = `${bet} lost`;
    } else if (dealer < you) {
      player.money += parseInt(bet * 2, 10);
      player.gamesWon += 1;
      player.moneyWon += bet;
      yourHand.totals[i] = 'You win';
      yourHand.bets[i] = `${bet}`;
    } else if (you === 'BLACKJACK!') {
      player.money += parseInt(bet * 2.5, 10);
      player.gamesWon += 1;
      player.moneyWon += parseInt(bet * 1.5, 10);
      yourHand.bets[i] = `${parseInt(bet * 1.5, 10)} won`;
    }
  }
  return state;
};

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
    return cardMethods.dealerHit(state);
  }
  return state;
};

cardMethods.doubledown = (state) => {
  const { yourHand, player } = state;
  player.money -= yourHand.bets[yourHand.turn];
  yourHand.bets[yourHand.turn] = parseInt(yourHand.bets[yourHand.turn] * 2, 10);

  const newState = cardMethods.hit(state);
  newState.yourHand.turn += 1;
  return cardMethods.dealerHit(newState);
};

cardMethods.split = (state) => {
  const { yourHand, player } = state;
  player.money -= yourHand.bets[yourHand.turn];
  yourHand.cards.splice(yourHand.turn + 1, 0, [yourHand.cards[yourHand.turn].splice(1, 1)]);
  yourHand.totals.splice(yourHand.turn + 1, 0, [0, 0]);
  yourHand.bets.splice(yourHand.turn + 1, 0, yourHand.bets[yourHand.turn]);
  return state;
};

cardMethods.dealerHit = (state) => {
  const { cards, dealersHand } = state;
  dealersHand.total = cardMethods.countHand(dealersHand.cards);

  while (typeof dealersHand.total !== 'string' && dealersHand.total.every(v => v <= 16)) {
    dealersHand.cards = dealersHand.cards.concat(cards.unused.splice(0, 1));
    dealersHand.total = cardMethods.countHand(dealersHand.cards);
  }
  return cardMethods.compare(state);
};

export default cardMethods;
