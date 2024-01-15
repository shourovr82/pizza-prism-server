/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, Prisma } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import ApiError from "../../../errors/ApiError";
import { deleteOldImage } from "../../../helpers/deleteOldImage";
import httpStatus from "http-status";
import { IFoodItemUpdateRequest, IFoodOrderCreateRequest, IUserFilterRequest } from "./orders.interface";
import { ordersRelationalFields, ordersRelationalFieldsMapper, ordersSearchableFields } from "./orders.constants";
import { calculateTotalAmount, updateFoodItemData } from "./orders.utils";

// ! create new order
const createNewFoodOrder = async (profileId: string, payload: IFoodOrderCreateRequest) => {
  const { orderItems, paymentMethod, ...updates } = payload;
  const orderItemIds = orderItems?.map((orderItem) => orderItem?.foodItemId);

  const result = await prisma.$transaction(async (transactionClient) => {
    // ! check food item exist or not
    const existingFoodItems = await transactionClient.foodItem.findMany({
      where: {
        foodItemId: {
          in: orderItemIds,
        },
      },
    });
    // ! if food item not exist
    if (existingFoodItems?.length !== orderItemIds?.length) throw new ApiError(httpStatus.BAD_REQUEST, "Not all food items exist!");
    // !----------------

    // Calculate total amount
    const totalAmount: number = calculateTotalAmount(existingFoodItems, orderItems);

    // creating new order
    const orderCreateData: any = {
      ...updates,
    };

    const newOrderCreating = await transactionClient.order.create({
      data: {
        totalAmount,
        profileId,
        ...orderCreateData,
      },
    });

    if (!newOrderCreating) throw new ApiError(httpStatus.BAD_REQUEST, "New Order Creation Failed");
    //! create order Item
    const newOrderItemsCreating = await transactionClient.orderItem.createMany({
      data: orderItems?.map((orderItem) => ({
        orderId: newOrderCreating.orderId,
        quantity: orderItem.quantity,
        foodItemId: orderItem.foodItemId,
      })),
    });
    if (!newOrderItemsCreating) throw new ApiError(httpStatus.BAD_REQUEST, "Order Items Creation Failed");
    // create paymentInfo
    const creatingPaymentInfo = await transactionClient.paymentInfo.create({
      data: {
        orderId: newOrderCreating.orderId,
        paymentMethod,
      },
    });
    if (!creatingPaymentInfo) throw new ApiError(httpStatus.BAD_REQUEST, "Payment Details Creation Failed");

    // return new data
    const newData = await transactionClient.order.findUnique({
      where: {
        orderId: newOrderCreating.orderId,
      },
      include: {
        orderItems: true,
        paymentInfo: true,
        _count: true,
      },
    });

    return newData;
  });

  return result;
};

//! GET ALL  Orders for admin
const getAllOrders = async (filters: IUserFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Order[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ordersSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (ordersRelationalFields.includes(key)) {
          console.log(key);
          return {
            user: {
              [ordersRelationalFieldsMapper[key]]: {
                equals: (filterData as any)[key],
              },
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // @ts-ignore
  const whereConditions: Prisma.OrderWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.order.findMany({
    include: {
      _count: true,
      deliveryInfo: true,

      paymentInfo: true,
      profile: {
        select: {
          firstName: true,
          lastName: true,
          gender: true,
          currentAdress: true,
          parmanentAddress: true,
          profileImage: true,
          phoneNumber: true,
          postalCode: true,
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.order.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};
// ! get my food ordered

const getMyFoodOrdered = async (profileId: string) => {
  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    // !
    const orderedFood = await transactionClient.order.findMany({
      where: {
        profileId,
      },
      include: {
        _count: true,
        deliveryInfo: true,
        orderItems: {
          include: {
            foodItem: true,
          },
        },
        paymentInfo: true,
      },
    });

    return orderedFood;
  });
  return result;
};
// ! get single  Order

const getSingleOrderDetails = async (orderId: string): Promise<Order> => {
  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    // ! is Exist order
    const isExistOrder = await transactionClient.order.findUnique({
      where: {
        orderId,
      },
      include: {
        _count: true,
        deliveryInfo: true,
        orderItems: true,
        paymentInfo: true,
        profile: true,
      },
    });

    if (!isExistOrder) throw new ApiError(httpStatus.NOT_FOUND, "Order Details Not Found !!");

    return isExistOrder;
  });
  return result;
};
// ! update food menu Details

const updateFoodItemsDetails = async (foodItemId: string, req: Request) => {
  const foodItemImage: IUploadFile = req.file as any;
  const foodItemImagePath = foodItemImage?.path?.substring(13);

  const { oldFoodImagePath, availability, ...updates } = req.body as IFoodItemUpdateRequest;

  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    // ! is Exist item
    const isExistFoodItem = await transactionClient.foodItem.findUnique({
      where: {
        foodItemId,
      },
    });

    if (!isExistFoodItem) throw new ApiError(httpStatus.NOT_FOUND, "Food Item Not Found !!");
    //! deleting old  Image
    if (foodItemImagePath && oldFoodImagePath) deleteOldImage(oldFoodImagePath, foodItemImagePath);

    // updated data from request
    const foodItemUpdateReqData: any = {
      availability,
      foodImage: foodItemImagePath,
      ...updates,
    };

    if (availability === false) foodItemUpdateReqData["availableQuantity"] = 0;

    const newUpdatedData: Partial<IFoodItemUpdateRequest> = updateFoodItemData(foodItemUpdateReqData);

    // ! updating
    const res = await transactionClient.foodItem.update({
      where: {
        foodItemId,
      },
      data: newUpdatedData,
    });

    if (!res) throw new ApiError(httpStatus.BAD_REQUEST, "Food Menu Updating Failed !");

    return res;
  });
  return result;
};

export const FoodOrderService = { createNewFoodOrder, getAllOrders, updateFoodItemsDetails, getSingleOrderDetails, getMyFoodOrdered };
