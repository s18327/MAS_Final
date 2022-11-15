import { Column, PrimaryGeneratedColumn } from "typeorm";

/**
 *  Abstract class representing a user
 */
export abstract class User {
  @PrimaryGeneratedColumn()
  id: number; // primary key

  @Column("varchar", { length: 32 })
  name: string; // name of the user

  @Column("int", { width: 32, unique: true })
  phone: number; // phone number of the user (unique)
}
