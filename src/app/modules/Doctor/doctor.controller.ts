import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { doctorService } from "./doctor.service";
import { doctorFilterableFields } from "./doctor.constants";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, doctorFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await doctorService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctors retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const doctorController = {
  getAllFromDB,
};
