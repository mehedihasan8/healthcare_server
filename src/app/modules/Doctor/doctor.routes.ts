import express from "express";
import { doctorController } from "./doctor.controller";

const route = express.Router();

route.get("/", doctorController.getAllFromDB);

route.get("/:id", doctorController.getByIdFromDB);

export const doctorRoute = route;
