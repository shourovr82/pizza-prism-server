export const ordersFilterableFields: string[] = ["searchTerm", "role", "userStatus"];

export const ordersSearchableFields: string[] = ["firstName", "lastName", "phoneNumber", "user"];

export const ordersRelationalFields: string[] = ["userStatus", "role"];
export const ordersRelationalFieldsMapper: { [key: string]: string } = {
  userStatus: "userStatus",
  role: "role",
};
