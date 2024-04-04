import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { specialitesService } from "./specialites.service";

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

const deletSingleSpecialitesFormDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await specialitesService.deletFormDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Specialites Delet successfully!",
      data: result,
    });
  }
);

export const specialitesController = {
  inserIntoDB,
  getAllSpecialitesFormDB,
  deletSingleSpecialitesFormDB,
};
