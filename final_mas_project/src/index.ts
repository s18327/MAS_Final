import { PostgresDataSource } from "./dataSource";
import { injectData } from "./dataMigration";
import * as express from "express";
import { getRoutes } from "./routes";

/**
 * Initializes db connection and starts the server
 * It also injects data from migrations (needs to be run once on empty db with existing schema pcbuilding)
 * if fails to connect to db, it will exit the process and log the error
 */
PostgresDataSource.initialize()
  .then(async (connection) => {
    //await injectData(connection); // uncomment to run migrations on empty db
 
    const cors = require("cors");
    const api = express();
    const port = 3001;

    api.use(express.json());
    api.use(cors());
    api.use("/", getRoutes(connection));
    api.listen(port);
    console.log(`Server running on port ${port}`);
  })
  .catch((error) => console.log(error));
