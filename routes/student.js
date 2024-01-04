import { getAllStudents, deleteStudentById, addStudent, updateStudent } from "../controllers/student.js"
import express from "express"

const router=express.Router();
router.get("/",getAllStudents);
router.delete("/:studetId",deleteStudentById);
// router.post("/" studentController.updateStudent);
router.put("/:studentId",addStudent)
export default router;