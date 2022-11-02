import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { SubLocation } from "../models/SubLocation";
export class SubLocationDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  subLocations?: SubLocation[];
}
