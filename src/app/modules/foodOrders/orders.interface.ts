import { OrderItem, PaymentMethod } from "@prisma/client";

export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  role?: string | undefined;
  userStatus?: string | undefined;
  email?: string | undefined;
};
export type IFoodOrderCreateRequest = {
  orderNumber: string;
  address: string;
  importantText?: string;
  orderItems: OrderItem[];
  paymentMethod: PaymentMethod;
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
