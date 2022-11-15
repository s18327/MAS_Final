import { Column, Entity, OneToMany } from "typeorm";
import { CustomerOrder } from "./CustomerOrder";
import { Employment, Staff } from "./Staff";

/**
 * @Entity representing a Pc builder that is a staff member
 */
@Entity()
export class PcBuilder extends Staff {
  @Column({ type: "integer", width: 1, default: 1 })
  skillTier: number; // number representing skill tier

  @OneToMany(() => CustomerOrder, (customerOrder) => customerOrder.pcBuilder)
  customerOrders: CustomerOrder[]; // one to many relation to the customer orders

  /**
   * Promotes the staff member to the next skill tier if possible
   * @returns true if the staff member was promoted, false otherwise
   */
  promote(): boolean {
    if (this.skillTier == 4) return false;

    this.skillTier++;
    return true;
  }

  /**
   * Sets the employment of the staff member to specified type and amount
   * @param employment type of employment
   * @param amount amount of money
   * @returns true if the employment was set, false otherwise
   */
  setEmployment(
    employment: Employment.FULL_TIME | Employment.PART_TIME,
    amount: number
  ): boolean {
    if (this.employment == employment) return false;

    if (employment == Employment.FULL_TIME) {
      this.payPerHour = null;
      this.salary = amount;
    }

    if (employment == Employment.PART_TIME) {
      this.payPerHour = amount;
      this.salary = null;
    }

    this.employment = employment;
    return true;
  }
}
