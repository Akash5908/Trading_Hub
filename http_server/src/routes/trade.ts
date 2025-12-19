import express from "express";
import { prisma } from "../lib/prisma.js";
import { error } from "console";

const router = express.Router();

router.post("/open", async (req, res) => {
  const { userId } = req.body;
  try {
    // manage the balance
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userBalance: 3500,
      },
    });
    return res.send({ message: "Trade open successfully", status: 201 });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.get("/btc-klines", async (req, res) => {
  const { duration } = req.query;
  try {
    if (duration === "1d") {
      //   const data = await prisma.btc_1_min.findMany();
    } else if (duration === "1s") {
      //   const data = await prisma.btc_1_min.findMany();
    } else {
      const data = await prisma.btc_1_min.findMany();

      return res.status(201).json(data);
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/sol-klines", async (req, res) => {
  const { duration } = req.query;
  try {
    if (duration === "1d") {
      //   const data = await prisma.btc_1_min.findMany();
    } else if (duration === "1s") {
      //   const data = await prisma.btc_1_min.findMany();
    } else {
      const data = await prisma.sol_1_min.findMany();

      return res.status(201).json(data);
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/eth-klines", async (req, res) => {
  const { duration } = req.query;
  try {
    if (duration === "1d") {
      //   const data = await prisma.btc_1_min.findMany();
    } else if (duration === "1s") {
      //   const data = await prisma.btc_1_min.findMany();
    } else {
      const data = await prisma.eth_1_min.findMany();

      return res.status(201).json(data);
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
