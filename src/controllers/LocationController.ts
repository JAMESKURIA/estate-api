import {
  Body,
  Get,
  JsonController,
  NotFoundError,
  Param,
  Post,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { CreateSubLocationDto } from "../dto/CreateSubLocationDto";
import { Location } from "../models/Location";
import { LOCATION_SERVICE_IMPL } from "../services/impl/LocationServiceImpl";
import { CreateLocationDto } from "./../dto/CreateLocationDto";
import { LocationService } from "./../services/LocationService";

@JsonController("/location/")
@Service()
export class LocationController {
  @Inject(LOCATION_SERVICE_IMPL)
  private readonly locationService!: LocationService;

  @Post("createLocation")
  public async createOrUpdateLocation(
    @Body() location: CreateLocationDto
  ): Promise<Location> {
    return await this.locationService.createOrUpdateLocation(location);
  }

  @Get("getLocations")
  public async getAllLocations() {
    return await this.locationService.getAllLocations();
  }

  @Get("getLocation/:id")
  public async getLocation(@Param("id") locationId: string) {
    const location = await this.locationService.getLocationById(+locationId);
    if (!location) throw new NotFoundError("Location not found");

    return location;
  }

  @Post("createSubLocation")
  public async createOrUpdateSubLocation(
    @Body() subLocation: CreateSubLocationDto
  ) {
    return await this.locationService.createOrUpdateSubLocation(subLocation);
  }

  @Get("getSubLocations")
  public async getAllSubLocations() {
    return await this.locationService.getAllSubLocations();
  }

  @Get("getSubLocation/:id")
  public async getSubLocation(@Param("id") subLocationId: string) {
    const subLocation = await this.locationService.getSubLocationById(
      +subLocationId
    );
    if (!subLocation) throw new NotFoundError("Sublocation not found");

    return subLocation;
  }
}
