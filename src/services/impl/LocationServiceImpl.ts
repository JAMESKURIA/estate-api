import { validateOrReject } from "class-validator";
import { Service } from "typedi";
import { CreateLocationDto } from "../../dto/CreateLocationDto";
import { CreateSubLocationDto } from "../../dto/CreateSubLocationDto";
import { Location } from "../../models/Location";
import { SubLocation } from "../../models/SubLocation";
import { LocationRepo } from "../../repositories/LocationRepo";
import { SubLocationRepo } from "../../repositories/SubLocationRepo";
import { LocationService } from "./../LocationService";

export const LOCATION_SERVICE_IMPL = "LOCATION_SERVICE_IMPL";

@Service(LOCATION_SERVICE_IMPL)
export class LocationServiceImpl implements LocationService {
  getAllSubLocations(): Promise<SubLocation[]> {
    return SubLocationRepo.find();
  }

  public async getSubLocationById(id: number): Promise<SubLocation | null> {
    return await SubLocationRepo.findOneBy({ id });
  }
  public async createOrUpdateSubLocation(
    subLocation: CreateSubLocationDto
  ): Promise<SubLocation> {
    await validateOrReject(subLocation);

    const savedSubLocation = await SubLocationRepo.save(subLocation);

    return savedSubLocation;
  }

  public async createOrUpdateLocation(
    location: CreateLocationDto
  ): Promise<Location> {
    await validateOrReject(location);

    const savedLocation = await LocationRepo.save(location);

    return savedLocation;
  }

  getAllLocations(): Promise<Location[]> {
    return LocationRepo.find();
  }

  getLocationById(id: number): Promise<Location | null> {
    return LocationRepo.findOneBy({ id });
  }
}
