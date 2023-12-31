export const propertyOwnerFilterableFields: string[] = ["propertyOwnerId", "searchTerm"];

export const propertyOwnerSearchableFields: string[] = ["firstName", "lastName", "phoneNumber"];

export const propertyOwnerRelationalFields: string[] = ["user"];
export const propertyOwnerRelationalFieldsMapper: { [key: string]: string } = {
  userId: "userId",
};
