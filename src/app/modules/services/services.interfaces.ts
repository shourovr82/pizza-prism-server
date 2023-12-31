import { ServiceAvailabilityEnum, ServiceType } from "@prisma/client";

export type IServiceUpdateRequest = {
  servicePriceRange?: string;
  serviceDescription?: string;
  serviceLocation?: string;
  serviceCancellationPolicy?: string;
  serviceAvailability?: ServiceAvailabilityEnum;
  serviceType?: ServiceType;
};
export type IServiceFilterRequest = {
  searchTerm?: string | undefined;
  serviceId?: string | undefined;
  ownerId?: string | undefined;
  createdAt?: string | undefined;
};
