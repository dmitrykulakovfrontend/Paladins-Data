const { findOneAndUpdate } = require("./models/Player.model");
const Player = require("./models/Player.model");
const Events = require("./models/Events.model");
const ChampionsInfo = require("./models/ChampionsInfo.model");
const api = require("./api.js");

const CheckPlayerExistence = async (playerName) => {
  const data = await api.isPlayerExist(playerName);
  if (data === null) return null;
  if (data.error) {
    console.log(`Error: ${data.error}`);
    return Player.findOne({ hz_player_name: playerName });
  }

  let {
    ActivePlayerId,
    AvatarURL,
    Name,
    Created_Datetime,
    HoursPlayed,
    Last_Login_Datetime,
    Level,
    Losses,
    Wins,
    Platform,
    Region,
    Title,
    Total_Achievements,
    Total_XP,
    hz_player_name,
    Siege,
    TDM,
    Competitive,
    Onslaught,
    Status,
  } = data;
  const Tier = data.RankedKBM.Tier;
  const Points = data.RankedKBM.Points;
  Status = Status.status;
  const Last_Update = new Date().toISOString();

  const player = new Player({
    ActivePlayerId,
    AvatarURL,
    Name,
    Created_Datetime,
    HoursPlayed,
    Last_Login_Datetime,
    Level,
    Losses,
    Wins,
    Platform,
    Region,
    Title,
    Total_Achievements,
    Total_XP,
    hz_player_name,
    Last_Update,
    Siege,
    TDM,
    Competitive,
    Onslaught,
    Status,
    Points,
    Tier,
  });
  player.save();
  return player;
};

const getPlayerResolver = async (parent, args, context, info) => {
  const { hz_player_name } = args;
  let player = await Player.findOne({
    hz_player_name: { $regex: `^${hz_player_name}$`, $options: "i" },
  });
  // Making check if player not in db and he exist, add his data and then return player.
  if (player === null) return CheckPlayerExistence(hz_player_name);

  let { Last_Update } = player;

  // Comparing is 30 minutes gone, if no just return player else update data
  if (new Date() - new Date(Last_Update) <= 30 * 60 * 1000) {
    // console.log("nope");
    return player;
  }

  let data = await api.isPlayerExist(hz_player_name);
  if (data.error) {
    console.log(`Error: ${data.error}`);
    return player;
  }

  // Getting all data for updating player
  let {
    ActivePlayerId,
    AvatarURL,
    Name,
    Created_Datetime,
    HoursPlayed,
    Last_Login_Datetime,
    Level,
    Losses,
    Wins,
    Platform,
    Region,
    Title,
    Total_Achievements,
    Total_XP,
    Siege,
    TDM,
    Competitive,
    Onslaught,
    Status,
  } = data;
  const Tier = data.RankedKBM.Tier;
  const Points = data.RankedKBM.Points;
  Status = Status.status;
  Last_Update = new Date().toISOString();

  // Updating Player and returning back
  await Player.findOneAndUpdate(
    { hz_player_name: { $regex: `^${hz_player_name}$`, $options: "i" } },
    {
      ActivePlayerId,
      AvatarURL,
      Name,
      Created_Datetime,
      HoursPlayed,
      Last_Login_Datetime,
      Level,
      Losses,
      Wins,
      Platform,
      Region,
      Title,
      Total_Achievements,
      Total_XP,
      hz_player_name,
      Last_Update,
      Siege,
      TDM,
      Competitive,
      Onslaught,
      Status,
      Tier,
      Points,
    },
    { new: true }
  );
  return player;
};

const resolvers = {
  Query: {
    getChampionsInfo: async () => {
      // console.log("got request");
      let info = await ChampionsInfo.find();
      let isEmpty = info.length === 0 ? true : false;
      if (
        !isEmpty &&
        new Date() - new Date(info[0].Last_Update) <= 1 * 24 * 60 * 60 * 1000
      ) {
        return info;
      }

      const data = await api.getChampionsInfo();
      if (data === null) return ChampionsInfo.find();

      for (let i = 0; i < data.length; i++) {
        const {
          Ability_1,
          Ability_2,
          Ability_3,
          Ability_4,
          Ability_5,
          ChampionIcon_URL,
          Health,
          Lore,
          Name_English,
          OnFreeWeeklyRotation,
          Speed,
          Title,
          latestChampion,
          Roles,
        } = data[i];

        const Last_Update = new Date().toISOString();

        if (isEmpty) {
          const newInfo = new ChampionsInfo({
            Ability_1,
            Ability_2,
            Ability_3,
            Ability_4,
            Ability_5,
            ChampionIcon_URL,
            Health,
            Lore,
            Name_English,
            OnFreeWeeklyRotation,
            Speed,
            Title,
            latestChampion,
            Last_Update,
            Roles,
          });
          newInfo.save();
          info.push(data[i]);
        } else {
          newInfo = await ChampionsInfo.findOneAndUpdate(
            { Name_English },
            {
              Ability_1,
              Ability_2,
              Ability_3,
              Ability_4,
              Ability_5,
              ChampionIcon_URL,
              Health,
              Lore,
              Name_English,
              OnFreeWeeklyRotation,
              Speed,
              Title,
              latestChampion,
              Last_Update,
              Roles,
            },
            { new: true }
          );
          if (!newInfo) {
            newInfo = new ChampionsInfo({
              Ability_1,
              Ability_2,
              Ability_3,
              Ability_4,
              Ability_5,
              ChampionIcon_URL,
              Health,
              Lore,
              Name_English,
              OnFreeWeeklyRotation,
              Speed,
              Title,
              latestChampion,
              Last_Update,
              Roles,
            });
            newInfo.save();
          }
          data[i].Last_Update = Last_Update;
          info[i] = data[i];
        }
      }
      return info;
    },
    getAllPlayers: async () => {
      const players = await Player.find();
      return players;
    },
    getPlayer: getPlayerResolver,
    getAllEvents: async () => {
      const events = await Events.find();
      events.forEach((event) => {
        if (+new Date(event.ends) - +new Date() <= 0) {
          // console.log("updating...");
          event.ends = new Date(
            +new Date(event.ends) + event.repeats
          ).toISOString();
          event.isUpdated = true;
        }
      });
      events.forEach(async (event) => {
        if (event.isUpdated) {
          event = await Events.findOneAndUpdate(
            { title: event.title },
            { title: event.title, ends: event.ends, repeats: event.repeats },
            { new: true }
          );
        }
      });
      return events;
    },
  },

  Mutation: {
    createNewEvent: async (parent, args, context, info) => {
      const { title, ends, repeats } = args.newEvent;
      const event = new Events({ title, ends, repeats });
      await event.save();
      return event;
    },
    updateEvent: async (parent, args, context, info) => {
      const { title: currentEvent } = args;
      const { title, repeats, ends } = args.event;
      const event = await Events.findOneAndUpdate(
        { title: currentEvent },
        { title, repeats, ends },
        { new: true }
      );
      return event;
    },
    deleteEvent: async (parent, args, context, info) => {
      const { title } = args;
      await Events.findOneAndDelete({ title });
      return `${title} succesfully deleted!`;
    },
  },
};

module.exports = resolvers;
