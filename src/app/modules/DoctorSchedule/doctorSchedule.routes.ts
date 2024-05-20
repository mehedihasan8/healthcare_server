import express from "express";

import { doctorSchedulesController } from "./doctorSchedules.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const route = express.Router();

route.get(
  "/my-schedule",
  auth(UserRole.DOCTOR),
  doctorSchedulesController.getMySchedule
);

route.post("/", auth(UserRole.DOCTOR), doctorSchedulesController.insertIntoDB);

export const doctorSchedulesRoutes = route;
