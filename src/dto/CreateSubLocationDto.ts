import { IsString } from "class-validator";
import { SubLocation } from "../models/SubLocation";
export class CreateSubLocationDto {
  @IsString()
  name!: string;

  subLocations?: SubLocation[];
}
