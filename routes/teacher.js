import { login,addTeacher,getAllTeachers } from "../controllers/teacher.js";
import express from "express"
import { authentication } from "../middlewares/authentication.js";

const router=express.Router();
router.post("/",addTeacher)
router.post("/login",login)
router.get("/",getAllTeachers)
export default router;

