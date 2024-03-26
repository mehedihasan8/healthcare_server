import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  //console.log(req.body);

  try {
    const result = await userService.createAdmin(req.body);

    res.status(200).json({
      success: true,
      message: "Admin Create successfull!",
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

export const userController = {
  createAdmin,
};
