import { IsString } from "class-validator";
import { SubLocation } from "./../models/SubLocation";

export class CreateLocationDto {
  @IsString()
  name!: string;

  subLocations?: SubLocation[];
}
