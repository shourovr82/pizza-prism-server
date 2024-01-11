import { UserRoles, UserStatus } from "@prisma/client";

export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  role?: string | undefined;
  userStatus?: string | undefined;
  email?: string | undefined;
};
export type IProfileUpdateRequest = {
  oldProfileImagePath?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  role?: UserRoles;
  userStatus?: UserStatus;
};
