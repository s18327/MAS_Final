import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FinalProduct } from "./FinalProduct";
import { ComponentSpecification } from "./ComponentSpecification";

/**
 *  @Entity representing a specification of the final product
 */
@Entity()
export class Specification {
  @PrimaryGeneratedColumn()
  id: number; // primary key

  @Column({ type: "integer", width: 1, default: 1 })
  skillTierRequired: number; // skill tier required to complete the specification

  @Column("varchar", { length: 512 })
  description: string; // description of the specification

  @OneToOne(() => FinalProduct, { nullable: false })
  @JoinColumn()
  finalProduct: FinalProduct; // one to one relation to the final product

  @OneToMany(
    () => ComponentSpecification,
    (componentSpecification) => componentSpecification.specification,
    {
      nullable: false,
      cascade: true,
    }
  )
  componentSpecifications: ComponentSpecification[]; // one to many relation to the component specifications
}
