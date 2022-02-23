import { useQuery, gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query getEvents {
    getAllEvents {
      title
      ends
    }
  }
`;
