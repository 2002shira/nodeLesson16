import express from "express";
import {config} from "dotenv";
import { connectToDB } from "./config/dbConfig.js";
import studentRouter from "./routes/student.js"

config();
connectToDB();
let app=express();
app.use(express.json());
app.use("/api/student",studentRouter);

//  let port = process.env.PORT||3500;
 app.listen(3500,()=>{console.log(`app is listening on port ${3500}`);})