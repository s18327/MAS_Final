import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Specification } from "./Specification";
import { OrderProduct } from "./OrderProduct";
import { Product } from "./Product";

/**
 * @Entity representing a FinalProduct
 */
@Entity()
export class FinalProduct {
  @PrimaryGeneratedColumn()
  id: number; // primary key

  @Column("varchar", { length: 32 })
  category: string; // category of the final product

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.finalProduct)
  orderProduct: OrderProduct[]; // one to many relation to the order products

  @OneToOne(() => Specification, (specification) => specification.finalProduct)
  specification: Specification; // one to one relation to the specification

  @OneToOne(() => Product, {
    nullable: false,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn()
  product: Product; // one to one relation to the product
}
