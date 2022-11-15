import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FinalProduct } from "./FinalProduct";
import { PcComponent } from "./PcComponent";

// enum representing type of product
export type Type = "component" | "pc";

/**
 * @Entity representing a product
 */
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number; // primary key

  @Column({ type: "varchar", length: 32, unique: true })
  name: string; // name of the product

  @Column({ type: "int", width: 8 })
  price: number; // price of the product

  @Column({ type: "simple-array" })
  prodTypes: Type[]; // array of types of the product

  @OneToOne(() => FinalProduct, (finalProduct) => finalProduct.product, {
    cascade: true,
  })
  finalProduct: FinalProduct; // one to one relation to the final product

  @OneToOne(() => PcComponent, (pcComponent) => pcComponent.product, {
    cascade: true,
  })
  pcComponent: PcComponent; // one to one relation to the pc component
}
