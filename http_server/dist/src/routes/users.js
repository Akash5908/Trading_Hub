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
        const existingUser = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        if (existingUser)
            return res.status(301).json("Username already exist");
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
            profile: {
                id: user?.id,
                token: user?.token,
                username: user?.username,
                userBalance: user?.userBalance,
            },
        });
    }
    catch (error) {
        console.error(error);
    }
});
router.post("/sign-in", async (req, res) => {
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
                profile: {
                    id: user?.id,
                    token: user?.token,
                    username: user?.username,
                    userBalance: user?.userBalance,
                },
            });
        }
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});
router.get("/me", async (req, res) => {
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
                profile: {
                    id: user?.id,
                    token: user?.token,
                    username: user?.username,
                    userBalance: user?.userBalance,
                },
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