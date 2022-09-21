import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SubLocation } from "./SubLocation";

@Entity("location")
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { name: "location_id" })
  id!: number;

  @Column("varchar", { length: 255, name: "location_name" })
  name!: string;

  @OneToMany(() => SubLocation, (subLocation) => subLocation.location)
  subLocations!: SubLocation[];
}
