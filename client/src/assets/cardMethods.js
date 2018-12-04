
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
  // const suits = ['♥', '♣', '♠', '♦'];
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

cardMethods.countHand = (cards) => {
  console.log('countHands invoked');
  const total = [0, 0];
  cards.forEach((c) => {
    const value = c.slice(0, c.length - 1);
    if (['J', 'Q', 'K'].includes(value)) {
      total.forEach((v, i) => { total[i] += 10; });
    } else if (value === 'A') {
      total[0] += 1;
      if (total[1] < 10) {
        total[1] += 11;
      } else {
        total[1] += 1;
      }
    } else {
      total.forEach((v, i) => { total[i] += parseInt(value, 10); });
    }
  });
  return total;
};

export default cardMethods;
