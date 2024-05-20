import { IAuthUser } from "./../../interfaces/common";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { schedulesService } from "./schedules.service";
import pick from "../../../shared/pick";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await schedulesService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "create schedules successfully",
    data: result,
  });
});

const getAllFormDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate"]);

    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;

    const result = await schedulesService.getAllFormDB(
      filters,
      options,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedules fetched successfully!",
      data: result,
    });
  }
);

export const schedulesController = {
  insertIntoDB,
  getAllFormDB,
};
