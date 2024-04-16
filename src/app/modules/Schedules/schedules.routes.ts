import express from "express";
import { schedulesController } from "./schedules.controller";

const route = express.Router();

route.post("/", schedulesController.insertIntoDB);

export const schedulesRoutes = route;
