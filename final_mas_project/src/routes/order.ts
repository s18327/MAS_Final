import * as express from "express";
import { Request, Response } from "express";
import { CustomerOrder, Status } from "../models/CustomerOrder";
import { Specification } from "../models/Specification";
import { PcBuilder } from "../models/PcBuilder";

/**
 * @function getOrderRoutes - contains all the routes for the order
 * @param connection - Connection to the database
 * @returns {express.Router} - Router with all routes for the order
 */
export function getOrderRoutes(connection) {
  const orderRepository = connection.getRepository(CustomerOrder); // get the order repository
  const entityManager = connection.manager; // get the entity manager

  const router = express.Router();

  //get all orders
  router.get("/", async (req: Request, res: Response) => {
    const orders = await orderRepository.find();
    return res.status(200).json(orders);
  });

  // get all orders that are neither cancelled nor completed
  router.get("/current", async (req: Request, res: Response) => {
    const orders = await orderRepository.find({
      where: [{ status: Status.CREATED }, { status: Status.PREPARING }],
    });
    return res.status(200).json(orders);
  });

  // get order by id
  router.get("/:id", async (req: Request, res: Response) => {
    const result = await orderRepository.findBy({ id: req.params.id });

    if (!result) return res.status(404);

    return res.status(200).json(result);
  });

  // get order by label
  router.get("/label/:label", async (req: Request, res: Response) => {
    const result = await orderRepository.find({
      where: [{ label: req.params.label }],
    });
    return res.status(200).json(result);
  });

  // assign a pc builder to an order if the builder has high enough skill tier
  router.put(
    "/:id/assignPcBuilder/:builder",
    async function (req: Request, res: Response) {
      const order = await entityManager.findOneBy(CustomerOrder, {
        id: Number(req.params.id),
      });
      const pcBuilder = await entityManager.findOneBy(PcBuilder, {
        id: Number(req.params.builder),
      });

      let maxSkillTierRequired = 1;
      let productIds: Array<number> = [];

      if (!order || !pcBuilder) return res.status(404);
      if (order.pcBuilder)
        return res.status(200).json({ success: false, message: "has" });

      order.orderProducts.forEach((orderProduct) => {
        // get all the ids of order products
        productIds.push(Number(orderProduct.finalProduct.id));
      });

      const specifications = await entityManager // get all specifications of the products in the order
        .createQueryBuilder()
        .select()
        .from(Specification, "specification")
        .where(`specification.finalProduct IN(${productIds})`)
        .getRawMany();

      specifications.forEach((specification) => {
        // get the max skill tier of the products
        if (specification.skillTierRequired > maxSkillTierRequired)
          maxSkillTierRequired = specification.skillTierRequired;
      });

      if (pcBuilder.skillTier < maxSkillTierRequired)
        // if the pc builder has not enough skill tier
        return res.status(200).json({
          success: false,
          message: "lowTier",
        });

      order.pcBuilder = pcBuilder;
      await orderRepository.save(order);
      return res
        .status(200)
        .json({ success: true, message: "Pc builder assigned" });
    }
  );

  // change status for the order
  router.put("/:id/statusChange", async (req: Request, res: Response) => {
    const order = await entityManager.findOneBy(CustomerOrder, {
      id: Number(req.params.id),
    });
    if (!order) return res.status(404);

    if (order.status == "completed" || order.status == "cancelled")
      return res.status(200).json({
        success: false,
        message: "cc",
      }); // if the order is already completed or cancelled return false

    if (!req.body.status)
      return res.status(200).json({ success: false, message: "status" }); // if no status is given return false

    const newStatus = req.body.status;

    if (!Object.values(Status).includes(newStatus))
      // if the status is the same as the current status return false
      return res.status(200).json({ success: false, message: "iStatus" });

    switch (newStatus) {
      case "preparing": // if the status is preparing
        if (!order.isPaid)
          return res.status(200).json({ success: false, message: "noPayment" });
        if (!order.pcBuilder)
          return res.status(200).json({
            success: false,
            message: "noPcBuilder",
          });
        break;

      case "completed": // if the status is completed
        let allFilled: boolean = true;
        order.orderProducts.forEach((orderProduct) => {
          if (!orderProduct.specificationFilled) allFilled = false;
        });
        if (!allFilled)
          return res.status(200).json({
            success: false,
            message: "notFilled",
          });
        break;
    }
    order.status = newStatus;
    await orderRepository.save(order);
    return res
      .status(200)
      .json({ success: true, message: `Status changed to ${newStatus}` }); // return true
  });

  // set paid for the order
  router.post("/:id/paid", async (req: Request, res: Response) => {
    const order = await entityManager.findOneBy(CustomerOrder, {
      id: Number(req.params.id),
    });

    if (!order) res.status(404);
    order.isPaid = req.body.paid;
    await orderRepository.save(order);
    return res.status(200).json({
      success: true,
      message: "Payment status has been updated.",
    });
  });

  // get all the order products of an order
  router.get("/:id/products", async (req: Request, res: Response) => {
    const order = await entityManager.findOneBy(CustomerOrder, {
      id: req.params.id,
    });
    if (!order) res.status(404);
    return res.status(200).json(order.orderProducts);
  });

  // create a new order
  router.post("/", async (req: Request, res: Response) => {
    const order = await entityManager.create(CustomerOrder, req.body);
    const result = await entityManager.save(CustomerOrder, order);
    return res.status(200).json(result);
  });

  // update an order
  router.put("/:id", async (req: Request, res: Response) => {
    const order = await entityManager.findOneBy(CustomerOrder, {
      id: req.params.id,
    });
    if (!order) res.status(404);

    entityManager.merge(CustomerOrder, order, req.body);

    const results = await entityManager.save(CustomerOrder, order);
    return res.status(200).json(results);
  });

  return router;
}
