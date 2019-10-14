import mongoose from "mongoose";
import logger from "../libs/logger";

export default class Database {
  static open({ mongoUri}) {
    return new Promise((resolve, reject) => {
      const options = {
        autoIndex: true, // Build indexes
        bufferMaxEntries: 0,
        keepAlive: 1,
        poolSize: 10, // Maintain up to 10 socket connections
        reconnectInterval: 500, // Reconnect every 500ms
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        useNewUrlParser: true,
        useUnifiedTopology: true

      };
      console.log('mongo?Uriiiiiiiiiiiiiiiiii',mongoUri);
      logger.info('uriiiiiiiiiiiiiiiiiiii', mongoUri);
      mongoose.connect(mongoUri, options);

      mongoose.connection.on("connected", () => {
        console.log('connection made to db!!!!!!');
        logger.info('connected to mongo client!');
        resolve();
      });
      mongoose.connection.on("error", err => {
        console.log('connection not made to db!!!!!!');
        // throw new Error(`unable to connect to database: ${mongoUri}`);
        reject(err);
      });
    });
  }

  static close() {
    mongoose.disconnect();
  }
}
