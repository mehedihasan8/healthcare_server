import express from "express";
import { schedulesController } from "./schedules.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const route = express.Router();

route.get("/", auth(UserRole.DOCTOR), schedulesController.getAllFormDB);

route.get(
  "/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  schedulesController.getByIdFromDB
);

route.post(
  "/",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  schedulesController.insertIntoDB
);

route.delete(
  "/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  schedulesController.deleteFromDB
);

export const schedulesRoutes = route;
