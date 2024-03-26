import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminFromDB = async (params: any) => {
  const andCondions: Prisma.AdminWhereInput[] = [];
  const { searchTerm, ...filterData } = params;
  const adminSearchAbleFields = ["name", "email"];

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
  });

  return result;
};

export const AdminService = {
  getAllAdminFromDB,
};
