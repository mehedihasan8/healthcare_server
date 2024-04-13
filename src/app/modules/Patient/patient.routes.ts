import express from "express";
import { PatientController } from "./patient.controller";

const route = express.Router();

route.get("/", PatientController.getAllFromDB);

route.get("/:id", PatientController.getByIdFromDB);

route.patch("/:id", PatientController.updateIntoDB);

route.delete("/:id", PatientController.deleteFromDB);

route.delete("/soft/:id", PatientController.softDelete);

export const patientRoutes = route;
