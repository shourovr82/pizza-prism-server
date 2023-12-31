export const usersFilterableFields: string[] = ["orderNo", "searchTerm", "factoryId", "styleNo", "profileId", "itemId", "createdAt", "startDate", "endDate"];

export const usersSearchableFields: string[] = ["styleNo", "factoryId", "styleNo", "profileId", "itemId"];

export const usersRelationalFields: string[] = ["profileId"];
export const usersRelationalFieldsMapper: { [key: string]: string } = {
  profileId: "profileId",
};
