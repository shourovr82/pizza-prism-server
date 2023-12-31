export const serviceProviderFilterableFields: string[] = ["serviceProviderId", "searchTerm"];

export const serviceProviderSearchableFields: string[] = ["firstName", "lastName", "phoneNumber"];

export const serviceProviderRelationalFields: string[] = ["user"];
export const serviceProviderRelationalFieldsMapper: { [key: string]: string } = {
  userId: "userId",
};
