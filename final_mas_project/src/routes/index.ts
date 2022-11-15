import * as express from "express";
import { getCustomerRoutes } from "./customer";
import { getPcBuilderRoutes } from "./pcBuilder";
import { getProductRoutes } from "./product";
import { getOrderRoutes } from "./order";

/**
 * @function getRoutes - Get all routes
 * @param {connection} connection - Connection to the database
 *
 * accumulate all the express routes and returns them
 */
export function getRoutes(connection) {
  const router = express.Router();
  router.use("/order", getOrderRoutes(connection)); // add order routes
  router.use("/customer", getCustomerRoutes(connection)); // add customer routes
  router.use("/pcbuilder", getPcBuilderRoutes(connection)); // add pc builder routes
  router.use("/product", getProductRoutes(connection)); // add product routes
  return router;
}
