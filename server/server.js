const express = require("express");
const api = require("./api.js");
// eslint-disable-next-line no-unused-vars
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const https = require("https");
const path = require("path");
const fs = require("fs/promises");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();
const port = process.env.PORT || 3001;
require("dotenv").config();

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
console.log(process.env.DB_USERNAME);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.esoz4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);
let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });
}
startServer();

app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
app.use(cors());

const dbConnection = mongoose.connection;

dbConnection.on("error", (err) => console.log(`Connection Error: ${err}`));
dbConnection.once("open", () => console.log("Connected to DataBase"));

app.get("/onlinePlayers", async (request, response) => {
  let data = "";

  await new Promise((resolve) => {
    https
      .get("https://steamcharts.com/app/444090", (res) => {
        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", async () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  });

  const dom = new JSDOM(data);

  response.json(
    dom.window.document.querySelectorAll("#app-heading .app-stat .num")[0]
      .innerHTML
  );
});
app.get("/api/:method/:info1?/:info2?/:info3?", async (request, response) => {
  let apiData = await api.dealWithRequest(
    request.params.method,
    request.params.info1,
    request.params.info2,
    request.params.info3
  );
  response.json(apiData);
});
app.get("/graphql", (req, res) => {
  res.redirect(`https://paladinsdata.herokuapp.com/graphql`);
});

// All other GET requests not handled before will return our React app
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
