
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
 


const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
  
    //validation
  
    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");
  
      return next(error);
    }
  
    //database call
  
  
    
  
    //process
 
    
  
    
      //Response
  
      res
        .status(201)
        .json({ message: "USer created" });
   
    };


    export default createBook;
