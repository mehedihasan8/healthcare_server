import express from "express";
import { doctorController } from "./doctor.controller";

const route = express.Router();

route.get("/", doctorController.getAllFromDB);

export const doctorRoute = route;
