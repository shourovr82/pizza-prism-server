export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  role?: string | undefined;
  userStatus?: string | undefined;
  email?: string | undefined;
};
export type IFoodMenuCreateRequest = {
  menuName: string;
  menuDescription?: string;
};
export type IFoodMenuCreateRes = {
  menuImage: string;
  menuName: string;
  menuDescription?: string;
};
export type IFoodMenuUpdateRequest = {
  oldMenuImagePath?: string;
  menuName?: string;
  menuDescription?: string;
};
