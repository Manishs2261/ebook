import express from "express";
import { createUser } from "./userController";



const userRouter = express.Router();


//routers 

userRouter.post('/register',createUser);

export default userRouter;