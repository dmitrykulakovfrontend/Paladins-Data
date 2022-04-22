import { gql } from '@apollo/client';

export const GET_ICONS = gql`
  query getChampionsIcon {
    getChampionsInfo {
      ChampionIcon_URL
      Roles
    }
  }
`;

export const GET_CHAMPIONS = gql`
  query GetChampionsInfo {
    getChampionsInfo {
      Ability_1 {
        Description
        Summary
        URL
        damageType
        rechargeSeconds
      }
      Ability_2 {
        rechargeSeconds
        damageType
        URL
        Summary
        Description
      }
      Ability_3 {
        rechargeSeconds
        damageType
        URL
        Summary
        Description
      }
      Ability_4 {
        rechargeSeconds
        damageType
        URL
        Summary
        Description
      }
      Ability_5 {
        rechargeSeconds
        damageType
        URL
        Summary
        Description
      }
      ChampionIcon_URL
      Health
      Lore
      Name_English
      OnFreeWeeklyRotation
      Speed
      Title
      Roles
    }
  }
`;
export const GET_CHAMPIONS_ROLES = gql`
  query GetChampionsRoles {
    getChampionsInfo {
      Name_English
      Roles
    }
  }
`;