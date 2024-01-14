import { UserRoles, UserStatus } from "@prisma/client";

export type IRequestUser = {
  role: UserRoles;
  userId: string;
  profileId: string;
  email: string;
  userStatus: UserStatus;
  iat: number;
  exp: number;
};
