const mongoose = require("mongoose");

const ChampionsInfoSchema = new mongoose.Schema({
  Ability_1: {
    Description: String,
    Summary: String,
    URL: String,
    damageType: String,
    rechargeSeconds: Number,
  },
  Ability_2: {
    Description: String,
    Summary: String,
    URL: String,
    damageType: String,
    rechargeSeconds: Number,
  },
  Ability_3: {
    Description: String,
    Summary: String,
    URL: String,
    damageType: String,
    rechargeSeconds: Number,
  },
  Ability_4: {
    Description: String,
    Summary: String,
    URL: String,
    damageType: String,
    rechargeSeconds: Number,
  },
  Ability_5: {
    Description: String,
    Summary: String,
    URL: String,
    damageType: String,
    rechargeSeconds: Number,
  },
  ChampionIcon_URL: String,
  Health: Number,
  Lore: String,
  Name_English: String,
  OnFreeWeeklyRotation: String,
  Speed: Number,
  Title: String,
  latestChampion: String,
  Last_Update: String,
  Roles: String,
});

const ChampionsInfo = mongoose.model("championsInfo", ChampionsInfoSchema);

module.exports = ChampionsInfo;
