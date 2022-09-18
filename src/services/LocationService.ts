import { CreateLocationDto } from "../dto/CreateLocationDto";
import { CreateSubLocationDto } from "../dto/CreateSubLocationDto";
import { Location } from "../models/Location";
import { SubLocation } from "../models/SubLocation";

export interface LocationService {
  createOrUpdateLocation(location: CreateLocationDto): Promise<Location>;

  getAllLocations(): Promise<Location[]>;

  getLocationById(id: number): Promise<Location | null>;

  createOrUpdateSubLocation(
    subLocation: CreateSubLocationDto
  ): Promise<SubLocation>;

  getAllSubLocations(): Promise<SubLocation[]>;

  getSubLocationById(id: number): Promise<SubLocation | null>;
}
