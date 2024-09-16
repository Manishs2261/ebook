
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import path from "path";
 


const createBook = async (req: Request, res: Response, next: NextFunction) => {
    
    const files = req.files as { [fieldname: string]: Express.Multer.File[]};

    const coverImageMimeType = files.coverImage[0].mimetype.split('/').at(-1);

    const filename = files.coverImage[0].filename;

    const filePath = path.resolve(__dirname, '../../public/data/uploads',filename);
  
    const uploadResult= await cloudinary.uploader.upload(filePath,{
      filename_override:filename,
    folder:'book-covers',
    format:coverImageMimeType
    });  


    const bookFileName = files.file[0].filename;

    const bookFilePath = path.resolve(__dirname, '../../public/data/uploads',bookFileName);


    const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath,{
      resource_type:'raw',
      filename_override:bookFileName,
      folder:"book-pdfs",
      format:"pdf",

    });



console.log("book File upload result",bookFileUploadResult);
    console.log("uploadResult",uploadResult);


    

      res
        .status(201)
        .json({ message: "USer created" });
   
    };


    export default createBook;
