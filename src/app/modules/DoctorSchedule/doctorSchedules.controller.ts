import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { doctorSchedulesService } from "./doctorSchedule.service";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../shared/pick";

const getMySchedule = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);

    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;

    const result = await doctorSchedulesService.getMySchedule(
      filters,
      options,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My schedules fetched successfully!",
      data: result,
    });
  }
);
const insertIntoDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await doctorSchedulesService.insertIntoDB(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor schedule create successfully!",
      data: result,
    });
  }
);

const deleteFromDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const { id } = req.params;

    const result = await doctorSchedulesService.deleteFromDB(
      user as IAuthUser,
      id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My schedules deleted successfully!",
      data: result,
    });
  }
);

export const doctorSchedulesController = {
  insertIntoDB,
  getMySchedule,
  deleteFromDB,
};
