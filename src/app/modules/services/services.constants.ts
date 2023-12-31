export const servicesFilterableFields: string[] = ["serviceId", "searchTerm", "ownerId", "serviceType", "serviceAvailability"];

export const servicesSearchableFields: string[] = ["address", "description"];

export const servicesRelationalFields: string[] = ["ownerId"];
export const servicesRelationalFieldsMapper: { [key: string]: string } = {
  ownerId: "ownerId",
};

export const ZodServiceAvailability = ["LOW_PRIORITY", "MEDIUM_PRIORITY", "HIGH_PRIORITY", "ALL_PRIORITIES"];
export const ZodServiceType = [
  "TENANT_SCREENING",
  "MAINTENANCE_AND_REPAIR",
  "CLEANING",
  "PEST_CONTROL",
  "LAWN_CARE",
  "SECURITY_AND_SAFETY",
  "INSURANCE",
  "INSPECTION",
  "MARKETING",
  "TECHNOLOGY",
];
