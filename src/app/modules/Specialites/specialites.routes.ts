import express, { NextFunction, Request, Response } from "express";
import { specialitesController } from "./specialites.controller";
import { fileUploader } from "../../../helpers/fileUploader";
import { SpecialtiesValidtaion } from "./specialites.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const route = express.Router();

route.get("/", specialitesController.getAllSpecialitesFormDB);

route.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPPER_ADMIN),
  specialitesController.deletSingleSpecialitesFormDB
);

route.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidtaion.create.parse(JSON.parse(req.body.data));
    return specialitesController.inserIntoDB(req, res, next);
  }
);

export const specialitesRoute = route;
