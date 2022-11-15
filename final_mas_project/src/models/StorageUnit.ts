import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { CustomerOrder } from "./CustomerOrder";
import { ComponentStock } from "./ComponentStock";

/**
 * @Entity class representing a storage unit
 */
@Entity()
export class StorageUnit {
  @PrimaryGeneratedColumn()
  id: number; // primary key

  @Column({ type: "varchar", length: 32 })
  name: string; // name of the storage unit

  @OneToMany(() => Customer, (customer) => customer.storageUnit)
  customers: Customer[]; // one to many relation to the customers

  @OneToMany(() => CustomerOrder, (customerOrder) => customerOrder.storageUnit)
  customerOrders: CustomerOrder[]; // one to many relation to the customer orders

  @OneToMany(
    () => ComponentStock,
    (componentStock) => componentStock.storageUnit,
    {
      nullable: false,
      cascade: true,
    }
  )
  componentStock: ComponentStock[]; // one to many relation to the component stocks
}
