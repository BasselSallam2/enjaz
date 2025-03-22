
import express from "express"
import pkg from 'express-openid-connect';
import path from "path"
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';
dotenv.config();
const prisma = new PrismaClient();
import cors from "cors"
import bodyParser from "body-parser";


const { auth , requiresAuth  } = pkg;

const app = express() ;

app.use(cors());
app.use(express.static("public")) ;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



import AuthRouter from "./Routes/AuthRouter.js"
import ErrorHandler from "./middleware/ErrorHandler.js";
import OrdersRouter from "./Routes/OrdersRouter.js"
import AddressRouter from "./Routes/AddressRouter.js"


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'https://wckb4f4m-3000.euw.devtunnels.ms',
  clientID: '89zF9QTJkd5PsNU25Es4sWaXb7NwNd2Q',
  issuerBaseURL: 'https://dev-0au4j672epupwqrf.us.auth0.com' ,
  routes: {
    login: '/api/login',
    callback: '/api/callback',
    logout: '/api/logout'
  }
};


app.use(auth(config));
app.use('/api' , AuthRouter ) ;
app.use('/api' , OrdersRouter) ;
app.use('/api' , AddressRouter) ;


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});



app.use('/' , (req , res , next) => {
  res.status(404).send("Page not found");
})

app.use(ErrorHandler) ;



  

app.listen(3000);