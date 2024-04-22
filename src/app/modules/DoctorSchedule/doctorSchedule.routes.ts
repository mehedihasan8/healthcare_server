import express from "express";

import { doctorSchedulesController } from "./doctorSchedules.controller";

const route = express.Router();

route.post("/", doctorSchedulesController.insertIntoDB);

export const doctorSchedulesRoutes = route;
