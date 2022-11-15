import { BeforeInsert, BeforeUpdate, Column } from "typeorm";
import { User } from "./User";

// enum representing type of Employment
export enum Employment {
  PART_TIME = "part_time",
  FULL_TIME = "full_time",
}

/**
 * Abstract class representing a Staff member that is also an extension of User
 */
export abstract class Staff extends User {
  @Column({
    type: "enum",
    enum: Employment,
    default: Employment.FULL_TIME,
  })
  employment: Employment; // employment type of the staff member

  @Column({ type: "integer", width: 5, nullable: true })
  salary: number; // if the staff member is a full time employee, the salary is required and the pay per hour is null

  @Column({ type: "integer", width: 5, nullable: true })
  payPerHour: number; // if the staff member is a part time employee, the pay per hour is required and the salary is null

  @BeforeInsert()
  checkOccupancyInsert() {
    this.checkEmployment();
  }

  @BeforeUpdate()
  checkOccupancyUpdate() {
    this.checkEmployment();
  }

  checkEmployment() {
    // check if the staff member is a full time or part time employee
    if (this.employment == Employment.PART_TIME) {
      if (!this.payPerHour) throw Error("No amount specified for pay per hour");

      this.salary = null;
    }

    if (this.employment == Employment.FULL_TIME) {
      if (!this.salary) throw Error("No amount specified for salary");

      this.payPerHour = null;
    }
  }

  abstract promote(); // abstract method

  abstract setEmployment(employment: Employment, amount: number): boolean; // abstract method
}
