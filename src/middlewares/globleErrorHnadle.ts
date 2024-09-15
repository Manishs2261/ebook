import {Request,Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { config } from "../config/config";

const globleErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message,
    //only show development envirament
    errorStack: config.env === "development" ? err.stack : "",
  });
};


export default globleErrorHandler;