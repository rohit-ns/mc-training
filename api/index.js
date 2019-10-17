import { ApolloServer } from 'apollo-server-express';
import config from "./config";
import UserAPI from './services/user'
// import  publishSubscriptionData from './services/SocketConnector';
import Server from "./Server";
import Database from "./services/Database";
import resolvers from "./graphql/resolvers";
import { loadGqlFiles } from "./graphql/graphQlFileReader";
import logger from "./libs/logger";

import * as types from './graphql/rootTypes';

console.log(JSON.stringify(config, null, 3));
const server = new Server(config);
server.bootstrap();

const runningServer = server.application.listen(config.port);

runningServer.on("listening", async () => {
  const ann = `|| App is running at port '${config.port}' in '${config.nodeEnv}' mode ||
               connected to mongodb`;
  Database.open({ mongoUri: config.MONGO_URL }).then(async () => {
    console.log(ann);
    await startApollo();
  });

  // await startApollo();
});

runningServer.on("error", err => {
  logger.error("error while starting---", err);
});

async function startApollo() {
  console.log("startApollo - apollo:");
  const path = require("path").resolve(__dirname, "./**/*.graphql");

  try {
    const apolloServer = new ApolloServer({
      typeDefs: [...Object.values(types)],
      resolvers,
      dataSources: () => {
        return {
          userApi: new UserAPI(),
        };
      },
      context: async ({ req, connection }) => {
        if (connection) {
          return connection.context;
        }
        else{
          return {
            apikey: req.headers.apikey
          }
        }
       
      },
      playground: config.playGround,
      introspection: config.introspection,
    });
    apolloServer.applyMiddleware({ app: server.application });
    apolloServer.installSubscriptionHandlers(runningServer);
    console.log("startApollo - apollo started now!!!!:");
  }
  catch(err) { console.error('error inloading types', err);}
}

// publishSubscriptionData();
