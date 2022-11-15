import { Column, Entity, OneToMany } from "typeorm";
import { Employment, Staff } from "./Staff";
import { CustomerOrder } from "./CustomerOrder";

/**
 * @Entity class representing a Manager that is a staff member
 */
@Entity()
export class Manager extends Staff {
  @Column({ type: "boolean", default: false })
  isBoss: boolean; // represents if the manager is the boss of the company

  @OneToMany(() => CustomerOrder, (customerOrder) => customerOrder.manager)
  customerOrders: CustomerOrder[]; // set the employment of the manager

  promote(): void {
    // promote the manager
    this.isBoss = true;
  }

  /**
   * @param employment the employment type of the manager
   * @returns true if the manager employment type is changed else return false
   */
  setEmployment(
    employment: Employment.FULL_TIME | Employment.PART_TIME
  ): boolean {
    if (this.employment == employment) return false;

    this.employment = employment;
    return true;
  }
}
