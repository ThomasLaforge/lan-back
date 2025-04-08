import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";
import { Router } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authRouter = Router();

authRouter.post("/local", async (req, res) => {
    const { pseudo, motdpasse } = req.body;
    const userWithpseudo = await prisma.user.findFirst({ where: { pseudo } });
    if (!userWithpseudo) {
        res.status(400).json("pseudo or motdpasse is incorrect");
    }
    else {
        const ismotdpasseCorrect = await bcrypt.compare(motdpasse, userWithpseudo.motdpasse);
        if (ismotdpasseCorrect) {
            const token = jwt.sign(userWithpseudo, process.env.JWT_SECRET!);
            res.json({
                token,
                ...userWithpseudo
            });
        }
        else {
            res.status(400).json("pseudo or motdpasse is incorrect");
        }
    }
})