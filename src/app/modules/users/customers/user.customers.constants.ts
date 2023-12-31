export const customersFilterableFields: string[] = ["orderNo", "searchTerm", "factoryId", "styleNo", "profileId", "itemId", "createdAt", "startDate", "endDate"];

export const customersSearchableFields: string[] = ["styleNo", "factoryId", "styleNo", "profileId", "itemId"];

export const customersRelationalFields: string[] = ["profileId"];
export const customersRelationalFieldsMapper: { [key: string]: string } = {
  profileId: "profileId",
};
