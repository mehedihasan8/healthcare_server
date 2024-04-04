import { Request } from "express";
import { prisma } from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";

const getAllSpecialitesFormDB = async () => {
  const result = await prisma.specialties.findMany();
  return result;
};

const insetIntoDB = async (req: Request) => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });
  return result;
};

export const specialitesService = {
  insetIntoDB,
  getAllSpecialitesFormDB,
};
