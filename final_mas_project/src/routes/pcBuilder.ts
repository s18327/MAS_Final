import * as express from "express";
import { Request, Response } from "express";
import { PcBuilder } from "../models/PcBuilder";
import { PostgresDataSource } from "../dataSource";

/**
 * @function getPcBuilderRoutes - contains all the routes for the pc builder
 * @param connection - Connection to the database
 * @returns {express.Router} - Router with all routes for the pc builder
 */
export function getPcBuilderRoutes(connection) {
  const pcBuilderRepository = connection.getRepository(PcBuilder); // get the pc builder repository
  const entityManager = PostgresDataSource.manager; // get the entity manager
  const router = express.Router();

  // get all pc builders
  router.get("/", async (req: Request, res: Response) => {
    const pcBuilders = await pcBuilderRepository.find();
    return res.status(200).json(pcBuilders);
  });

  // get a pc builder by id
  router.get("/:id", async (req: Request, res: Response) => {
    const pcBuilder = await pcBuilderRepository.findBy({ id: req.params.id });

    if (!pcBuilder) return res.status(404);

    return res.status(200).json(pcBuilder);
  });

  //create a pc builder
  router.post("/", async (req: Request, res: Response) => {
    const exists = await pcBuilderRepository.findOneBy({ id: req.body.phone });
    if (exists) return res.status(400).send("pc builder already exists");
    const pcBuilder = await pcBuilderRepository.create(req.body);
    const result = await pcBuilderRepository.save(pcBuilder);
    return res.status(200).json(result);
  });

  // promote a pc builder
  router.put("/:id/promote", async (req: Request, res: Response) => {
    const pcBuilder = await entityManager.findOneBy(PcBuilder, {
      id: Number(req.params.id),
    });

    if (!pcBuilder) return res.status(404);

    if (!pcBuilder.promote())
      res.status(409).send("PcBuilder cannot be promoted");

    await entityManager.save(pcBuilder);
    return res.status(200).send("Promoted successfully");
  });

  // change employment type of the pc builder to the specified value
  router.post("/:id/setEmployment", async (req: Request, res: Response) => {
    const pcBuilder = await entityManager.findOneBy(PcBuilder, {
      id: Number(req.params.id),
    });

    if (!pcBuilder) return res.status(404);

    if (!req.body.employment)
      return res.status(500).send("No employment type provided");

    if (
      !pcBuilder.setEmployment(
        req.body.employment.employment,
        req.body.employment.amount
      )
    )
      return res.status(409).send("Cannot change employment to the same type");

    await entityManager.save(pcBuilder);
    return res.status(200).send("Employment changed successfully");
  });

  return router;
}
