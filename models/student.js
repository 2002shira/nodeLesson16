import mongoose from "mongoose";

const professionSchema=mongoose.Schema({
    name:String,
    numLessons:Number
})
const studentSchema=mongoose.Schema({
    name:{type:String,required:true},
    author:mongoose.Schema({
        name:String,
    }),
    profssion:professionSchema,
    inHighLevel:Boolean,
    startDate:{type:Date,default:Date.now()}
})
export const studentModel=mongoose.model("student",studentSchema);