import express from "express";
import cors from "cors";
import globleErrorHandler from "./middlewares/globleErrorHnadle";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
import { config } from "./config/config";

const app = express();

app.use(
  cors({
    origin: config.frontendDomain,
  })
);

app.use(express.json());

//ROUTES

app.get("/", (req, res, next) => {
  res.json({ message: "welcome to elib apis" });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Globle error handler
app.use(globleErrorHandler);

export default app;
