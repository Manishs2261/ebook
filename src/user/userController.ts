
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModels from "./userModels";
import bcrypt from "bcrypt";

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    const {name,email,password} = req.body;

    //validation

    if(!name || !email || !password){

    const error = createHttpError(400,"All fields are required");

        return next(error);
    }

    //data base call
    const user = await userModels.findOne({email:email});

 if(user){
    const error = createHttpError(400,"User already exists with this email");
    return next(error);
 }

 //password hashing


 const hashedPassword = await bcrypt.hash(password,10);
 
    //process


    //Response

    res.json({message:"USer created"});

};

export { createUser };
