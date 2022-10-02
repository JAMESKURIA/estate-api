import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SubLocation } from "../models/SubLocation";
export class SubLocationDto {
  @IsNumber()
  id?: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  subLocations?: SubLocation[];
}
