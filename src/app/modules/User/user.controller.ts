import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.createAdmin(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Created successfuly!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createAdmin,
};
