const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Champion {
    Assists: Int
    Champion: String
    Deaths: Int
    Gold: Int
    Kills: Int
    LastPlayed: String
    Losses: Int
    Matches: Int
    Minutes: Int
    Wins: Int
  }

  type Ability {
    Description: String
    Summary: String
    URL: String
    damageType: String
    rechargeSeconds: Int
  }

  type ChampionInfo {
    Ability_1: Ability
    Ability_2: Ability
    Ability_3: Ability
    Ability_4: Ability
    Ability_5: Ability
    ChampionIcon_URL: String
    Health: Int
    Lore: String
    Name_English: String
    OnFreeWeeklyRotation: String
    Speed: Int
    Title: String
    latestChampion: String
    Last_Update: String
    Roles: String
  }

  type Event {
    title: String
    ends: String
    repeats: Int
  }

  type Player {
    id: ID
    ActivePlayerId: Int
    AvatarURL: String
    Name: String
    Created_Datetime: String
    HoursPlayed: Int
    Last_Login_Datetime: String
    Level: Int
    Losses: Int
    Wins: Int
    Platform: String
    Region: String
    Title: String
    Total_Achievements: Int
    Total_XP: Int
    hz_player_name: String
    Last_Update: String
    Siege: [Champion]
    Competitive: [Champion]
    Onslaught: [Champion]
    TDM: [Champion]
    Status: Int
    Points: Int
    Tier: Int
  }

  type Query {
    getAllEvents: [Event]!
    getAllPlayers: [Player]!
    getChampionsInfo: [ChampionInfo]!
    getPlayer(hz_player_name: String): Player
  }

  type Mutation {
    createNewEvent(newEvent: NewEventInput): Event
    updateEvent(title: String, event: UpdateEventInput): Event
    deleteEvent(title: String): String
  }

  input NewEventInput {
    title: String
    ends: String
    repeats: Int
  }

  input UpdateEventInput {
    title: String
    ends: String
    repeats: Int
  }
`;

module.exports = typeDefs;
