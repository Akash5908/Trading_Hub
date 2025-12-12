import { prisma } from "../lib/prisma.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/bcrypt.js";
const router = express.Router();
const privateKey = "asdkjfhasdkjlfhasdkjlfhasklfjhslk";
router.post("/sign-up", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    var token = jwt.sign({ password: password }, privateKey);
    try {
        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                token: token,
            },
        });
        res.send({
            message: "Signup successfully!!",
            token: token,
            status: 201,
            profile: user,
        });
    }
    catch (error) {
        console.error(error);
    }
});
router.post("/sign-in", async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        if (user === null) {
            return res.send({ status: 404, message: "User not found!!" });
        }
        else if (bcrypt.compareSync(password, user?.password)) {
            res.send({
                message: "Signin successfully!!",
                status: 201,
                token: user?.token,
                profile: user,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});
router.get("/me", async (req, res) => {
    console.log(req.query.authToken);
    const { authToken } = req.query;
    try {
        const user = await prisma.user.findUnique({
            where: {
                token: String(authToken),
            },
        });
        if (user === null) {
            return res.send({ status: 404, message: "User not found!!" });
        }
        else {
            res.send({
                message: "Profile found successfully!!",
                status: 201,
                profile: user,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});
export default router;
//# sourceMappingURL=users.js.map