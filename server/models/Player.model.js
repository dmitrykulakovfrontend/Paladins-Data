const mongoose = require("mongoose");
const Champion = require("./Champion.model");

const PlayerSchema = new mongoose.Schema({
  ActivePlayerId: {
    type: Number,
  },
  AvatarURL: {
    type: String,
  },
  Name: {
    type: String,
  },
  Created_Datetime: {
    type: String,
  },
  Last_Login_Datetime: {
    type: String,
  },
  Platform: {
    type: String,
  },
  Region: {
    type: String,
  },
  Title: {
    type: String,
  },
  hz_player_name: {
    type: String,
  },
  HoursPlayed: {
    type: Number,
  },
  Level: {
    type: Number,
  },
  Losses: {
    type: Number,
  },
  Wins: {
    type: Number,
  },
  Total_Achievements: {
    type: Number,
  },
  Total_XP: {
    type: Number,
  },
  Last_Update: {
    type: String,
  },
  Siege: {
    type: [],
  },
  TDM: {
    type: [],
  },
  Competitive: {
    type: [],
  },
  Onslaught: {
    type: [],
  },
  Status: {
    type: Number,
  },
  Tier: {
    type: Number,
  },
  Points: {
    type: Number,
  },
});

const Player = mongoose.model("player", PlayerSchema);

module.exports = Player;
