import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

import { fileUploader } from "../../../helpers/fileUploader";
import { userValidation } from "./user.validation";

const route = express.Router();
route.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPPER_ADMIN),
  userController.getAllFromDB
);
route.get(
  "/me",
  auth(
    UserRole.ADMIN,
    UserRole.SUPPER_ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT
  ),
  userController.getMyProfile
);

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

route.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatient.parse(JSON.parse(req.body.data));
    return userController.createPatient(req, res, next);
  }
);

route.patch(
  "/:id/status",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),

  userController.changeProfileStatus
);

route.patch(
  "/update-my/profile",
  auth(
    UserRole.ADMIN,
    UserRole.SUPPER_ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT
  ),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.updateMyProfile(req, res, next);
  }
);

export const userRoute = route;
