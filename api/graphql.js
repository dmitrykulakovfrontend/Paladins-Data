import { ApolloServer } from "@apollo/server";
import { getConnection } from "../src/database";

import typeDefs from "../server/typeDefs";
import resolvers from "../server/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const dbConn = await mongoose.createConnection(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.esoz4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );

    return { dbConn };
  },
  playground: true,
  introspection: true,
});

export default apolloServer.createHandler({ path: "/api/graphql" });
