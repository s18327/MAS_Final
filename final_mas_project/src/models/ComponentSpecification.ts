import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Specification } from "./Specification";
import { PcComponent } from "./PcComponent";

/**
 * @Entity representing a ComponentSpecification
 */
@Entity()
export class ComponentSpecification {
  @PrimaryGeneratedColumn()
  id: number; // Primary key

  @Column({ type: "integer", width: 3, default: 1 })
  amount: number; // Amount of the component minimum 1

  @Column({ type: "varchar", length: 256, nullable: true })
  comment: string; // Comment about the component

  @ManyToOne(
    () => Specification,
    (specification) => specification.componentSpecifications,
    {
      nullable: false,
      onDelete: "CASCADE",
    }
  )
  specification: Specification; // Many to one relation to the specification

  @ManyToOne(
    () => PcComponent,
    (pcComponent) => pcComponent.componentSpecifications,
    {
      nullable: false,
      onDelete: "CASCADE",
    }
  )
  pcComponent: PcComponent; // Many to one relation to the pc component
}
