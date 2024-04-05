import express from "express";
import { doctorController } from "./doctor.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const route = express.Router();

route.get("/", doctorController.getAllFromDB);

route.get("/:id", doctorController.getByIdFromDB);

route.delete(
  "/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  doctorController.deleteFromDB
);

route.delete(
  "/soft/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  doctorController.softDelete
);

export const doctorRoute = route;
