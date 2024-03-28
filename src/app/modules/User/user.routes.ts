import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const route = express.Router();

route.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPPER_ADMIN),
  userController.createAdmin
);

export const userRoute = route;
