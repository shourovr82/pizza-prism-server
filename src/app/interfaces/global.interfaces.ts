import { UserRoles, UserStatus } from '@prisma/client';

export type IRequestUser = {
  role: UserRoles;
  userId: string;
  profileId: string;
  email: string;
  userStatus: UserStatus;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
};
