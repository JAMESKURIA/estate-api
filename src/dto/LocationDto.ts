import { IsNumber, IsOptional, IsString } from "class-validator";
import { SubLocation } from "../models/SubLocation";

export class LocationDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name!: string;

  subLocations?: SubLocation[];
}
