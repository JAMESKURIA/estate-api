import { LocationDto } from "../dto/LocationDto";
import { SubLocationDto } from "../dto/SubLocationDto";
import { Location } from "../models/Location";
import { SubLocation } from "../models/SubLocation";

export interface LocationService {
  createLocation(location: LocationDto): Promise<Location>;

  updateLocation(location: LocationDto): Promise<Location>;

  getAllLocations(): Promise<Location[]>;

  getLocationById(id: number): Promise<Location | null>;

  createSubLocation(sublocation: SubLocationDto): Promise<SubLocation>;

  updateSubLocation(sublocation: SubLocationDto): Promise<SubLocation>;

  getAllSubLocations(): Promise<SubLocation[]>;

  getSubLocationById(id: number): Promise<SubLocation | null>;
}
