import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ComponentSpecification } from "./ComponentSpecification";
import { ComponentStock } from "./ComponentStock";
import { Product } from "./Product";

@Entity()
export class PcComponent {
  @PrimaryGeneratedColumn()
  id: number; // primary key

  @Column({ type: "varchar", length: 32 })
  componentType: string; // type of the component

  @OneToOne(() => Product, {
    nullable: false,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn()
  product: Product; // one to one relation to the product

  @OneToMany(
    () => ComponentSpecification,
    (componentSpecification) => componentSpecification.pcComponent
  )
  componentSpecifications: ComponentSpecification[]; // one to many relation to the component specifications

  @OneToMany(
    () => ComponentStock,
    (componentStock) => componentStock.pcComponent,
    {
      nullable: false,
    }
  )
  componentStock: ComponentStock[]; // one to many relation to the component stocks
}
