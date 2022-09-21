import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Location } from "./Location";
import { User } from "./User";

@Entity("sub_locations")
export class SubLocation extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { name: "sub_location_id" })
  id?: number;

  @Column("varchar", { length: 255, name: "sub_location_name" })
  name!: string;

  @ManyToOne(() => Location, (location) => location.subLocations)
  @JoinColumn({ name: "sub_location_location_id" })
  location?: Location;

  @OneToMany(() => User, (user) => user.subLocation)
  users?: User[];
}
