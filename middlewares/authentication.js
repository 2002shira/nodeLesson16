import jwt from "jsonwebtoken";


export const authentication = async (req, res) => {
    let token = req.headers["xxx-token"];
    if (!token)
        return res.status(401).send({ type: "not authorized", message: "user not authorized" });
    const decoded = jwt.verify(token, process.env.JWT_STRING)
    if (!decoded)
        return res.status(401).send({ type: "not authorized", message: "user not authorized" });
    next();
}