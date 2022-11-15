import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CustomerOrder } from "./CustomerOrder";
import { StorageUnit } from "./StorageUnit";
import { User } from "./User";

/**
 * @Entity class representing a Customer that is a user of the system
 */
@Entity()
export class Customer extends User {
  @Column({ type: "boolean", default: false })
  isPremium: boolean; // boolean value representing if the customer is a premium customer

  @ManyToOne(() => StorageUnit, (storageUnit) => storageUnit.customers, {
    nullable: false,
  })
  storageUnit: StorageUnit; // many to one relation to the storage unit that the customer is assigned to

  @OneToMany(() => CustomerOrder, (customerOrder) => customerOrder.customer)
  customerOrders: CustomerOrder[]; // one to many relation to the customer orders that the customer has
}
