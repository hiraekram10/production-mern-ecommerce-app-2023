import express from "express";
import colors from "colors"
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import cores from 'cors'
import path from 'path'
import {fileURLToPath} from 'url'


import cors from 'cors'

//mongodb connection
connectDB()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//configenv

dotenv.config()

//rest object 
const app = express()

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))


//exporting routes

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)

app.use('*', function(req,res){
    
res.sendFile(path.join(__dir,'./client/build/index.html'))})


// app.get('/', (req, res) => {
//     res.send({ message: "welcome to my Ecommerce app" })
// })

//port

const port = process.env.PORT ;

//run listen

app.listen(port, (req, res) => {
    console.log(`server is running  on ${port}`.bgCyan.white)
})

