import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";

const prisma = new PrismaClient();

const getAllAdminFromDB = async (params: any, options: any) => {
  const { limit, page } = options;
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
    skip: (Number(page) - 1) * limit,
    take: Number(limit),
  });

  return result;
};

export const AdminService = {
  getAllAdminFromDB,
};
