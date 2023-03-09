
import createError from 'http-errors'
import express, { Request, Response } from 'express'
import path from 'path'
import cookieParser  from 'cookie-parser'
import morgan  from 'morgan'
import cors  from 'cors'
import dotenv from 'dotenv'

import indexRouter from './routes/index'
import authRouter from './routes/auth'
import todoRouter from './routes/todo'

const app = express();

dotenv.config()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN || "http://localhost:3000",
  })
);


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', require('./routes/index'));
app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/todo', todoRouter)

app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err:any, req:Request, res:Response)=> {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app
