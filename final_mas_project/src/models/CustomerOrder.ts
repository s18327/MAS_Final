import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderProduct } from "./OrderProduct";
import { StorageUnit } from "./StorageUnit";
import { PcBuilder } from "./PcBuilder";
import { Customer } from "./Customer";
import { Manager } from "./Manager";

/**
 * @Enum representing the different statuses of CustomerOrders
 */
export enum Status {
  CREATED = "created",
  PREPARING = "preparing",
  COMPLETED = "completed",
  CANCELED = "cancelled",
}

/**
 * @Entity class representing a CustomerOrder
 */
@Entity()
export class CustomerOrder {
  @PrimaryGeneratedColumn()
  id: number; // primary key

  @Column("varchar", { length: 32 })
  label: string; // label of the order

  @Column({
    type: "enum",
    enum: Status,
    default: Status.CREATED,
  })
  status: Status; // status of the order

  @Column({ type: "boolean", default: false })
  isPaid: boolean; // is the order paid

  @Column({ type: "timestamp" })
  toBeReadyAt: Date; // when the order is to be ready

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.customerOrder, {
    nullable: false,
    cascade: true,
    eager: true,
  })
  orderProducts: OrderProduct[]; // one to many relation to OrderProduct

  @ManyToOne(() => Customer, (customer) => customer.customerOrders, {
    nullable: false,
    eager: true,
  })
  customer: Customer; // many to one relation to Customer

  @ManyToOne(() => Manager, (manager) => manager.customerOrders)
  manager: Manager; // many to one relation to Manager

  @ManyToOne(() => PcBuilder, (pcBuilder) => pcBuilder.customerOrders, {
    eager: true,
  })
  pcBuilder: PcBuilder; // many to one relation to PcBuilder

  @ManyToOne(() => StorageUnit, (storageUnit) => storageUnit.customerOrders)
  storageUnit: StorageUnit; // many to one relation to StorageUnit
}
