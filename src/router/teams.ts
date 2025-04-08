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
    const { name, players } = req.body;
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
                            acronym: player.acronym,
                            name: player.name,
                            firstname: player.firstname,
                            pseudo: player.pseudo,
                            promoId: player.promoId,
                            levelId: player.rankId
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