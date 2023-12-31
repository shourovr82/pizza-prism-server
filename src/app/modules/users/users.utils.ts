/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

export const userFindUnique = async (email: string, transactionClient: any) => {
  // transaction start

  const isUserExist = await transactionClient.user.findFirst({
    where: { email },
  });

  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already in use");
  }
};
