import { generateToken } from "../config/generateToken.js";
import { teacherValidatorForLogin, teacherValidator, teacherModel } from "../models/teacher.js"
import { hash, compare } from "bcrypt";
export const getAllTeachers = async (req, res) => {
    try {
        let allTeachers = await teacherModel.find({}, "-password");
        res.json(allTeachers)
    }
    catch (error) {
        res.status(400).send("there was error retrieving the details" + error.message);
    }
}

export const addTeacher = async (req, res) => {
    // if (!teacherName || !password || !identity)
    //     return res.status(404).json({ type: "missing parameters", message: "missing parameter: or password or teacherName or identity" });
    // if (/[0-9]{1,2}/.test(password))
    //     return res.status(400).json({ type: "password invalid", message: "try again" })
    let validate = teacherValidator(req.body)
    if (validate.error)
        return res.status(400).json({ type: "not valid", message: validate.error.details[0].message })
    let { teacherName, password, identity } = req.body
    try {
        let sameTeacher = await teacherModel.findOne({ $or: [{ teacherName: teacherName }, { identity: identity }] })
        if (sameTeacher)
            return res.status(409).json({ type: "same user", message: "this user with such parameters already exists." });
        let hashCode = await hash(password, 15);
        let newTeacher = new teacherModel({ teacherName, identity, hashCode });
        await newTeacher.save()
        let token = generateToken(newTeacher);
        return res.json({token})
    }
    catch (err) {
        res.status(400).json({ type: "error", message: `${err.message} you entered the catch` })
    }
}

export const login = async (req, res) => {

    // if (!password || !teacherName)
    //     return res.status(404).json({ type: "missing parameters", message: "missing parameter: or password or teacherName" });
    let validate = teacherValidatorForLogin(req.body)
    if (validate.error)
        return res.status(400).json({ type: "not valid", message: validate.error.details[0].message })
    let { password, teacherName } = req.body;
    try {

        let teacher = await teacherModel.findOne({ teacherName: teacherName })
        if (!teacher || !await compare(req.body.password, teacher.password))
            res.status(404).json({ type: "not such teacher", message: "please sign up" })
        let token = generateToken(teacher);
        return res.json({ token })
        // teacher.password = "******"
        // return teacher;
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }

}
