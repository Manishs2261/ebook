import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModels from "./userModels";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import User from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  //validation

  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");

    return next(error);
  }

  //database call

  try {
    const user = await userModels.findOne({ email: email });

    if (user) {
      const error = createHttpError(400, "User already exists with this email");
      return next(error);
    }
  } catch (err) {
    return next(createHttpError(500, `Error while getting user ${err}`));
  }

  //password hashing

  const hashedPassword = await bcrypt.hash(password, 10);

  //process

  let newUser: User;
  try {
    newUser = await userModels.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while creating user"));
  }

  //jwt token generater

  try {
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    //Response

    res.json({ message: "USer created", id: newUser._id, accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Error while token generation"));
  }
};

export { createUser };
