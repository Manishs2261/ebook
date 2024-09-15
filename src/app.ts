import express  from 'express';
 
import globleErrorHandler from './middlewares/globleErrorHnadle';

const app = express();


//ROUTES

app.get('/',(req, res, next) =>{

    
    res.json({message:"welcome to elib apis"});
});


// Globle error handler

app.use( globleErrorHandler);

export default app;