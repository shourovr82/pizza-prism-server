/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../../config';
import ApiError from '../../../../errors/ApiError';
import { jwtHelpers } from '../../../../helpers/jwtHelpers';
import prisma from '../../../../shared/prisma';
import { IUserCreate } from '../auth.interface';
import { UserRoles, UserStatus } from '@prisma/client';
import { userFindUnique } from '../auth.utils';

//! Tenant User Create

const createUser = async (payload: IUserCreate) => {
    const { password, email, userName, role } = payload;
    const hashedPassword = await bcrypt.hash(
        password,
        Number(config.bcrypt_salt_rounds)
    );

    const newUser = await prisma.$transaction(async transactionClient => {
        await userFindUnique(userName, email, transactionClient);

        const createdUser = await transactionClient.user.create({
            data: {
                email,
                password: hashedPassword,
                userName,
                role: role,
                userStatus: UserStatus.ACTIVE,
            },
        });

        if (!createdUser) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed');
        }
        return createdUser;
    });

    return newUser;
};

export const createUserService = createUser;