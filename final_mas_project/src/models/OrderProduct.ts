import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerOrder } from "./CustomerOrder";
import { FinalProduct } from "./FinalProduct";

/**
 * @Entity class representing a OrderProduct
 */
@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number; // primary key

  @Column({ type: "boolean", default: false })
  specificationFilled: boolean; // boolean value representing if the order product has a specification filled

  @ManyToOne(
    () => CustomerOrder,
    (customerOrder) => customerOrder.orderProducts,
    {
      nullable: false,
      onDelete: "CASCADE",
    }
  )
  customerOrder: CustomerOrder; // many to one relation to the customer order

  @ManyToOne(() => FinalProduct, (finalProduct) => finalProduct.orderProduct, {
    nullable: false,
    onDelete: "CASCADE",
    eager: true,
  })
  finalProduct: FinalProduct; // many to one relation to the final product
}
