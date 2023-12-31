import { UserRoles, UserStatus } from "@prisma/client";
export type IUserCreate = {
  firstName: string;
  lastName: string;
  userName: string;
  // profileImage?: string | null | undefined;
  userStatus: UserStatus;
  email: string;
  password: string;
  role?: UserRoles;
};

export type IUserProfileResponse = {
  profileId: string;
  firstName: string;
  lastName: string;
  profileImage?: string | null | undefined;
  role: UserRoles | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IUserResponse = {
  userId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile: IUserProfileResponse;
};

export type IUserLogin = {
  emailOrUsername: string;
  password: string;
  userName: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
