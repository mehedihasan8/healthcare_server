import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtHelpers } from "./../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { UserStatus } from "@prisma/client";

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new Error("password not match!");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
    },
    "123456",
    "15m"
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
    },
    "123456789",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(token, "123456789");
  } catch (err) {
    throw new Error("You are not authrized!");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
    },
    "123456",
    "15m"
  );

  return {
    accessToken,
    needPasswordChange: user.needPasswordChange,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
