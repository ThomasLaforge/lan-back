import { Match, PrismaClient } from "@prisma/client";
import { Router } from "express";
import { checkToken } from "../middlewares/checkToken";

interface IResultData {
    teamOneId: number;
    teamTwoId: number;
    score1: number;
    score2: number;
}

const prisma = new PrismaClient();

export const resultsRouter = Router();
resultsRouter.use(checkToken);

resultsRouter.post("/", async (req, res) => {
    const { teamOneId, teamTwoId, score1, score2 } = req.body.data as IResultData;
    const match = await prisma.match.create({
        data: {
            team1Id: teamOneId,
            team2Id: teamTwoId,
            score1,
            score2
        }
    });
    res.json(match);
});

interface Tournament {
    rounds: Round[];
}

interface Round {
    parts: Part[];
}

interface Part {
    nbWin: number;
    nbLose: number;
    matchList: Match[];
}
