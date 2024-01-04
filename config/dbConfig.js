import mongoose from "mongoose";

export const connectToDB=async()=>{
    try{
        console.log(process.env.DB_CONNCTION)
        let connection =await mongoose.connect(process.env.DB_CONNCTION);
        console.log("mongoDB connected successfully!",connection.host);
    }
    catch(error){
        console.log("cannot connect to mongoDB");
        console.log(error);
        process.exit(1);
    }
}