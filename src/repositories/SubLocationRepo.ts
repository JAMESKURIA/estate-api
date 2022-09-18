import { Repository } from "typeorm";
import dataSource from "../data-source";
import { SubLocation } from "../models/SubLocation";

export const SubLocationRepo: Repository<SubLocation> =
  dataSource.getRepository(SubLocation);
