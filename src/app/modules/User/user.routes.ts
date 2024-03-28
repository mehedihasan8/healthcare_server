import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

import auth from "../../middlewares/auth";

const route = express.Router();

route.post("/", auth("ADMIN", "SUPPER_ADMIN"), userController.createAdmin);

export const userRoute = route;
