import * as express from "express";
import { Request, Response } from "express";
import { Product } from "../models/Product";
import { FinalProduct } from "../models/FinalProduct";
import { PcComponent } from "../models/PcComponent";

/**
 * @function getProductRoutes - contains all routes for the product
 * @param connection - Connection to the database
 * @returns {express.Router} - Router with all routes for the product
 */
export function getProductRoutes(connection) {
  const productRepository = connection.getRepository(Product); // get the product repository
  const finalProductRepository = connection.getRepository(FinalProduct); // get the final product repository
  const pcComponentRepository = connection.getRepository(PcComponent); // get the pc component repository
  const router = express.Router();

  //get all final products
  router.get("/finalProducts", async (req: Request, res: Response) => {
    const finalProducts = await finalProductRepository.find({
      relations: ["product"],
    });
    return res.status(200).json(finalProducts);
  });

  //get a final product by id
  router.get("/finalProduct/:id", async (req: Request, res: Response) => {
    const finalProduct = await finalProductRepository.findOneBy(
      { id: req.params.id },
      { relations: ["product"] }
    );
    if (!finalProduct) return res.status(404);

    return res.status(200).json(finalProduct);
  });

  //get all pc components
  router.get("/pcComponents", async (req: Request, res: Response) => {
    const components = await pcComponentRepository.find({
      relations: ["product"],
    });
    res.status(200).json(components);
  });

  //get a pc component by id
  router.get("/pcComponent/:id", async (req: Request, res: Response) => {
    const component = await pcComponentRepository.findOneBy(
      { id: req.params.id },
      { relations: ["product"] }
    );

    if (!component) return res.status(404);

    return res.status(200).json(component);
  });

  //create a product
  router.post("/", async (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);
    if (body.product || (!body.finalProduct && !body.pcComponent))
      return res.status(400).send("Invalid product");

    const product = new Product();

    product.name = body.product.name;
    product.price = body.product.price;
    product.prodTypes = [];

    if (body.finalProduct) {
      const finalProduct = new FinalProduct();
      finalProduct.category = body.finalProduct.category;
      product.finalProduct = finalProduct;
    }

    if (body.pcComponent) {
      const pcComponent = new PcComponent();
      pcComponent.componentType = body.pcComponent.componentType;
      product.pcComponent = pcComponent;
    }

    try {
      await productRepository.save(product);
    } catch (error) {
      return res.status(500).send(error);
    }

    return res.status(200);
  });

  return router;
}
