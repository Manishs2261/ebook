
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import path from "path";
import bookModel from "./bookModel";
import fs from "node:fs";
 


const createBook = async (req: Request, res: Response, next: NextFunction) => {

  const {title,genre} = req.body;
    
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



    const newBook = await bookModel.create({
      title:title,
      genre: genre,
      author:'66e70d1d401301b0c954d656',
      coverImage: uploadResult.secure_url,
      file:bookFileUploadResult.secure_url,

    });

    //Delete temp files


    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);


      res
        .status(201)
        .json({ _id:newBook._id });
   
    };


    export default createBook;
