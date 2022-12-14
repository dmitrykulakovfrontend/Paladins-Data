import { ApolloServer } from "@saeris/apollo-server-vercel";

import typeDefs from "../server/typeDefs";
import resolvers from "../server/resolvers";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.esoz4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("Connected");
    }
  }
);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.

  // playground: true,
  // introspection: true,
});
export default server.createHandler();
