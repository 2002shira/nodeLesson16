import express from "express";
import {config} from "dotenv";
import { connectToDB } from "./config/dbConfig.js";
import studentRouter from "./routes/student.js"

config();
connectToDB();
let app=express();
app.use(express.json());
app.use("/api/student",studentRouter);

app.use((err,req,res,next)=>{
    let statusCode=res.statusCode||500;
    res.status(statusCode).send(err.massage||"sorry, there is an error, try again")
 })
//  let port = process.env.PORT||3500;
 app.listen(3500,()=>{console.log(`app is listening on port ${3500}`);})