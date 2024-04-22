import express from "express";

import { doctorSchedulesController } from "./doctorSchedules.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const route = express.Router();

route.post("/", auth(UserRole.DOCTOR), doctorSchedulesController.insertIntoDB);

export const doctorSchedulesRoutes = route;
