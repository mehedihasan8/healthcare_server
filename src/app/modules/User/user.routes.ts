import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

import { fileUploader } from "../../../helpers/fileUploader";
import { userValidation } from "./user.validation";

const route = express.Router();

route.post(
  "/create-admin",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res, next);
  }
);

route.post(
  "/create-doctor",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data));
    return userController.createDoctor(req, res, next);
  }
);

export const userRoute = route;
