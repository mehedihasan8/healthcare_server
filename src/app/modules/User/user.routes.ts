import express from "express";
import { userController } from "./user.controller";

const route = express.Router();

route.post("/create", userController.createAdmin);

export const userRoute = route;
