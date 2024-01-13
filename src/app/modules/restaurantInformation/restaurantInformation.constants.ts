export const usersFilterableFields: string[] = ["searchTerm", "role", "userStatus"];

export const usersSearchableFields: string[] = ["firstName", "lastName", "phoneNumber", "user"];

export const usersRelationalFields: string[] = ["userStatus", "role"];
export const usersRelationalFieldsMapper: { [key: string]: string } = {
  userStatus: "userStatus",
  role: "role",
};
