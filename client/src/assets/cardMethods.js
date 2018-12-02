
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

export default cardMethods;
