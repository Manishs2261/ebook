import express  from 'express';
 
import globleErrorHandler from './middlewares/globleErrorHnadle';
import userRouter from './user/userRouter';
import bookRouter from './book/bookRouter';

const app = express();

app.use(express.json());


//ROUTES

app.get('/',(req, res, next) =>{

    
    res.json({message:"welcome to elib apis"});
});


app.use('/api/users',userRouter);
app.use('/api/books',bookRouter);

// Globle error handler

app.use( globleErrorHandler);

export default app;