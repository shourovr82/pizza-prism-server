export const foodMenuFilterableFields: string[] = ["searchTerm", "role", "userStatus"];

export const foodMenuSearchableFields: string[] = ["firstName", "lastName", "phoneNumber", "user"];

export const foodMenuRelationalFields: string[] = ["userStatus", "role"];
export const foodMenuRelationalFieldsMapper: { [key: string]: string } = {
  userStatus: "userStatus",
  role: "role",
};
