import express from "express";

import { doctorSchedulesController } from "./doctorSchedules.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const route = express.Router();

// route.get(
//   "/",
//   auth(
//     UserRole.SUPPER_ADMIN,
//     UserRole.ADMIN,
//     UserRole.DOCTOR,
//     UserRole.PATIENT
//   ),
//   doctorSchedulesController.getAllFromDB
// );
route.get(
  "/",
  auth(
    UserRole.SUPPER_ADMIN,
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT
  ),
  doctorSchedulesController.getAllFromDB
);

route.get(
  "/my-schedule",
  auth(UserRole.DOCTOR),
  doctorSchedulesController.getMySchedule
);

route.post("/", auth(UserRole.DOCTOR), doctorSchedulesController.insertIntoDB);

route.delete(
  "/:id",
  auth(UserRole.DOCTOR),
  doctorSchedulesController.deleteFromDB
);

export const doctorSchedulesRoutes = route;
