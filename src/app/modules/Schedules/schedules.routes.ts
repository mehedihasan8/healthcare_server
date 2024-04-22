import express from "express";
import { schedulesController } from "./schedules.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const route = express.Router();

route.post(
  "/",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  schedulesController.insertIntoDB
);

export const schedulesRoutes = route;
