import { validateOrReject } from "class-validator";
import {
  Body,
  Get,
  JsonController,
  NotFoundError,
  Param,
  Post,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { LocationDto } from "../dto/LocationDto";
import { SubLocationDto } from "../dto/SubLocationDto";
import { Location } from "../models/Location";
import { LOCATION_SERVICE_IMPL } from "../services/impl/LocationServiceImpl";
import { LocationService } from "./../services/LocationService";

@JsonController("/location/")
@Service()
export class LocationController {
  @Inject(LOCATION_SERVICE_IMPL)
  private readonly locationService!: LocationService;

  @Post("createOrUpdateLocation")
  public async createOrUpdateLocation(
    @Body() location: LocationDto
  ): Promise<Location> {
    await validateOrReject(location);

    if (location?.id) {
      return await this.locationService.updateLocation(location);
    }

    return await this.locationService.createLocation(location);
  }

  @Get("getLocations")
  public async getAllLocations() {
    return await this.locationService.getAllLocations();
  }

  @Get("getLocation/:locationId")
  public async getLocation(@Param("locationId") locationId: string) {
    const location = await this.locationService.getLocationById(+locationId);

    if (!location) throw new NotFoundError("Location not found");

    return location;
  }

  @Get(":locationId/getSubLocations")
  public async getSubLocationsByLocationId(
    @Param("locationId") locationId: string
  ) {
    const location = await this.locationService.getLocationById(+locationId);

    if (!location)
      throw new NotFoundError(`Location with id ${locationId} not found`);

    return location.subLocations;
  }

  @Post("createOrUpdateSubLocation")
  public async createOrUpdateSubLocation(@Body() subLocation: SubLocationDto) {
    await validateOrReject(subLocation);

    if (subLocation?.id)
      return await this.locationService.updateSubLocation(subLocation);

    return this.locationService.createSubLocation(subLocation);
  }

  @Get("getSubLocations")
  public async getAllSubLocations() {
    return await this.locationService.getAllSubLocations();
  }

  @Get("getSubLocation/:subLocationId")
  public async getSubLocation(@Param("subLocationId") subLocationId: string) {
    const subLocation = await this.locationService.getSubLocationById(
      +subLocationId
    );
    if (!subLocation) throw new NotFoundError("Sublocation not found");

    return subLocation;
  }
}
