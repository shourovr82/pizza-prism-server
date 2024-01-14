export const foodItemFilterableFields: string[] = ["searchTerm", "role", "userStatus"];

export const foodItemSearchableFields: string[] = ["firstName", "lastName", "phoneNumber", "user"];

export const foodItemRelationalFields: string[] = ["userStatus", "role"];
export const foodItemRelationalFieldsMapper: { [key: string]: string } = {
  userStatus: "userStatus",
  role: "role",
};
