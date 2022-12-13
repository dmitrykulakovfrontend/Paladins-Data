import { ApolloServer } from "apollo-server-micro";

import typeDefs from "../server/typeDefs";
import resolvers from "../server/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});
export default apolloServer.start().then(() => {
  return apolloServer.createHandler({ path: "/api/graphql" });
});
