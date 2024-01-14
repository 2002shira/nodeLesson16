import jwt from "jsonwebtoken";
export const generateToken = (teacher) => {
    let jwtSecretKey = process.env.JWT_STRING;
    let data = {
        teacherName: teacher.teacherName,
        _id: teacher._id,
       
    }
    const token = jwt.sign(data, jwtSecretKey, {
        expiresIn: '3m',
    });

    return token;
}