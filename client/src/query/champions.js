import { gql } from '@apollo/client';

export const GET_ICONS = gql`
  query getChampionsIcon {
    getChampionsInfo {
      ChampionIcon_URL
    }
  }
`;
