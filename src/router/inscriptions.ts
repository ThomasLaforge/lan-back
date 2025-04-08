import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();

export const inscriptionsRouter = Router();

inscriptionsRouter.post("/", async (req, res) => {
    const { name, price, instrumentId } = req.body.data;
    if(!name || !price || !instrumentId){
        res.status(400).send("Missing required information");
    }
    else {
        const newinstrument = await prisma.team.create({
            data: {
                name, 
                price,
                instrumentId
            }
        });
        res.json(newinstrument);
    }
});

inscriptionsRouter.delete("/:id", async (req, res) => {
    const actual = await prisma.team.findFirst({ where: { id: parseInt(req.params.id) } });
    if (actual) {
        await prisma.team.delete({ where: { id: parseInt(req.params.id) } });
        res.json(actual);
    }
    else {
        res.status(404).send("Instrument not found");
    }
});