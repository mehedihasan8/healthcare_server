import express from "express";
import { userRoute } from "../modules/User/user.routes";
import { adminRouter } from "../modules/Admin/admin.routes";
import { authRouter } from "../modules/Auth/auth.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/admin",
    route: adminRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
