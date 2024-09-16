import express from "express";
import {createBook ,deleteBook,getSingleBook,listbook,updateBook } from "./bookController";
import multer from "multer";
import path from "node:path";
import authenticate from "../middlewares/authenticate";




const bookRouter = express.Router();

//multer 
const upload = multer({
    dest: path.resolve(__dirname,'../../public/data/uploads'),
    limits:{fieldSize:3e7},
});
//routers 

bookRouter.post('/',
    authenticate,
    upload.fields([
    {name:'coverImage',maxCount:1},
    {name:'file',maxCount:1}
]),createBook);



bookRouter.patch('/:bookId',
    authenticate,
    upload.fields([
    {name:'coverImage',maxCount:1},
    {name:'file',maxCount:1}
]),updateBook);




bookRouter.get('/',listbook);

bookRouter.get('/:bookId',getSingleBook);

bookRouter.delete('/:bookId',
    authenticate
    ,deleteBook);


export default bookRouter;