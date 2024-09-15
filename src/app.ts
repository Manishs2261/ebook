import express  from 'express';
 
import globleErrorHandler from './middlewares/globleErrorHnadle';
import userRouter from './user/userRouter';

const app = express();


//ROUTES

app.get('/',(req, res, next) =>{

    
    res.json({message:"welcome to elib apis"});
});


app.use('/api/users',userRouter);

// Globle error handler

app.use( globleErrorHandler);

export default app;