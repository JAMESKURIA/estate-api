import { IsNumber, IsString } from "class-validator";
import { SubLocation } from "../models/SubLocation";

export class LocationDto {
  @IsNumber()
  id?: number;

  @IsString()
  name!: string;

  subLocations?: SubLocation[];
}
