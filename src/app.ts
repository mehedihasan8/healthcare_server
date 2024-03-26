import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello form app.ts ljaldp");
});

export default app;
