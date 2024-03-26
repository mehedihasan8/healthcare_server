import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllAdminFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "All Admin Fetch successfully!",
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

export const AdminController = {
  getAllFromDB,
};
