import mongoose from "mongoose"
import { studentModel } from "../models/student.js";
const getAllStudents = async (req, res) => {
    try {
        let allStudents = await studentModel.find({});
        res.json(allStudents)
    }
    catch (error) {
        res.status(400).send("there was error retrieving the details" + error.message);
    }
}

const deleteStudentById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("code inValid");
        let student = await studentModel.findByIdAndDelete(id);
        if (!student)
            res.status(404).send("sorry the was no student found to delete");
        res.json(student);
    }
    catch (error) {
        res.status(400).send("there was error deleting the details" + error.message)
    }
}

const addStudent = async (req, res) => {
    let { name, inHighLevel, startDate, proffesion } = req.body;
    if (!name || !proffesion)
        return res.status(404).send("name and proffession required");
    try {
        let sameStudent = await studentModel.findOne({ name, proffesion });
        if (sameStudent)
            return res.status(409).send("this student is already exists in the college");
        let newStudent=await studentModel.create({name, inHighLevel, startDate, proffesion});
        res.json (newStudent)
    }
    catch (error) {
        res.status(400).send("there was error adding the details" + error.message);
    }
}
const updateStudent = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
        return res.status(400).send("code inValid");
        let studentToUpdate=await studentModel.findById(id);
        if(!studentToUpdate)
        return res.status(404).send("there was not found such book with this ID to delete")
        await studentModel.findByIdAndUpdate(id,req.body);
        let student=await studentModel.findById(id)
        res.json(Student);
    }
    catch (error) {
res.status(400).send("sorry there was error deleting the details"+error.message);
    }
}
export { getAllStudents, deleteStudentById, addStudent, updateStudent };