import { Prisma } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../shared/prisma";

const getAllAdminFromDB = async (params: any, options: any) => {
  const { limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const andCondions: Prisma.AdminWhereInput[] = [];
  const { searchTerm, ...filterData } = params;

  if (params.searchTerm) {
    andCondions.push({
      OR: adminSearchAbleFields?.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditon: Prisma.AdminWhereInput = { AND: andCondions };

  const result = await prisma.admin.findMany({
    where: whereConditon,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  return result;
};

export const AdminService = {
  getAllAdminFromDB,
};
