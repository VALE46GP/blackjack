const mongoose = require('mongoose');

mongoose.connect('mongodb://database/blackjack', (err) => {
  if (err) throw err;
});

// each array is in the following format [{record quantity}, {record holding player id}]
const recordSchema = new mongoose.Schema({
  mostPlayed: [Number],
  mostWins: [Number],
  mostTies: [Number],
  mostLosses: [Number],
  mostSplits: [Number],
  mostDoubleDowns: [Number],
  mostMoneyEver: [Number],
  mostMoneyNow: [Number],
  biggestBet: [Number],
  bravest: [Number],
  mostCowardly: [Number],
  luckiest: [Number],
  unluckiest: [Number],
});

const playerSchema = new mongoose.Schema({
  id: Number,
  gamertag: String,
  avatar: String,
  gamesPlayed: Number,
  gamesWon: Number,
  gamesLost: Number,
  gamesTied: Number,
  blackjacks: Number,
  doubleDowns: Number,
  splits: Number,
  money: Number,
  moneyWon: Number,
  moneyLost: Number,
  biggestBet: Number,
  brave: Number,
  scared: Number,
  lucky: Number,
  unlucky: Number,
});

const Player = mongoose.model('Player', playerSchema);

const allPlayers = [];

const newPlayer = (gamertag, callback) => {

};

const updatePlayer = (playerObject, callback) => {

};

const updateRecords = (records, callback) => {
  
};
