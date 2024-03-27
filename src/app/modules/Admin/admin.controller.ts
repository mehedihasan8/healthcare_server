import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterAbleFieds } from "./admin.constant";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterAbleFieds);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminService.getAllAdminFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "All Admin Fetch successfully!",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "somthing went weong",
      error,
    });
  }
};

const getByIdFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminService.getByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin Fetch by id successfully!",

      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "somthing went weong",
      error,
    });
  }
};

const updateIntoDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminService.updateIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin update successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "somthing went weong",
      error,
    });
  }
};

const deletFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminService.deletFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin deletes successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "somthing went weong",
      error,
    });
  }
};

const softDeletFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminService.softDeletFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin deletes successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "somthing went weong",
      error,
    });
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deletFromDB,
  softDeletFromDB,
};
