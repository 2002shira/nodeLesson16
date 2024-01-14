import mongoose, { mongo } from "mongoose";
import Joi from "joi";

const studentSchema=mongoose.Schema({
    name:{type:String,required:true},
    // proffesion:professionSchema
})
let teacherSchema=mongoose.Schema({
    teacherName:String,
    identity:String,
    password:String,
    students:[studentSchema]
})
export const teacherModel=mongoose.model("teacher",teacherSchema);

export const teacherValidatorForLogin = (_teacher) => {

    const schema = Joi.object({
        teacherName: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
    });
    return schema.validate(_teacher);
}

export const teacherValidator = (_teacher) => {

    const schema = Joi.object({
        teacherName: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
        identity: Joi.string().min(9).max(9).pattern(/^[0-9]{9}$/).required(),
    });

    return schema.validate(_teacher);
}


