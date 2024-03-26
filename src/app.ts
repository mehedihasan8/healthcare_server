import express, { Application } from "express";
import cors from "cors";
import { userRoute } from "./app/modules/User/user.routes";

const app: Application = express();
app.use(cors());

//parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Health care srver is running!!");
});

app.use("/api/v1/user", userRoute);

export default app;
