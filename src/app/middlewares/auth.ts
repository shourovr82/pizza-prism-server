import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret, TokenExpiredError } from 'jsonwebtoken'; // Import TokenExpiredError
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import prisma from '../../shared/prisma';

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not an authorized user'
        );
      }

      try {
        const verifiedUser: JwtPayload = jwtHelpers.verifyToken(
          token,
          config.jwt.secret as Secret
        );

        const isUserExist = await prisma.user.findUnique({
          where: {
            userId: verifiedUser?.userId,
          },
          select: {
            email: true,
            userId: true,
            role: true,
            userStatus: true,
            tenant: {
              select: {
                tenantId: true,
              },
            },
            propertyOwner: {
              select: {
                propertyOwnerId: true,
              },
            },
            serviceProvider: {
              select: {
                serviceProviderId: true,
              },
            },
          },
        });

        // If the user doesn't exist, they are not a valid user.
        if (!isUserExist) {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            'You are not a valid user'
          );
        }

        const loggedInUserDetails = {
          email: isUserExist?.email,
          userId: isUserExist?.userId,
          role: isUserExist?.role,
          userStatus: isUserExist?.userStatus,
          profileId:
            isUserExist?.tenant?.tenantId ||
            isUserExist?.propertyOwner?.propertyOwnerId ||
            isUserExist?.serviceProvider?.serviceProviderId,
        };

        req.user = loggedInUserDetails;

        if (
          requiredRoles.length &&
          !requiredRoles.includes(verifiedUser.role)
        ) {
          const rolesString = requiredRoles.join(', ');
          throw new ApiError(
            httpStatus.FORBIDDEN,
            `Access Forbidden. Required role(s): ${rolesString}`
          );
        }

        next();
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          // If the token is expired, return a 403 Forbidden status code
          throw new ApiError(httpStatus.FORBIDDEN, 'Token has expired');
        } else {
          next(error);
        }
      }
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
