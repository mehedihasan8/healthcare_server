import { UserRole } from "@prisma/client";

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IAuthUser = {
  userId: string;
  role: UserRole;
  email: string;
} | null;
