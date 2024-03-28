import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validations";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPPER_ADMIN),
  AdminController.getAllFromDB
);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPPER_ADMIN),
  AdminController.getByIdFromDB
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPPER_ADMIN),
  validateRequest(adminValidationSchemas.update),
  AdminController.updateIntoDB
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPPER_ADMIN),
  AdminController.deletFromDB
);

router.delete(
  "/soft/:id",
  auth(UserRole.ADMIN, UserRole.SUPPER_ADMIN),
  AdminController.softDeletFromDB
);

export const adminRouter = router;
