import {BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PcComponent} from "./PcComponent";
import {StorageUnit} from "./StorageUnit";

/**
 * @Entity class representing a component stock
 */
@Entity()
export class ComponentStock {

    @PrimaryGeneratedColumn()
    id: number; // primary key

    @Column({type: "integer" ,width:3 , default:0})
    stock: number; // number of units in stock

    @ManyToOne(() => PcComponent, pcComponent => pcComponent.componentStock, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    pcComponent: PcComponent; // many to one relation to the pc component

    @ManyToOne(() => StorageUnit, storageUnit => storageUnit.componentStock, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    storageUnit: StorageUnit; // many to one relation to the storage unit

    @BeforeInsert() // before inserting check if the stock is not lower than 1
    checkStock() {
        if (this.stock < 1)
            throw Error("Stock cannot be lower than 1");
    }

    increaseStock(): void { this.stock++; } // increase stock by 1

    decreaseStock(): boolean { // decrease stock by 1 if possible
        if (this.stock == 0) return false;

        this.stock--;
    }

}