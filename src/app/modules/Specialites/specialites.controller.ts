import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import { specialitesService } from "./Specialites.service";

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await specialitesService.insetIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialites create successfully!",
    data: result,
  });
});

const getAllSpecialitesFormDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await specialitesService.getAllSpecialitesFormDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Specialites retrived successfully!",
      data: result,
    });
  }
);

export const specialitesController = {
  inserIntoDB,
  getAllSpecialitesFormDB,
};
