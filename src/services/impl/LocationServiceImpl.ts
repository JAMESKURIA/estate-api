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
  public async getAllSubLocations(): Promise<SubLocation[]> {
    return await SubLocationRepo.find();
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

  public async getAllLocations(): Promise<Location[]> {
    return await LocationRepo.find();
  }

  public async getLocationById(id: number): Promise<Location | null> {
    return await LocationRepo.findOneBy({ id });
  }
}
