import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { checkToken } from "../middlewares/checkToken";

const prisma = new PrismaClient();

export const teamsRouter = Router();

teamsRouter.get("/", async (req, res) => {
    const inscriptions = await prisma.team.findMany({
        include: {
            players: true
        }
    });
    res.json(inscriptions);
});

teamsRouter.post("/", async (req, res) => {
    const { name, players } = req.body.data;
    if(!name || !players) {
        res.status(400).send("Missing required information");
    }
    else {
        const newinstrument = await prisma.team.create({
            data: {
                name, 
                players: {
                    createMany: {
                        data: players.map((player: any) => ({
                            name: player.name,
                            firsname: player.firstname,
                            pseudo: player.pseudo,
                            rankId: player.rankId
                        }))
                    }
                }  
            }
        });
        res.json(newinstrument);
    }
});

teamsRouter.delete("/:id", checkToken, async (req, res) => {
    const actual = await prisma.team.findFirst({ where: { id: parseInt(req.params.id) } });
    if (actual) {
        await prisma.team.delete({ where: { id: parseInt(req.params.id) } });
        res.json(actual);
    }
    else {
        res.status(404).send("Instrument not found");
    }
});