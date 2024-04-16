import express from "express";
import { schedulesController } from "./schedules.controller";

const route = express.Router();

route.get("/", schedulesController.getByIdFromDB);

export const schedulesRoutes = route;
