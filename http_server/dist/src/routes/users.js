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
        await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                token: token,
            },
        });
        res.send({ message: "Signup successfully!!", token: token, status: 201 });
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
        console.log(user);
        if (bcrypt.compareSync(password, user?.password)) {
            res.send({
                message: "Signin successfully!!",
                status: 201,
                token: user?.token,
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
export default router;
//# sourceMappingURL=users.js.map