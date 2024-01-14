import express from "express";
import {config} from "dotenv";
import { connectToDB } from "./config/dbConfig.js";
import studentRouter from "./routes/student.js"
import { errorHandling } from "./middlewares/errorHandlingMiddleware.js";
import teacherRouter from "./routes/teacher.js"
import cors from "cors"
config();
connectToDB();
let app=express();
app.use(express.json());
app.use(cors({origin:"http://127.0.0.1:5500",methods:"*"}))

app.use("/api/student",studentRouter);
app.use("/api/teacher",teacherRouter);
app.use(errorHandling);

 app.listen(3500,()=>{console.log(`app is listening on port ${3500}`);})