import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterAbleFieds } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAllFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, adminFilterAbleFieds);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminService.getAllAdminFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched!",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminService.getByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched by id!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminService.updateIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data updated!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deletFromDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await AdminService.deletFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data deleted!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const softDeletFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await AdminService.softDeletFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data deleted!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deletFromDB,
  softDeletFromDB,
};
