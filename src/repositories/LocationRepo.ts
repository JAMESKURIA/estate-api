import { Repository } from "typeorm";
import dataSource from "../data-source";
import { Location } from "../models/Location";

export const LocationRepo: Repository<Location> =
  dataSource.getRepository(Location);
