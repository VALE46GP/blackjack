const mongoose = require('mongoose');

mongoose.connect('mongodb://database/blackjack', (err) => {
  if (err) throw err;
});

// each array is in the following format [{record quantity}, {record holding player id}]
const recordSchema = new mongoose.Schema({
  mostPlayed: [Number],
  mostWins: [Number],
  mostLosses: [Number],
  biggestWin: [Number],
  biggestLoss: [Number],
  bravest: [Number],
  mostCowardly: [Number],
  luckiest: [Number],
  unluckiest: [Number],
});

const playerSchema = new mongoose.Schema({
  id: Number,
  gamertag: String,
  avatar: String,
  handsPlayed: Number,
  handsWon: Number,
  handsLost: Number,
  money: Number,
  moneyWon: Number,
  moneyLost: Number,
  biggestWin: Number,
  biggestLoss: [Number],
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
