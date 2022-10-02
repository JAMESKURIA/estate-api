import { Service } from "typedi";
import { LocationDto } from "../../dto/LocationDto";
import { SubLocationDto } from "../../dto/SubLocationDto";
import { Location } from "../../models/Location";
import { SubLocation } from "../../models/SubLocation";
import { LocationRepo } from "../../repositories/LocationRepo";
import { SubLocationRepo } from "../../repositories/SubLocationRepo";
import { LocationService } from "./../LocationService";

export const LOCATION_SERVICE_IMPL = "LOCATION_SERVICE_IMPL";

@Service(LOCATION_SERVICE_IMPL)
export class LocationServiceImpl implements LocationService {
  async createSubLocation(sublocation: SubLocationDto): Promise<SubLocation> {
    return await SubLocationRepo.save(sublocation);
  }
  updateSubLocation(sublocation: SubLocationDto): Promise<SubLocation> {
    throw new Error("Method not implemented.");
  }
  async createLocation(location: LocationDto): Promise<Location> {
    return await LocationRepo.save(location);
  }

  async updateLocation(location: LocationDto): Promise<Location> {
    throw new Error("Method not implemented.");
  }

  public async getAllSubLocations(): Promise<SubLocation[]> {
    return await SubLocationRepo.find();
  }

  public async getSubLocationById(id: number): Promise<SubLocation | null> {
    return await SubLocationRepo.findOneBy({ id });
  }

  public async getAllLocations(): Promise<Location[]> {
    return await LocationRepo.find();
  }

  public async getLocationById(id: number): Promise<Location | null> {
    return await LocationRepo.findOneBy({ id });
  }
}
