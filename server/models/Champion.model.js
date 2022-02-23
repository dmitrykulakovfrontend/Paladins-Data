const mongoose = require("mongoose");

const ChampionSchema = new mongoose.Schema({
  Assists: {
    type: Number,
  },
  Deaths: {
    type: Number,
  },
  Gold: {
    type: Number,
  },
  Kills: {
    type: Number,
  },
  Losses: {
    type: Number,
  },
  Matches: {
    type: Number,
  },
  Wins: {
    type: Number,
  },
  Minutes: {
    type: Number,
  },
  LastPlayed: {
    type: String,
  },
  Champion: {
    type: String,
  },
});

const Champion = mongoose.model("champion", ChampionSchema);

module.exports = Champion;
