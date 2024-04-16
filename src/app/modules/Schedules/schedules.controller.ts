import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { schedulesService } from "./schedules.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await schedulesService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "create schedules successfully",
    data: result,
  });
});

export const schedulesController = {
  insertIntoDB,
};
