import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { doctorSchedulesService } from "./doctorSchedule.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await doctorSchedulesService.insertIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor schedule create successfully!",
    data: result,
  });
});

export const doctorSchedulesController = {
  insertIntoDB,
};
