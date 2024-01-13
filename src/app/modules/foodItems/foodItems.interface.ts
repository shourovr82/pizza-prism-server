export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  role?: string | undefined;
  userStatus?: string | undefined;
  email?: string | undefined;
};
export type IFoodItemCreateRequest = {
  foodName: string;
  description?: string;
  prevPrice?: number;
  currentPrice: number;
  availableQuantity: number;
  availability?: boolean;
  foodMenuId: string;
};
export type IFoodItemCreateRes = {
  foodImage: string;
  foodName: string;
  description?: string;
  prevPrice?: number;
  currentPrice: number;
  availableQuantity: number;
  availability?: boolean;
  foodMenuId: string;
};
export type IFoodItemUpdateRequest = {
  oldFoodImagePath?: string;
  foodName?: string;
  description?: string;
  prevPrice?: number;
  currentPrice?: number;
  availableQuantity?: number;
  availability?: boolean;
  foodMenuId: string;
};
