import { useQuery, gql } from '@apollo/client';


export const GET_PLAYER = gql`
  query getSpecificPlayer($hz_player_name: String) {
    getPlayer(hz_player_name: $hz_player_name) {
      hz_player_name
      ActivePlayerId
      AvatarURL
      Name
      Created_Datetime
      HoursPlayed
      Last_Login_Datetime
      Level
      Losses
      Wins
      Platform
      Region
      Title
      Total_Achievements
      Total_XP
      Siege {
        Assists
        Champion
        Deaths
        Gold
        Kills
        LastPlayed
        Losses
        Matches
        Minutes
        Wins
      }
      Competitive {
        Assists
        Champion
        Gold
        Deaths
        Kills
        LastPlayed
        Losses
        Matches
        Minutes
        Wins
      }
      Onslaught {
        Assists
        Champion
        Deaths
        Kills
        Gold
        LastPlayed
        Losses
        Matches
        Minutes
        Wins
      }
      TDM {
        Assists
        Champion
        Deaths
        LastPlayed
        Kills
        Gold
        Losses
        Matches
        Minutes
        Wins
      }
      Status
      id
      Points
      Tier
      Last_Update
    }
  }
`;
