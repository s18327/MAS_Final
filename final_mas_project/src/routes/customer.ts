import { Customer } from "../models/Customer";
import { Request, Response } from "express";
import * as express from "express";

/**
 * @param connection - Connection to the database
 * @returns {express.Router} - Router with all routes for the customer
 */
export function getCustomerRoutes(connection) {
  const customerRepository = connection.getRepository(Customer); // get the customer repository

  const router = express.Router();

  // get all customers
  router.get("/", async (req: Request, res: Response) => {
    const customers = await customerRepository.find();
    if (!customers) return res.status(404);
    return res.status(200).json(customers);
  });

  // get a customer by id
  router.get("/:id", async (req: Request, res: Response) => {
    const customer = await customerRepository.findOneBy({ id: req.params.id });
    if (!customer) return res.status(404);
    return res.status(200).json(customer);
  });

  // create a new customer
  router.post("/", async (req: Request, res: Response) => {
    const exists = await customerRepository.findOneBy({ id: req.body.phone });
    if (exists) return res.status(400).send("Customer already exists");
    const customer = await customerRepository.create(req.body);
    const result = await customerRepository.save(customer);
    return res.status(201).json(result);
  });

  // update a customer with the given id
  router.put("/:id", async (req: Request, res: Response) => {
    const customer = await connection.manager.findOneBy(Customer, {
      id: req.params.id,
    });
    if (!customer) return res.status(404);
    connection.manager.merge(Customer, customer, req.body);
    const results = await connection.manager.save(Customer, customer);

    return res.status(200).json(results);
  });

  // deletes a customer with the given id
  router.delete("/:id", async (req: Request, res: Response) => {
    const result = await connection.manager.delete(Customer, {
      id: req.params.id,
    });
    return res.status(200).json(result);
  });

  return router;
}
